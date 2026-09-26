"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  id: string
  name: string
  description: string
  fromPriceCents: number
  durationMinutes: number
  depositValue: number
  status: "draft" | "published" | "archived"
}

export default function ServiceEditor(props: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState(props)

  const save = async () => {
    setSaving(true)
    setError("")
    try {
      const response = await fetch(`/api/admin/services/${props.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          fromPriceCents: Number(form.fromPriceCents),
          durationMinutes: Number(form.durationMinutes),
          depositValue: Number(form.depositValue),
          status: form.status,
        }),
      })
      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(result?.error || "Could not save service")
      }
      setOpen(false)
      router.refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save service")
    } finally {
      setSaving(false)
    }
  }

  if (!open) {
    return <button type="button" onClick={() => setOpen(true)} style={editButtonStyle}>Edit service</button>
  }

  return (
    <div style={panelStyle}>
      <div style={gridStyle}>
        <label style={labelStyle}>Name<input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label style={labelStyle}>Status<select style={inputStyle} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Props["status"] })}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
        <label style={labelStyle}>From price (cents)<input type="number" min="0" style={inputStyle} value={form.fromPriceCents} onChange={(e) => setForm({ ...form, fromPriceCents: Number(e.target.value) })} /></label>
        <label style={labelStyle}>Duration (minutes)<input type="number" min="0" style={inputStyle} value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })} /></label>
        <label style={labelStyle}>Deposit value (cents)<input type="number" min="0" style={inputStyle} value={form.depositValue} onChange={(e) => setForm({ ...form, depositValue: Number(e.target.value) })} /></label>
      </div>
      <label style={{ ...labelStyle, marginTop: 12 }}>Description<textarea style={{ ...inputStyle, minHeight: 110, paddingTop: 10 }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
      {error ? <div style={{ color: "#b42318", fontSize: 12, marginTop: 8 }}>{error}</div> : null}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}><button type="button" disabled={saving} onClick={save} style={saveButtonStyle}>{saving ? "Saving…" : "Save"}</button><button type="button" onClick={() => setOpen(false)} style={editButtonStyle}>Cancel</button></div>
    </div>
  )
}

const panelStyle: React.CSSProperties = { marginTop: 18, padding: 16, background: "#fbf9fa", border: "1px solid #eee8ec", borderRadius: 18 }
const gridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }
const labelStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 5, fontSize: 11, fontWeight: 800, color: "#7c7379", textTransform: "uppercase", letterSpacing: ".04em" }
const inputStyle: React.CSSProperties = { width: "100%", minHeight: 40, border: "1px solid #ddd5db", borderRadius: 10, padding: "0 10px", background: "white", color: "#231c22", fontSize: 14, textTransform: "none", letterSpacing: "normal", fontWeight: 500 }
const editButtonStyle: React.CSSProperties = { minHeight: 38, border: "1px solid #ddd5db", borderRadius: 999, padding: "0 14px", background: "white", color: "#231c22", fontWeight: 700, cursor: "pointer" }
const saveButtonStyle: React.CSSProperties = { ...editButtonStyle, background: "#171219", borderColor: "#171219", color: "white" }
