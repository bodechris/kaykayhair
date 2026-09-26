import { asc } from "drizzle-orm"
import { AdminPageHeader } from "@/components/admin/AdminPage"
import RecordList from "@/components/admin/RecordList"
import { db } from "@/lib/db/client"
import { testimonials } from "@/lib/db/schema"

export default async function Page() {
  const rows = await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder)).limit(100)
  return <><AdminPageHeader eyebrow="Trust" title="Testimonials" description="Live social-proof records from Postgres." /><RecordList emptyMessage="No testimonials yet." records={rows.map((item) => ({ id: item.id, title: item.name, subtitle: item.quote, badge: item.status, details: [{ label: "Rating", value: `${item.rating}/5` }, { label: "Service", value: item.service || "—" }, { label: "Featured", value: item.featured ? "Yes" : "No" }] }))} /></>
}
