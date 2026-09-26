import { asc } from "drizzle-orm"
import { AdminPageHeader } from "@/components/admin/AdminPage"
import RecordList from "@/components/admin/RecordList"
import { db } from "@/lib/db/client"
import { transformationItems } from "@/lib/db/schema"

export default async function Page() {
  const rows = await db.select().from(transformationItems).orderBy(asc(transformationItems.sortOrder)).limit(100)
  return <><AdminPageHeader eyebrow="Proof" title="Before & Afters" description="Database-backed transformation proof and its conversion relationships." /><RecordList emptyMessage="No database-backed before & after items yet." records={rows.map((item) => ({ id: item.id, title: item.title, subtitle: item.outcome, badge: item.status, details: [{ label: "Category", value: item.category }, { label: "Service", value: item.relatedServiceSlug || "—" }, { label: "Care+", value: item.carePlusPlanSlug || "—" }] }))} /></>
}
