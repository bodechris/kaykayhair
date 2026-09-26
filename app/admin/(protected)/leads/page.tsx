import { desc } from "drizzle-orm"
import { AdminPageHeader } from "@/components/admin/AdminPage"
import RecordList from "@/components/admin/RecordList"
import { db } from "@/lib/db/client"
import { leads } from "@/lib/db/schema"

export default async function Page() {
  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(100)
  return <><AdminPageHeader eyebrow="Top of funnel" title="Leads & lead magnets" description="Live leads with source and consent context." /><RecordList emptyMessage="No leads yet." records={rows.map((item) => ({ id: item.id, title: item.name || item.email, subtitle: item.email, badge: item.status, details: [{ label: "Source", value: item.source }, { label: "Phone", value: item.phone || "—" }, { label: "Campaign", value: item.campaign || "—" }] }))} /></>
}
