"use client"

import { Box, Flex, Text } from "@chakra-ui/react"
import { FaWhatsapp } from "react-icons/fa"

const WHATSAPP_NUMBER = "27717824439"
const WHATSAPP_MESSAGE =
  "Hi Kaykay Hair 👋 I’m visiting your website and I’d like some help choosing or booking a service."

export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`

export default function WhatsAppChatButton() {
  return (
    <Box
      as="a"
      href={WHATSAPP_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      position="fixed"
      right={{ base: "16px", md: "24px" }}
      bottom={{ base: "16px", md: "24px" }}
      zIndex={1200}
      aria-label="Chat with Kaykay Hair on WhatsApp"
      textDecoration="none"
      _focusVisible={{
        outline: "3px solid var(--kh-color-pink-200)",
        outlineOffset: "4px",
      }}
    >
      <Flex
        align="center"
        gap={{ base: "0", sm: "10px" }}
        minH={{ base: "56px", sm: "58px" }}
        minW={{ base: "56px", sm: "auto" }}
        px={{ base: "0", sm: "20px" }}
        justify="center"
        borderRadius="999px"
        bg="var(--kh-color-black)"
        color="white"
        boxShadow="0 16px 44px rgba(0, 0, 0, 0.20)"
        border="1px solid rgba(255,255,255,0.16)"
        transition="transform 180ms ease, box-shadow 180ms ease, background 180ms ease"
        _hover={{
          transform: "translateY(-2px)",
          bg: "var(--kh-color-pink)",
          boxShadow: "0 20px 50px rgba(220, 53, 95, 0.26)",
        }}
      >
        <Box as={FaWhatsapp} boxSize="22px" flexShrink={0} />
        <Text
          display={{ base: "none", sm: "block" }}
          fontFamily="var(--kh-font-button)"
          fontSize="13px"
          fontWeight="700"
          letterSpacing="-0.01em"
          whiteSpace="nowrap"
        >
          Chat with us on WhatsApp
        </Text>
      </Flex>
    </Box>
  )
}
