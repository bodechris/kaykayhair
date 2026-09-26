"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type BookingStatus =
  | "pending_payment"
  | "confirmed"
  | "checked_in"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show"
  | "rescheduled"

const statuses: Array<{ value: BookingStatus; label: string }> = [
  { value: "pending_payment", label: "Pending payment" },
  { value: "confirmed", label: "Confirmed" },
  { value: "checked_in", label: "Checked in" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "rescheduled", label: "Rescheduled" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no_show", label: "No show" },
]

export default function BookingStatusControl({
  bookingId,
  status,
}: {
  bookingId: string
  status: BookingStatus
}) {
  const router = useRouter()
  const [value, setValue] = useState<BookingStatus>(status)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const changeStatus = async (nextStatus: BookingStatus) => {
    const previous = value
    setValue(nextStatus)
    setSaving(true)
    setError("")

    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      })

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(result?.error || "Could not update booking")
      }

      router.refresh()
    } catch (caught) {
      setValue(previous)
      setError(caught instanceof Error ? caught.message : "Could not update booking")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ minWidth: 170 }}>
      <select
        aria-label="Booking status"
        value={value}
        disabled={saving}
        onChange={(event) => changeStatus(event.target.value as BookingStatus)}
        style={{
          width: "100%",
          minHeight: 40,
          border: "1px solid #e4dfe3",
          borderRadius: 999,
          padding: "0 34px 0 14px",
          background: "white",
          color: "#231c22",
          fontWeight: 700,
          cursor: saving ? "wait" : "pointer",
        }}
      >
        {statuses.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {error ? (
        <div style={{ marginTop: 6, color: "#b42318", fontSize: 12 }}>{error}</div>
      ) : null}
    </div>
  )
}
