import { asc, desc } from "drizzle-orm"
import { AdminPageHeader } from "@/components/admin/AdminPage"
import RecordList from "@/components/admin/RecordList"
import { db } from "@/lib/db/client"
import { carePlusMemberships, carePlusPlans } from "@/lib/db/schema"

const money = (cents: number) => new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(cents / 100)
export default async function Page() {
  const [plans, members] = await Promise.all([db.select().from(carePlusPlans).orderBy(asc(carePlusPlans.sortOrder)), db.select().from(carePlusMemberships).orderBy(desc(carePlusMemberships.createdAt)).limit(100)])
  return <><AdminPageHeader eyebrow="Retention" title="Care+" description="Plans and memberships stored in Postgres." /><RecordList emptyMessage="No Care+ plans yet." records={plans.map((item) => ({ id: item.id, title: item.name, subtitle: item.description, badge: item.status, details: [{ label: "Price", value: money(item.priceCents) }, { label: "Benefits", value: String(item.benefits.length) }] }))} /><div style={{ height: 24 }} /><RecordList emptyMessage="No Care+ memberships yet." records={members.map((item) => ({ id: item.id, title: item.customerName || item.email, subtitle: item.email, badge: item.status, details: [{ label: "Provider", value: item.provider || "—" }, { label: "Period end", value: item.currentPeriodEnd ? item.currentPeriodEnd.toLocaleDateString("en-ZA") : "—" }] }))} /></>
}
