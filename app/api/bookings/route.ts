import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/db/client"
import {
  bookingServices,
  bookings,
  services,
  serviceVariants,
} from "@/lib/db/schema"

const bookingPayload = z.object({
  selectedServices: z
    .array(
      z.object({
        serviceSlug: z.string().min(1),
        subserviceSlug: z.string().min(1),
      }),
    )
    .min(1),
  answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])).default({}),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  referenceImages: z.array(z.string().trim().min(1).max(255)).max(3).default([]),
  customer: z.object({
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().min(6).max(40),
    note: z.string().trim().max(4000).default(""),
  }),
  depositAccepted: z.literal(true),
  policyAcceptedAt: z.string().datetime(),
  policyVersion: z.string().min(1).max(40),
})

type ResolvedService = {
  serviceId: string
  variantId: string
  name: string
  priceCents: number
  durationMinutes: number
  depositCents: number
}

function createReference() {
  return `KKH-${crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase()}`
}

function localSalonDate(date: string, time: string) {
  // Kaykay Hair currently operates in South Africa (UTC+02:00, no DST).
  const parsed = new Date(`${date}T${time}:00+02:00`)
  if (Number.isNaN(parsed.getTime())) throw new Error("Invalid appointment date/time")
  return parsed
}

export async function POST(request: Request) {
  try {
    const body = bookingPayload.parse(await request.json())
    const resolved: ResolvedService[] = []

    for (const item of body.selectedServices) {
      const [service] = await db
        .select({
          id: services.id,
          name: services.name,
          depositType: services.depositType,
          depositValue: services.depositValue,
        })
        .from(services)
        .where(eq(services.slug, item.serviceSlug))
        .limit(1)

      if (!service) {
        return NextResponse.json(
          { error: `Service not found: ${item.serviceSlug}` },
          { status: 400 },
        )
      }

      const [variant] = await db
        .select({
          id: serviceVariants.id,
          name: serviceVariants.name,
          priceCents: serviceVariants.priceCents,
          durationMinutes: serviceVariants.durationMinutes,
          depositCents: serviceVariants.depositCents,
          active: serviceVariants.active,
        })
        .from(serviceVariants)
        .where(
          and(
            eq(serviceVariants.serviceId, service.id),
            eq(serviceVariants.slug, item.subserviceSlug),
          ),
        )
        .limit(1)

      if (!variant || !variant.active) {
        return NextResponse.json(
          { error: `Service option is unavailable: ${item.subserviceSlug}` },
          { status: 400 },
        )
      }

      const serviceDeposit =
        service.depositType === "percentage"
          ? Math.round((variant.priceCents * service.depositValue) / 100)
          : service.depositValue

      resolved.push({
        serviceId: service.id,
        variantId: variant.id,
        name: variant.name,
        priceCents: variant.priceCents,
        durationMinutes: variant.durationMinutes,
        depositCents: variant.depositCents ?? serviceDeposit,
      })
    }

    const startsAt = localSalonDate(body.date, body.time)
    const totalDurationMinutes = resolved.reduce(
      (sum, item) => sum + item.durationMinutes,
      0,
    )
    const endsAt = new Date(startsAt.getTime() + totalDurationMinutes * 60_000)
    const totalCents = resolved.reduce((sum, item) => sum + item.priceCents, 0)
    const depositCents = resolved.reduce((sum, item) => sum + item.depositCents, 0)
    const reference = createReference()

    const [created] = await db
      .insert(bookings)
      .values({
        reference,
        customerName: `${body.customer.firstName} ${body.customer.lastName}`.trim(),
        email: body.customer.email,
        phone: body.customer.phone,
        status: "pending_payment",
        startsAt,
        endsAt,
        depositCents,
        totalCents,
        notes: body.customer.note || null,
        answers: {
          ...body.answers,
          _depositPolicy: {
            acceptedAt: body.policyAcceptedAt,
            version: body.policyVersion,
          },
          _referenceImages: body.referenceImages,
        },
      })
      .returning({
        id: bookings.id,
        reference: bookings.reference,
        createdAt: bookings.createdAt,
      })

    try {
      await db.insert(bookingServices).values(
        resolved.map((item) => ({
          bookingId: created.id,
          serviceId: item.serviceId,
          variantId: item.variantId,
          name: item.name,
          priceCents: item.priceCents,
          durationMinutes: item.durationMinutes,
        })),
      )
    } catch (error) {
      await db.delete(bookings).where(eq(bookings.id, created.id))
      throw error
    }

    return NextResponse.json(
      {
        id: created.reference,
        databaseId: created.id,
        status: "pending_payment",
        createdAt: created.createdAt.toISOString(),
        depositAmount: depositCents / 100,
        totalAmount: totalCents / 100,
      },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Please check your booking details.", issues: error.issues },
        { status: 400 },
      )
    }

    console.error("Failed to create booking draft", error)
    return NextResponse.json(
      { error: "We could not save your booking. Please try again." },
      { status: 500 },
    )
  }
}
