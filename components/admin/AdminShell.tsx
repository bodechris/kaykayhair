"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Box, Button, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import {
  FiCalendar,
  FiChevronRight,
  FiGrid,
  FiHeart,
  FiHome,
  FiImage,
  FiLayers,
  FiLogOut,
  FiMail,
  FiPackage,
  FiSettings,
  FiShoppingBag,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { authClient } from "@/lib/auth/client";

const nav = [
  { href: "/admin/dashboard", label: "Overview", icon: FiGrid },
  { href: "/admin/bookings", label: "Bookings", icon: FiCalendar },
  { href: "/admin/products", label: "Shop", icon: FiShoppingBag },
  { href: "/admin/orders", label: "Orders & carts", icon: FiPackage },
  { href: "/admin/services", label: "Services", icon: FiLayers },
  { href: "/admin/care-plus", label: "Care+", icon: FiHeart },
  { href: "/admin/members", label: "Members", icon: FiUsers },
  { href: "/admin/leads", label: "Leads & magnets", icon: FiMail },
  { href: "/admin/lookbook", label: "Lookbook", icon: FiImage },
  { href: "/admin/before-afters", label: "Before & afters", icon: FiImage },
  { href: "/admin/testimonials", label: "Testimonials", icon: FiStar },
  { href: "/admin/hero-slides", label: "Homepage hero", icon: FiHome },
  { href: "/admin/settings", label: "Settings", icon: FiSettings },
];

export default function AdminShell({ children, userName }: { children: React.ReactNode; userName?: string | null }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await authClient.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <Flex minH="100vh" bg="#f7f6f7" color="#171219">
      <Box
        as="aside"
        w={{ base: "82px", lg: "270px" }}
        bg="#171219"
        color="white"
        px={{ base: 3, lg: 5 }}
        py={6}
        position="fixed"
        insetY={0}
        left={0}
        overflowY="auto"
        zIndex={30}
      >
        <HStack px={{ base: 1, lg: 3 }} mb={8} minH="48px">
          <Box w="36px" h="36px" borderRadius="14px" bg="var(--kh-color-primary, #ec2f6f)" />
          <Box display={{ base: "none", lg: "block" }}>
            <Text fontWeight="800" fontSize="15px">KAYKAY</Text>
            <Text fontSize="11px" color="whiteAlpha.600" letterSpacing=".08em">ADMIN</Text>
          </Box>
        </HStack>

        <VStack align="stretch" gap={1}>
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                <HStack
                  minH="48px"
                  px={{ base: 3, lg: 4 }}
                  borderRadius="16px"
                  bg={active ? "white" : "transparent"}
                  color={active ? "#171219" : "whiteAlpha.800"}
                  _hover={{ bg: active ? "white" : "whiteAlpha.100", color: active ? "#171219" : "white" }}
                  transition="all .16s ease"
                >
                  <Icon as={item.icon} boxSize="18px" flexShrink={0} />
                  <Text display={{ base: "none", lg: "block" }} fontSize="14px" fontWeight={active ? "700" : "500"} flex="1">{item.label}</Text>
                  {active && <Icon as={FiChevronRight} display={{ base: "none", lg: "block" }} boxSize="14px" />}
                </HStack>
              </Link>
            );
          })}
        </VStack>
      </Box>

      <Box ml={{ base: "82px", lg: "270px" }} w={{ base: "calc(100% - 82px)", lg: "calc(100% - 270px)" }}>
        <Flex
          as="header"
          minH="76px"
          px={{ base: 5, md: 8 }}
          align="center"
          justify="space-between"
          borderBottom="1px solid #e7e3e8"
          bg="rgba(255,255,255,.92)"
          backdropFilter="blur(14px)"
          position="sticky"
          top={0}
          zIndex={20}
        >
          <Box>
            <Text fontSize="12px" color="#837b86">Kaykay Hair operations</Text>
            <Text fontWeight="700" fontSize="14px">{userName || "Administrator"}</Text>
          </Box>
          <Button onClick={signOut} variant="ghost" borderRadius="999px" px={5} gap={2}>
            <FiLogOut /> <Text display={{ base: "none", sm: "block" }}>Sign out</Text>
          </Button>
        </Flex>
        <Box p={{ base: 5, md: 8, xl: 10 }} maxW="1600px" mx="auto">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
