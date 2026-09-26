import { asc } from "drizzle-orm"
import { AdminPageHeader } from "@/components/admin/AdminPage"
import RecordList from "@/components/admin/RecordList"
import { db } from "@/lib/db/client"
import { heroSlides } from "@/lib/db/schema"

export default async function Page() {
  const rows = await db.select().from(heroSlides).orderBy(asc(heroSlides.sortOrder)).limit(100)
  return <><AdminPageHeader eyebrow="Homepage" title="Hero slides" description="Live homepage hero slide records stored in Postgres." /><RecordList emptyMessage="No hero slides yet." records={rows.map((item) => ({ id: item.id, title: item.title, subtitle: item.description || item.eyebrow || "", badge: item.status, details: [{ label: "CTA", value: item.ctaLabel || "—" }, { label: "Link", value: item.ctaHref || "—" }, { label: "Order", value: String(item.sortOrder) }] }))} /></>
}
