import { Box, Grid, Text } from "@chakra-ui/react";
import { AdminPageHeader, ManagementCard, MetricGrid, SetupNotice } from "@/components/admin/AdminPage";
// import { databaseConfigured } from "@/lib/db/client";
import { getAdminOverview, getModuleCounts } from "@/lib/db/admin-queries";

export default async function AdminDashboardPage() {
  const [metrics, counts] = await Promise.all([getAdminOverview(), getModuleCounts()]);
  return (
    <>
      <AdminPageHeader eyebrow="Operations" title="Everything that runs Kaykay Hair." description="Bookings, sales, members, Care+, content and leads in one focused workspace." />
      {/* {!databaseConfigured && <SetupNotice />} */}
      <MetricGrid metrics={metrics} />

      <Text mt={10} mb={4} fontSize="13px" fontWeight="800" textTransform="uppercase" letterSpacing=".1em" color="#8b828e">Manage</Text>
      <Grid templateColumns={{ base: "1fr", xl: "repeat(3, 1fr)" }} gap={4}>
        <ManagementCard href="/admin/products" title="Shop" body="Products, inventory, pricing, orders and abandoned carts." status={`${counts.products} products`} />
        <ManagementCard href="/admin/services" title="Services & bookings" body="Services, variants, questions, deposits, availability and appointment lifecycle." status={`${counts.services} services`} />
        <ManagementCard href="/admin/lookbook" title="Discovery content" body="Lookbook and before/after content with linked services and products." status={`${counts.lookbook + counts.transformations} items`} />
        <ManagementCard href="/admin/care-plus" title="Care+" body="Plans, active subscribers, renewals, pauses and member value." />
        <ManagementCard href="/admin/members" title="Members & leads" body="Lightweight customer accounts, saved collections, likes, newsletter and lead magnets." />
        <ManagementCard href="/admin/testimonials" title="Homepage proof" body="Testimonials and hero slides, including ordering and publish state." status={`${counts.testimonials + counts.heroSlides} items`} />
      </Grid>

      <Box mt={8} bg="#171219" color="white" borderRadius="28px" p={{ base: 6, md: 8 }}>
        <Text fontSize="12px" color="whiteAlpha.600" textTransform="uppercase" letterSpacing=".1em" fontWeight="800">Lean architecture</Text>
        <Text mt={2} fontSize={{ base: "22px", md: "28px" }} fontWeight="800" letterSpacing="-.03em">One Postgres database. One auth system. One admin.</Text>
        <Text mt={3} color="whiteAlpha.700" maxW="760px" lineHeight="1.7">Customer accounts and admin accounts share Better Auth, while role checks protect the admin. Content, commerce, bookings and CRM-style lead data stay relational in Postgres instead of being split across services.</Text>
      </Box>
    </>
  );
}
