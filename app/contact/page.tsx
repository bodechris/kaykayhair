"use client"

import type { ElementType } from "react"
import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa"
import { FiArrowUpRight, FiMail } from "react-icons/fi"
import { WHATSAPP_CHAT_URL } from "@/components/WhatsAppChatButton"

const contact = {
  whatsappLabel: "+27 71 782 4439",
  email: "hello@kaykayhair.com",
  instagram: "https://www.instagram.com/kaykayhairofficial/",

  // Replace these three when the official Kaykay Hair profiles are ready.
  facebook: "https://www.facebook.com/",
  tiktok: "https://www.tiktok.com/",
  youtube: "https://www.youtube.com/",
}

const socialLinks = [
  {
    label: "Instagram",
    handle: "@kaykayhairofficial",
    href: contact.instagram,
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    handle: "Kaykay Hair",
    href: contact.facebook,
    icon: FaFacebookF,
  },
  {
    label: "TikTok",
    handle: "Kaykay Hair",
    href: contact.tiktok,
    icon: FaTiktok,
  },
  {
    label: "YouTube",
    handle: "Kaykay Hair",
    href: contact.youtube,
    icon: FaYoutube,
  },
]

function ContactAction({
  eyebrow,
  title,
  description,
  href,
  icon,
  external = false,
}: {
  eyebrow: string
  title: string
  description: string
  href: string
  icon: ElementType
  external?: boolean
}) {
  const Icon = icon

  return (
    <Box
      as="a"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      display="block"
      p={{ base: "24px", md: "30px" }}
      border="var(--kh-border-light)"
      borderRadius={{ base: "22px", md: "28px" }}
      bg="white"
      color="var(--kh-color-black)"
      boxShadow="0 8px 30px rgba(0,0,0,0.035)"
      textDecoration="none"
      transition="transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "var(--kh-shadow-medium)",
        borderColor: "rgba(220, 53, 95, 0.28)",
      }}
      _focusVisible={{
        outline: "3px solid var(--kh-color-pink-200)",
        outlineOffset: "4px",
      }}
    >
      <Flex justify="space-between" align="flex-start" gap="18px">
        <Stack gap="18px" minW={0}>
          <Flex
            width="46px"
            height="46px"
            borderRadius="16px"
            bg="var(--kh-bg-pink-soft)"
            color="var(--kh-color-primary)"
            align="center"
            justify="center"
          >
            <Box as={Icon} boxSize="20px" />
          </Flex>

          <Stack gap="7px">
            <Text
              fontFamily="var(--kh-font-caption)"
              fontSize="11px"
              fontWeight="700"
              letterSpacing="0.1em"
              textTransform="uppercase"
              color="var(--kh-color-grey-3)"
            >
              {eyebrow}
            </Text>
            <Heading
              as="h2"
              fontFamily="var(--kh-font-heading)"
              fontSize={{ base: "27px", md: "34px" }}
              lineHeight="1"
              letterSpacing="-0.04em"
              fontWeight="500"
              overflowWrap="anywhere"
            >
              {title}
            </Heading>
            <Text
              mt="3px"
              maxW="480px"
              color="var(--kh-color-grey-4)"
              fontFamily="var(--kh-font-body)"
              fontSize={{ base: "14px", md: "15px" }}
              lineHeight="1.65"
            >
              {description}
            </Text>
          </Stack>
        </Stack>

        <Flex
          width="38px"
          height="38px"
          borderRadius="999px"
          bg="var(--kh-color-black)"
          color="white"
          align="center"
          justify="center"
          flexShrink={0}
        >
          <Box as={FiArrowUpRight} boxSize="17px" />
        </Flex>
      </Flex>
    </Box>
  )
}

