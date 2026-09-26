import { Grid } from "@chakra-ui/react";
import { AdminPageHeader, ManagementCard, SetupNotice } from "@/components/admin/AdminPage";
// import { databaseConfigured } from "@/lib/db/client";

export default function Page() {
  return (
    <>
      <AdminPageHeader eyebrow='System' title='Settings' description='Keep business-wide rules in one place as the platform grows.' />
      {/* {!databaseConfigured && <SetupNotice />} */}
      <Grid templateColumns={{ base: "1fr", xl: "repeat(2, 1fr)" }} gap={4}>
        <ManagementCard title='Business details' body='Contact details, social profiles and WhatsApp defaults.' />
        <ManagementCard title='Booking rules' body='Global fallback deposit, booking horizon, rescheduling and cancellation rules.' />
        <ManagementCard title='Integrations' body='Payment, email and media-provider configuration should be represented here but secrets stay in Netlify environment variables.' />
      </Grid>
    </>
  );
}
