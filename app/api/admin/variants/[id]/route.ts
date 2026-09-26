import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/lib/auth/server"
import { db } from "@/lib/db/client"
import { serviceVariants } from "@/lib/db/schema"

const schema = z.object({
  name: z.string().trim().min(1).max(160),
  description: z.string().trim().max(5000).nullable(),
  priceCents: z.number().int().min(0),
  durationMinutes: z.number().int().min(0),
  depositCents: z.number().int().min(0).nullable(),
  active: z.boolean(),
})

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: request.headers })
  const role = (session?.user as { role?: string } | undefined)?.role
  if (!session || role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id } = await context.params
    const values = schema.parse(await request.json())
    const [updated] = await db
      .update(serviceVariants)
      .set(values)
      .where(eq(serviceVariants.id, id))
      .returning({ id: serviceVariants.id })
    if (!updated) return NextResponse.json({ error: "Service option not found" }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Invalid option data", issues: error.issues }, { status: 400 })
    console.error("Failed to update service option", error)
    return NextResponse.json({ error: "Could not update service option" }, { status: 500 })
  }
}
