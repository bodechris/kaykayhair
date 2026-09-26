import { drizzle } from "drizzle-orm/netlify-db"
import { and, eq } from "drizzle-orm"

import { kaykayServices } from "../app/services/services"
import {
  serviceQuestions as bookingQuestions,
  getDepositForService,
} from "../components/booking/booking-config"

import {
  services,
  serviceVariants,
  serviceQuestions,
} from "../lib/db/schema"

const db = drizzle()

function moneyToCents(value: number | string | undefined) {
  if (value == null) return 0

  if (typeof value === "number") {
    return Math.round(value * 100)
  }

  const amount = Number(String(value).replace(/[^\d.]/g, ""))
  return Number.isFinite(amount) ? Math.round(amount * 100) : 0
}

function durationToMinutes(value?: string) {
  if (!value) return 60

  const lower = value.toLowerCase()
  const numbers = [...lower.matchAll(/\d+(?:\.\d+)?/g)].map((m) =>
    Number(m[0])
  )

  if (!numbers.length) return 60

  // Use the upper end of a range so availability never
  // under-books a stylist.
  const duration = Math.max(...numbers)

  return lower.includes("minute")
    ? Math.ceil(duration)
    : Math.ceil(duration * 60)
}

function optionObjects(options?: string[]) {
  return (options ?? []).map((option) => ({
    label: option,
    value: option,
  }))
}

async function upsertService(
  service: (typeof kaykayServices)[number],
  sortOrder: number
) {
  const existing = await db
    .select()
    .from(services)
    .where(eq(services.slug, service.slug))
    .limit(1)

  const deposit = getDepositForService(service.slug)

  const values = {
    name: service.title,
    slug: service.slug,
    category: service.eyebrow,
    description: service.description,
    imageUrl: service.images?.[0]?.src ?? null,
    fromPriceCents: moneyToCents(service.fromPrice),
    depositType: "fixed",
    depositValue: moneyToCents(deposit),
    durationMinutes: durationToMinutes(service.duration),
    bufferBeforeMinutes: 0,
    bufferAfterMinutes: 0,
    status: "published" as const,
    bookingNotes: service.bookingNotes?.join("\n") ?? null,
    updatedAt: new Date(),
  }

  let serviceId: string

  if (existing[0]) {
    serviceId = existing[0].id

    await db
      .update(services)
      .set(values)
      .where(eq(services.id, serviceId))
  } else {
    const [created] = await db
      .insert(services)
      .values(values)
      .returning({ id: services.id })

    serviceId = created.id
  }

  return serviceId
}

async function upsertVariant(
  serviceId: string,
  variant: NonNullable<
    (typeof kaykayServices)[number]["subservices"]
  >[number],
  sortOrder: number,
  parentDepositCents: number
) {
  const existing = await db
    .select()
    .from(serviceVariants)
    .where(
      and(
        eq(serviceVariants.serviceId, serviceId),
        eq(serviceVariants.slug, variant.slug)
      )
    )
    .limit(1)

  const values = {
    serviceId,
    name: variant.name,
    slug: variant.slug,
    description: variant.description,
    priceCents: moneyToCents(variant.fromPrice),
    durationMinutes: durationToMinutes(variant.duration),
    depositCents: parentDepositCents,
    sortOrder,
    active: true,
  }

  if (existing[0]) {
    await db
      .update(serviceVariants)
      .set(values)
      .where(eq(serviceVariants.id, existing[0].id))

    return existing[0].id
  }

  const [created] = await db
    .insert(serviceVariants)
    .values(values)
    .returning({ id: serviceVariants.id })

  return created.id
}

async function upsertQuestions(
  serviceId: string,
  serviceSlug: keyof typeof bookingQuestions
) {
  const questions = bookingQuestions[serviceSlug] ?? []

  for (let index = 0; index < questions.length; index++) {
    const question = questions[index]

    // Initial catalogue questions are service-wide.
    // Later, the admin can attach questions to individual variants.
    const existing = await db
      .select()
      .from(serviceQuestions)
      .where(
        and(
          eq(serviceQuestions.serviceId, serviceId),
          eq(serviceQuestions.label, question.label)
        )
      )
      .limit(1)

    const values = {
      serviceId,
      variantId: null,
      label: question.label,
      type: question.type,
      required: question.required,
      helpText: question.helpText ?? null,
      options: optionObjects(question.options),
      sortOrder: index,
    }

    if (existing[0]) {
      await db
        .update(serviceQuestions)
        .set(values)
        .where(eq(serviceQuestions.id, existing[0].id))
    } else {
      await db.insert(serviceQuestions).values(values)
    }
  }
}

async function seed() {
  console.log("Seeding Kaykay Hair services...")

  for (let index = 0; index < kaykayServices.length; index++) {
    const service = kaykayServices[index]

    console.log(`→ ${service.title}`)

    const serviceId = await upsertService(service, index)

    const depositCents = moneyToCents(
      getDepositForService(service.slug)
    )

    for (
      let variantIndex = 0;
      variantIndex < (service.subservices?.length ?? 0);
      variantIndex++
    ) {
      await upsertVariant(
        serviceId,
        service.subservices![variantIndex],
        variantIndex,
        depositCents
      )
    }

    await upsertQuestions(
      serviceId,
      service.slug as keyof typeof bookingQuestions
    )
  }

  console.log("")
  console.log("✓ Services seeded successfully")
}

seed().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
