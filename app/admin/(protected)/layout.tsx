import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { auth } from "@/lib/auth/server";
// import { databaseConfigured } from "@/lib/db/client";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  // if (!databaseConfigured) {
  //   return <AdminShell userName="Setup mode">{children}</AdminShell>;
  // }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");

  const role = (session.user as typeof session.user & { role?: string }).role;
  if (role !== "admin") redirect("/");

  return <AdminShell userName={session.user.name}>{children}</AdminShell>;
}
