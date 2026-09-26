"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  id: string
  name: string
  description: string | null
  priceCents: number
  durationMinutes: number
  depositCents: number | null
  active: boolean
}

export default function VariantEditor(props: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState(props)

  const save = async () => {
    setSaving(true)
    setError("")
    try {
      const response = await fetch(`/api/admin/variants/${props.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description || null,
          priceCents: Number(form.priceCents),
          durationMinutes: Number(form.durationMinutes),
          depositCents: form.depositCents == null ? null : Number(form.depositCents),
          active: form.active,
        }),
      })
      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(result?.error || "Could not save option")
      }
      setOpen(false)
      router.refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save option")
    } finally {
      setSaving(false)
    }
  }

  if (!open) return <button type="button" onClick={() => setOpen(true)} style={editButtonStyle}>Edit</button>

  return (
    <div style={{ gridColumn: "1 / -1", padding: 14, background: "#fbf9fa", borderRadius: 16, border: "1px solid #eee8ec" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
        <label style={labelStyle}>Name<input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label style={labelStyle}>Price (cents)<input type="number" min="0" style={inputStyle} value={form.priceCents} onChange={(e) => setForm({ ...form, priceCents: Number(e.target.value) })} /></label>
        <label style={labelStyle}>Duration<input type="number" min="0" style={inputStyle} value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })} /></label>
        <label style={labelStyle}>Deposit (cents)<input type="number" min="0" style={inputStyle} value={form.depositCents ?? ""} onChange={(e) => setForm({ ...form, depositCents: e.target.value === "" ? null : Number(e.target.value) })} /></label>
        <label style={{ ...labelStyle, justifyContent: "end" }}><span>Active</span><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} style={{ width: 20, height: 20 }} /></label>
      </div>
      <label style={{ ...labelStyle, marginTop: 10 }}>Description<textarea style={{ ...inputStyle, minHeight: 80, paddingTop: 8 }} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
      {error ? <div style={{ color: "#b42318", fontSize: 12, marginTop: 8 }}>{error}</div> : null}
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}><button type="button" disabled={saving} onClick={save} style={saveButtonStyle}>{saving ? "Saving…" : "Save"}</button><button type="button" onClick={() => setOpen(false)} style={editButtonStyle}>Cancel</button></div>
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 5, fontSize: 11, fontWeight: 800, color: "#7c7379", textTransform: "uppercase", letterSpacing: ".04em" }
const inputStyle: React.CSSProperties = { width: "100%", minHeight: 38, border: "1px solid #ddd5db", borderRadius: 10, padding: "0 9px", background: "white", color: "#231c22", fontSize: 13, textTransform: "none", letterSpacing: "normal", fontWeight: 500 }
const editButtonStyle: React.CSSProperties = { minHeight: 34, border: "1px solid #ddd5db", borderRadius: 999, padding: "0 12px", background: "white", color: "#231c22", fontWeight: 700, cursor: "pointer" }
const saveButtonStyle: React.CSSProperties = { ...editButtonStyle, background: "#171219", borderColor: "#171219", color: "white" }
