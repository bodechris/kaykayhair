import { desc } from "drizzle-orm"
import { AdminPageHeader } from "@/components/admin/AdminPage"
import RecordList from "@/components/admin/RecordList"
import { db } from "@/lib/db/client"
import { products } from "@/lib/db/schema"

const money = (cents: number) => new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(cents / 100)

export default async function Page() {
  const rows = await db.select().from(products).orderBy(desc(products.createdAt)).limit(100)
  return <><AdminPageHeader eyebrow="Commerce" title="Products" description="Live product catalogue records stored in Postgres." /><RecordList emptyMessage="No products yet." records={rows.map((item) => ({ id: item.id, title: item.name, subtitle: item.description || item.slug, badge: item.status, details: [{ label: "Price", value: money(item.priceCents) }, { label: "Inventory", value: String(item.inventory) }, { label: "SKU", value: item.sku || "—" }, { label: "Featured", value: item.featured ? "Yes" : "No" }] }))} /></>
}
