"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Field, Input, Text, VStack } from "@chakra-ui/react";
import { authClient } from "@/lib/auth/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const result = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (result.error) {
      setError("We couldn't sign you in. Check your email and password and try again.");
      return;
    }
    router.replace("/admin/dashboard");
    router.refresh();
  }

  return (
    <Box minH="100vh" bg="#f7f6f7" display="grid" placeItems="center" p={5}>
      <Box w="100%" maxW="470px" bg="white" border="1px solid #ebe8ec" borderRadius="32px" p={{ base: 6, md: 9 }} boxShadow="0 30px 90px rgba(25,18,28,.08)">
        <Box w="46px" h="46px" borderRadius="16px" bg="var(--kh-color-primary, #ec2f6f)" mb={7} />
        <Text fontSize="12px" textTransform="uppercase" letterSpacing=".12em" fontWeight="800" color="#9b929f">Kaykay Hair</Text>
        <Text as="h1" fontSize={{ base: "32px", md: "40px" }} fontWeight="800" letterSpacing="-.04em" mt={1}>Admin sign in</Text>
        <Text color="#746d77" mt={3} mb={7}>Manage bookings, shop, members, Care+, content and leads from one place.</Text>

        <form onSubmit={submit}>
          <VStack gap={5} align="stretch">
            <Field.Root required>
              <Field.Label>Email</Field.Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" minH="52px" px={4} borderRadius="16px" />
            </Field.Root>
            <Field.Root required>
              <Field.Label>Password</Field.Label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" minH="52px" px={4} borderRadius="16px" />
            </Field.Root>
            {error && <Box bg="#fff7f8" color="#a61c32" border="1px solid #f4d9dd" borderRadius="18px" px={4} py={3} fontSize="13px">{error}</Box>}
            <Button type="submit" loading={loading} bg="#171219" color="white" minH="54px" borderRadius="999px" px={7} _hover={{ bg: "#2d252f" }}>Sign in</Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
