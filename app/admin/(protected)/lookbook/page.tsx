import { asc } from "drizzle-orm"
import { AdminPageHeader } from "@/components/admin/AdminPage"
import RecordList from "@/components/admin/RecordList"
import { db } from "@/lib/db/client"
import { lookbookItems } from "@/lib/db/schema"

export default async function Page() {
  const rows = await db.select().from(lookbookItems).orderBy(asc(lookbookItems.sortOrder)).limit(100)
  return <><AdminPageHeader eyebrow="Discovery" title="Lookbook" description="Live editorial lookbook records stored in Postgres." /><RecordList emptyMessage="No database-backed lookbook items yet." records={rows.map((item) => ({ id: item.id, title: item.title, subtitle: item.description, badge: item.status, details: [{ label: "Category", value: item.category }, { label: "Service", value: item.relatedServiceSlug || "—" }, { label: "Featured", value: item.featured ? "Yes" : "No" }, { label: "Tags", value: item.tags.join(", ") || "—" }] }))} /></>
}
