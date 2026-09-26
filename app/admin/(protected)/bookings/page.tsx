import { desc, inArray } from "drizzle-orm"

import { AdminPageHeader } from "@/components/admin/AdminPage"
import BookingStatusControl from "@/components/admin/BookingStatusControl"
import { db } from "@/lib/db/client"
import { bookingServices, bookings } from "@/lib/db/schema"

function money(cents: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

function dateTime(value: Date) {
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Johannesburg",
  }).format(value)
}

function statusLabel(status: string) {
  return status.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export default async function Page() {
  const bookingRows = await db.select().from(bookings).orderBy(desc(bookings.createdAt)).limit(100)
  const serviceRows = bookingRows.length
    ? await db
        .select()
        .from(bookingServices)
        .where(inArray(bookingServices.bookingId, bookingRows.map((booking) => booking.id)))
    : []

  const servicesByBooking = new Map<string, typeof serviceRows>()
  for (const row of serviceRows) {
    const current = servicesByBooking.get(row.bookingId) ?? []
    current.push(row)
    servicesByBooking.set(row.bookingId, current)
  }

  const pending = bookingRows.filter((item) => item.status === "pending_payment").length
  const confirmed = bookingRows.filter((item) => item.status === "confirmed").length
  const upcoming = bookingRows.filter(
    (item) =>
      item.startsAt.getTime() >= Date.now() &&
      !["cancelled", "completed", "no_show"].includes(item.status),
  ).length

  return (
    <>
      <AdminPageHeader
        eyebrow="Operations"
        title="Bookings"
        description="Live booking records from Postgres. Review client details, services, payment state and appointment status from one place."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
          marginBottom: 30,
        }}
      >
        <Stat label="Total bookings" value={bookingRows.length} />
        <Stat label="Upcoming" value={upcoming} />
        <Stat label="Pending / confirmed" value={`${pending} / ${confirmed}`} />
      </div>

      {bookingRows.length === 0 ? (
        <div
          style={{
            background: "white",
            border: "1px solid #ebe8ec",
            borderRadius: 26,
            padding: 32,
            color: "#746d77",
          }}
        >
          No bookings yet. Once a customer completes the booking form, the draft will appear here immediately.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {bookingRows.map((booking) => {
            const bookedServices = servicesByBooking.get(booking.id) ?? []
            return (
              <article
                key={booking.id}
                style={{
                  background: "white",
                  border: "1px solid #ebe8ec",
                  borderRadius: 26,
                  padding: 24,
                  boxShadow: "0 12px 32px rgba(25,18,28,.035)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                      <strong style={{ fontSize: 18 }}>{booking.customerName}</strong>
                      <span
                        style={{
                          fontSize: 12,
                          borderRadius: 999,
                          padding: "5px 9px",
                          background: "#fff1f5",
                          color: "#b4235a",
                          fontWeight: 700,
                        }}
                      >
                        {statusLabel(booking.status)}
                      </span>
                    </div>
                    <div style={{ marginTop: 6, color: "#7d747b", fontSize: 13 }}>
                      {booking.reference} · {booking.email} · {booking.phone}
                    </div>
                  </div>

                  <BookingStatusControl bookingId={booking.id} status={booking.status} />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                    gap: 16,
                    marginTop: 22,
                    paddingTop: 20,
                    borderTop: "1px solid #f0ecef",
                  }}
                >
                  <Detail label="Starts" value={dateTime(booking.startsAt)} />
                  <Detail label="Ends" value={dateTime(booking.endsAt)} />
                  <Detail label="Deposit" value={money(booking.depositCents)} />
                  <Detail label="Estimated total" value={money(booking.totalCents)} />
                </div>

                {bookedServices.length ? (
                  <div style={{ marginTop: 20 }}>
                    <div style={{ fontSize: 11, color: "#9b929f", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em" }}>
                      Services
                    </div>
                    <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {bookedServices.map((item) => (
                        <span
                          key={`${booking.id}-${item.serviceId}`}
                          style={{
                            background: "#f7f4f6",
                            borderRadius: 999,
                            padding: "7px 11px",
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          {item.name} · {money(item.priceCents)}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {booking.notes ? (
                  <div style={{ marginTop: 18, color: "#6f6872", lineHeight: 1.6 }}>
                    <strong style={{ color: "#231c22" }}>Client note:</strong> {booking.notes}
                  </div>
                ) : null}

                {Object.keys(booking.answers ?? {}).filter((key) => !key.startsWith("_")).length ? (
                  <details style={{ marginTop: 16 }}>
                    <summary style={{ cursor: "pointer", fontWeight: 700, color: "#4f474d" }}>Booking answers</summary>
                    <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                      {Object.entries(booking.answers ?? {})
                        .filter(([key]) => !key.startsWith("_"))
                        .map(([key, value]) => (
                          <div key={key} style={{ fontSize: 13, color: "#6f6872" }}>
                            <strong style={{ color: "#231c22" }}>{key.replace(/^.*:/, "")}:</strong>{" "}
                            {Array.isArray(value) ? value.join(", ") : String(value ?? "")}
                          </div>
                        ))}
                    </div>
                  </details>
                ) : null}
              </article>
            )
          })}
        </div>
      )}
    </>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ background: "white", border: "1px solid #ebe8ec", borderRadius: 24, padding: 24 }}>
      <div style={{ fontSize: 13, color: "#837b86" }}>{label}</div>
      <div style={{ marginTop: 6, fontSize: 32, fontWeight: 800, letterSpacing: "-.04em" }}>{value}</div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: "#9b929f", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em" }}>{label}</div>
      <div style={{ marginTop: 5, fontWeight: 700 }}>{value}</div>
    </div>
  )
}
