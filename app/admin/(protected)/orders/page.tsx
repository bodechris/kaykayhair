import { desc } from "drizzle-orm"
import { AdminPageHeader } from "@/components/admin/AdminPage"
import RecordList from "@/components/admin/RecordList"
import { db } from "@/lib/db/client"
import { orders } from "@/lib/db/schema"

const money = (cents: number) => new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(cents / 100)
export default async function Page() {
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(100)
  return <><AdminPageHeader eyebrow="Commerce" title="Orders & carts" description="Live order records and payment state from Postgres." /><RecordList emptyMessage="No orders yet." records={rows.map((item) => ({ id: item.id, title: item.reference, subtitle: `${item.customerName || "Customer"} · ${item.email}`, badge: item.status, details: [{ label: "Total", value: money(item.totalCents) }, { label: "Phone", value: item.phone || "—" }, { label: "Payment", value: item.paymentReference || "Not recorded" }] }))} /></>
}
