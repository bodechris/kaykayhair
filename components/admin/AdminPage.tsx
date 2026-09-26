import { Badge, Box, Button, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export function AdminPageHeader({ eyebrow, title, description, actionLabel, actionHref }: {
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} gap={6} direction={{ base: "column", md: "row" }} mb={8}>
      <Box maxW="760px">
        {eyebrow && <Text textTransform="uppercase" letterSpacing=".12em" fontWeight="800" fontSize="11px" color="var(--kh-color-primary, #ec2f6f)" mb={2}>{eyebrow}</Text>}
        <Text as="h1" fontSize={{ base: "30px", md: "42px" }} lineHeight="1" fontWeight="800" letterSpacing="-.04em">{title}</Text>
        <Text mt={3} color="#6f6872" maxW="680px" lineHeight="1.7">{description}</Text>
      </Box>
      {actionLabel && actionHref && <Link href={actionHref}><Button bg="#171219" color="white" borderRadius="999px" px={6} minH="46px" _hover={{ bg: "#2b232d" }}>{actionLabel}</Button></Link>}
    </Flex>
  );
}

export function SetupNotice() {
  return (
    <Box border="1px solid #eed7e1" bg="#fff9fb" borderRadius="24px" p={{ base: 5, md: 6 }} mb={8}>
      <HStack align="flex-start" gap={4}>
        <Box w="10px" h="10px" mt="7px" borderRadius="full" bg="var(--kh-color-primary, #ec2f6f)" flexShrink={0} />
        <Box>
          <Text fontWeight="800">Database setup required</Text>
          <Text mt={1} color="#6f6872" lineHeight="1.65">The admin UI is ready, but it will stay read-only until <code>NETLIFY_DB_URL</code> and Better Auth secrets are configured and the migrations are run.</Text>
        </Box>
      </HStack>
    </Box>
  );
}

export function MetricGrid({ metrics }: { metrics: Array<{ label: string; value: string | number; hint?: string }> }) {
  return (
    <Grid templateColumns={{ base: "1fr", sm: "repeat(2,1fr)", xl: "repeat(4,1fr)" }} gap={4}>
      {metrics.map((m) => (
        <Box key={m.label} bg="white" border="1px solid #ebe8ec" borderRadius="24px" p={6} boxShadow="0 12px 32px rgba(25,18,28,.035)">
          <Text fontSize="13px" color="#837b86">{m.label}</Text>
          <Text fontSize="34px" fontWeight="800" letterSpacing="-.04em" mt={2}>{m.value}</Text>
          {m.hint && <Text fontSize="12px" color="#9b929f" mt={1}>{m.hint}</Text>}
        </Box>
      ))}
    </Grid>
  );
}

export function ManagementCard({ title, body, status = "Ready", children, href }: { title: string; body: string; status?: string; children?: React.ReactNode; href?: string }) {
  const card = (
    <Box bg="white" border="1px solid #ebe8ec" borderRadius="26px" p={{ base: 5, md: 6 }} h="full" transition="transform 180ms ease, box-shadow 180ms ease" _hover={href ? { transform: "translateY(-2px)", boxShadow: "0 14px 34px rgba(25,18,28,.06)" } : undefined}>
      <Flex justify="space-between" gap={4} align="flex-start">
        <Box>
          <Text fontWeight="800" fontSize="17px">{title}</Text>
          <Text mt={2} color="#746d77" fontSize="14px" lineHeight="1.65">{body}</Text>
        </Box>
        <Badge bg="#f8edf2" color="#a61c4f" borderRadius="999px" px={3} py={1} textTransform="none">{status}</Badge>
      </Flex>
      {children && <VStack align="stretch" mt={5}>{children}</VStack>}
    </Box>
  );

  return href ? <Link href={href} style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>{card}</Link> : card;
}
