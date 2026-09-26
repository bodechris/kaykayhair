import { desc } from "drizzle-orm"
import { AdminPageHeader } from "@/components/admin/AdminPage"
import RecordList from "@/components/admin/RecordList"
import { db } from "@/lib/db/client"
import { user } from "@/lib/db/schema"

export default async function Page() {
  const rows = await db.select().from(user).orderBy(desc(user.createdAt)).limit(100)
  return <><AdminPageHeader eyebrow="Audience" title="Members" description="Better Auth users and their account state." /><RecordList emptyMessage="No members yet." records={rows.map((item) => ({ id: item.id, title: item.name, subtitle: item.email, badge: item.role || "user", details: [{ label: "Verified", value: item.emailVerified ? "Yes" : "No" }, { label: "Banned", value: item.banned ? "Yes" : "No" }, { label: "Joined", value: item.createdAt.toLocaleDateString("en-ZA") }] }))} /></>
}
