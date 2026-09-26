import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/lib/auth/server"
import { db } from "@/lib/db/client"
import { bookings } from "@/lib/db/schema"

const statusSchema = z.object({
  status: z.enum([
    "pending_payment",
    "confirmed",
    "checked_in",
    "in_progress",
    "completed",
    "cancelled",
    "no_show",
    "rescheduled",
  ]),
})

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: request.headers })
  const role = (session?.user as { role?: string } | undefined)?.role

  if (!session || role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await context.params
    const { status } = statusSchema.parse(await request.json())

    const [updated] = await db
      .update(bookings)
      .set({ status, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning({ id: bookings.id, status: bookings.status })

    if (!updated) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid booking status" }, { status: 400 })
    }

    console.error("Failed to update booking status", error)
    return NextResponse.json({ error: "Could not update booking" }, { status: 500 })
  }
}