export default function ContactPage() {
  return (
    <Box bg="var(--kh-bg-main)" minH="100vh" color="var(--kh-color-black)">
      <Box
        maxW="var(--kh-container-xl)"
        mx="auto"
        width={{ base: "var(--kh-main-app-width-mobile)", md: "var(--kh-main-app-width)" }}
        pt={{ base: "132px", md: "168px" }}
        pb={{ base: "110px", md: "150px" }}
      >
        <Stack gap={{ base: "58px", md: "86px" }}>
          <Stack gap="20px" maxW="900px">
            <Text
              fontFamily="var(--kh-font-caption)"
              fontSize="12px"
              fontWeight="700"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="var(--kh-color-primary)"
            >
              Contact Kaykay Hair
            </Text>

            <Heading
              as="h1"
              fontFamily="var(--kh-font-heading)"
              fontWeight="400"
              fontSize={{ base: "52px", md: "78px", lg: "98px" }}
              lineHeight={{ base: "0.96", md: "0.91" }}
              letterSpacing="-0.055em"
              maxW="1050px"
            >
              Need help with your hair? Talk to us.
            </Heading>

            <Text
              maxW="660px"
              fontFamily="var(--kh-font-body)"
              fontSize={{ base: "16px", md: "18px" }}
              lineHeight="1.65"
              color="var(--kh-color-grey-4)"
            >
              Questions about a style, booking, Care+, or an order? WhatsApp is the fastest way to reach us. You can also email us or find Kaykay Hair on social.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "14px", md: "20px" }}>
            <ContactAction
              eyebrow="Fastest response"
              title={contact.whatsappLabel}
              description="Chat with Kaykay Hair on WhatsApp. We’ll start the conversation with a message already filled in for you."
              href={WHATSAPP_CHAT_URL}
              icon={FaWhatsapp}
              external
            />

            <ContactAction
              eyebrow="Email"
              title={contact.email}
              description="Tap to open a new email in the mail app already set up on your phone or computer."
              href={`mailto:${contact.email}?subject=${encodeURIComponent("Hello Kaykay Hair")}`}
              icon={FiMail}
            />
          </SimpleGrid>

          <Box pt={{ base: "8px", md: "18px" }}>
            <Stack gap={{ base: "24px", md: "30px" }}>
              <Stack gap="8px">
                <Heading
                  as="h2"
                  fontFamily="var(--kh-font-heading)"
                  fontSize={{ base: "36px", md: "52px" }}
                  fontWeight="400"
                  letterSpacing="-0.045em"
                  lineHeight="1"
                >
                  Follow the looks.
                </Heading>
                <Text
                  color="var(--kh-color-grey-4)"
                  fontFamily="var(--kh-font-body)"
                  fontSize={{ base: "14px", md: "16px" }}
                >
                  New styles, transformations, hair care, products, and what we’re working on.
                </Text>
              </Stack>

              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="12px">
                {socialLinks.map((social) => {
                  const Icon = social.icon

                  return (
                    <Box
                      key={social.label}
                      as="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      p={{ base: "20px", md: "22px" }}
                      borderRadius="22px"
                      border="var(--kh-border-light)"
                      bg="white"
                      textDecoration="none"
                      color="var(--kh-color-black)"
                      transition="transform 180ms ease, background 180ms ease, color 180ms ease"
                      _hover={{
                        transform: "translateY(-2px)",
                        bg: "var(--kh-color-black)",
                        color: "white",
                      }}
                      _focusVisible={{
                        outline: "3px solid var(--kh-color-pink-200)",
                        outlineOffset: "4px",
                      }}
                    >
                      <Flex align="center" justify="space-between" gap="16px">
                        <HStack gap="12px" minW={0}>
                          <Flex
                            width="38px"
                            height="38px"
                            borderRadius="13px"
                            bg="var(--kh-bg-pink-soft)"
                            color="var(--kh-color-primary)"
                            align="center"
                            justify="center"
                            flexShrink={0}
                          >
                            <Box as={Icon} boxSize="17px" />
                          </Flex>
                          <Stack gap="1px" minW={0}>
                            <Text fontSize="14px" fontWeight="700" fontFamily="var(--kh-font-button)">
                              {social.label}
                            </Text>
                            <Text fontSize="11px" opacity="0.62" truncate>
                              {social.handle}
                            </Text>
                          </Stack>
                        </HStack>
                        <Box as={FiArrowUpRight} boxSize="15px" flexShrink={0} />
                      </Flex>
                    </Box>
                  )
                })}
              </SimpleGrid>
            </Stack>
          </Box>

          <Box
            borderRadius={{ base: "26px", md: "34px" }}
            bg="var(--kh-color-black)"
            color="white"
            p={{ base: "28px", md: "42px" }}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "center" }}
              gap="24px"
            >
              <Stack gap="8px" maxW="700px">
                <Text
                  color="var(--kh-color-pink-300)"
                  fontSize="11px"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.11em"
                >
                  Not sure what to book?
                </Text>
                <Heading
                  fontFamily="var(--kh-font-heading)"
                  fontSize={{ base: "32px", md: "46px" }}
                  fontWeight="400"
                  lineHeight="1"
                  letterSpacing="-0.04em"
                >
                  Send us the look you have in mind.
                </Heading>
                <Text opacity="0.7" fontSize={{ base: "14px", md: "15px" }} lineHeight="1.6">
                  A screenshot, inspiration photo, or a saved Kaykay look is enough. We’ll help you figure out the right service.
                </Text>
              </Stack>

              <Box
                as="a"
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                gap="10px"
                px="22px"
                py="15px"
                borderRadius="999px"
                bg="white"
                color="black"
                fontFamily="var(--kh-font-button)"
                fontSize="13px"
                fontWeight="700"
                whiteSpace="nowrap"
                textDecoration="none"
                transition="transform 180ms ease"
                _hover={{ transform: "translateY(-2px)" }}
              >
                <Box as={FaWhatsapp} boxSize="18px" />
                Start a WhatsApp chat
              </Box>
            </Flex>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
