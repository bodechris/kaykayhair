"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Badge, Box, Button, CloseButton, Dialog, Field, Flex, Grid, Heading, HStack, Image, Input, Portal, Separator, SimpleGrid, Steps, Text, VStack } from "@chakra-ui/react"
import { getProduct, money, type ShopProduct } from "../shop/products"

type CheckoutLine = {
  productId: string
  quantity: number
  selections: Record<string, string>
  unitPrice: number
}

const steps = ["Your details", "Delivery", "Payment"]

function TextField({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return <Field.Root required><Field.Label fontWeight="750" fontSize="sm">{label}<Field.RequiredIndicator /></Field.Label>
    <Input type={type} placeholder={placeholder} minH="13" px="4.5" rounded="xl" borderColor="blackAlpha.200" bg="white" _focus={{ borderColor: "#dc355f", boxShadow: "0 0 0 1px #dc355f" }} />
  </Field.Root>
}

export default function CheckoutPage() {
  const [line, setLine] = useState<CheckoutLine | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [step, setStep] = useState(0)
  const [complete, setComplete] = useState(false)
  const [delivery, setDelivery] = useState<"standard" | "collect">("standard")

  useEffect(() => {
    const stored = window.localStorage.getItem("kaykay-checkout")
    if (stored) {
      try { setLine(JSON.parse(stored) as CheckoutLine) } catch { setLine(null) }
    }
    setLoaded(true)
  }, [])

  const product = useMemo<ShopProduct | undefined>(() => line ? getProduct(line.productId) : undefined, [line])
  const deliveryFee = delivery === "standard" ? 95 : 0
  const subtotal = line ? line.unitPrice * line.quantity : 0

  if (!loaded) return <Box minH="70vh" bg="#f7f4f2" />
  if (!line || !product) return <Box as="main" minH="70vh" bg="#f7f4f2" px={{ base: "5", md: "12" }} py="20">
    <VStack maxW="620px" mx="auto" bg="white" rounded="3xl" p={{ base: "8", md: "12" }} gap="6" textAlign="center">
      <Text color="#dc355f" fontWeight="900" letterSpacing=".14em" textTransform="uppercase" fontSize="sm">Your bag is empty</Text>
      <Heading fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "4xl", md: "5xl" }} lineHeight="1.08" pb="1">Find something made for you.</Heading>
      <Button asChild minH="13" px="8" rounded="full" bg="#171313" color="white"><Link href="/shop">Return to shop</Link></Button>
    </VStack>
  </Box>

  return <Box as="main" bg="#f7f4f2" color="#171313" minH="100vh" px={{ base: "5", sm: "7", md: "10", xl: "14" }} py={{ base: "8", md: "12" }}>
    <Flex justify="space-between" align="center" gap="5" mb={{ base: "9", md: "12" }}>
      <Button asChild variant="ghost" minH="11" px="5" rounded="full"><Link href={`/shop/${product.id}`}>← Back</Link></Button>
      <Text fontWeight="900" letterSpacing=".16em" fontSize="sm">KAYKAY HAIR</Text>
      <Badge rounded="full" bg="white" px="4" py="2">Secure checkout</Badge>
    </Flex>

    <Grid templateColumns={{ base: "1fr", xl: "minmax(0,1fr) 430px" }} gap={{ base: "8", xl: "10" }} maxW="1500px" mx="auto" alignItems="start">
      <Box bg="white" rounded={{ base: "2xl", md: "3xl" }} p={{ base: "6", sm: "8", md: "12" }} minW="0">
        <Text color="#dc355f" textTransform="uppercase" letterSpacing=".15em" fontWeight="900" fontSize="sm" mb="3">Checkout</Text>
        <Heading fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "4xl", md: "6xl" }} lineHeight="1.06" letterSpacing="-.05em" pb="2" mb="9">Almost yours.</Heading>

        <Steps.Root step={step} count={steps.length} onStepChange={(details) => setStep(details.step)} colorPalette="pink">
          <Steps.List mb={{ base: "8", md: "12" }} overflowX="auto" pb="2">
            {steps.map((label, index) => <Steps.Item key={label} index={index} minW="max-content">
              <Steps.Trigger gap="3"><Steps.Indicator bg={step >= index ? "#171313" : "transparent"} color={step >= index ? "white" : "#171313"}><Steps.Number /></Steps.Indicator><Steps.Title fontWeight="800">{label}</Steps.Title></Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>)}
          </Steps.List>

          <Steps.Content index={0}><VStack align="stretch" gap="6">
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="5"><TextField label="First name" placeholder="Your first name" /><TextField label="Last name" placeholder="Your last name" /></SimpleGrid>
            <TextField label="Email address" type="email" placeholder="you@example.com" /><TextField label="Mobile number" type="tel" placeholder="+27" />
          </VStack></Steps.Content>

          <Steps.Content index={1}><VStack align="stretch" gap="6">
            <Text fontWeight="800">How would you like to receive your order?</Text>
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
              <Button h="auto" minH="24" px="6" py="5" whiteSpace="normal" textAlign="left" justifyContent="flex-start" rounded="2xl" variant="outline" borderWidth={delivery === "standard" ? "2px" : "1px"} borderColor={delivery === "standard" ? "#dc355f" : "blackAlpha.200"} onClick={() => setDelivery("standard")}>
                <Box><Text fontWeight="850">Courier delivery</Text><Text fontWeight="400" color="blackAlpha.600" mt="1">2–4 business days · R95</Text></Box>
              </Button>
              <Button h="auto" minH="24" px="6" py="5" whiteSpace="normal" textAlign="left" justifyContent="flex-start" rounded="2xl" variant="outline" borderWidth={delivery === "collect" ? "2px" : "1px"} borderColor={delivery === "collect" ? "#dc355f" : "blackAlpha.200"} onClick={() => setDelivery("collect")}>
                <Box><Text fontWeight="850">Salon collection</Text><Text fontWeight="400" color="blackAlpha.600" mt="1">We’ll let you know when it’s ready · Free</Text></Box>
              </Button>
            </SimpleGrid>
            {delivery === "standard" && <><TextField label="Street address" placeholder="Street and number" /><SimpleGrid columns={{ base: 1, md: 2 }} gap="5"><TextField label="City" placeholder="Johannesburg" /><TextField label="Postal code" placeholder="2194" /></SimpleGrid></>}
          </VStack></Steps.Content>

          <Steps.Content index={2}><VStack align="stretch" gap="6">
            <Box border="2px solid" borderColor="#dc355f" rounded="2xl" p={{ base: "5", md: "6" }}><Flex justify="space-between" gap="4"><Box><Text fontWeight="850">Secure card payment</Text><Text color="blackAlpha.600" mt="1">Visa, Mastercard and supported debit cards</Text></Box><Text fontSize="xl">••••</Text></Flex></Box>
            <TextField label="Name on card" placeholder="Name exactly as shown" /><TextField label="Card number" placeholder="0000 0000 0000 0000" />
            <SimpleGrid columns={2} gap="5"><TextField label="Expiry" placeholder="MM / YY" /><TextField label="CVV" placeholder="123" /></SimpleGrid>
            <Text fontSize="sm" color="blackAlpha.600" lineHeight="1.6">Payment fields are ready for your payment provider. No card data is stored by this interface.</Text>
          </VStack></Steps.Content>

          <Flex justify="space-between" gap="4" mt={{ base: "9", md: "12" }}>
            <Button minH="13" px="7" rounded="full" variant="outline" visibility={step === 0 ? "hidden" : "visible"} onClick={() => setStep((current) => Math.max(0, current - 1))}>Previous</Button>
            {step < 2 ? <Button minH="13" px="8" rounded="full" bg="#171313" color="white" ml="auto" onClick={() => setStep((current) => Math.min(2, current + 1))}>Continue</Button>
              : <Button minH="13" px="8" rounded="full" bg="#dc355f" color="white" ml="auto" onClick={() => setComplete(true)}>Pay {money(subtotal + deliveryFee)}</Button>}
          </Flex>
        </Steps.Root>
      </Box>

      <Box bg="#171313" color="white" rounded={{ base: "2xl", md: "3xl" }} p={{ base: "6", md: "8" }} position={{ xl: "sticky" }} top={{ xl: "6" }} overflow="hidden" minW="0">
        <Text fontWeight="900" fontSize="lg" mb="6">Order summary</Text>
        <HStack align="start" gap="5" minW="0"><Box boxSize="28" rounded="2xl" overflow="hidden" flexShrink="0"><Image src={product.images[0].src} alt={product.images[0].alt} w="100%" h="100%" objectFit="cover" /></Box>
          <VStack align="stretch" gap="1" minW="0"><Text fontWeight="850" lineHeight="1.4">{product.name}</Text>{Object.entries(line.selections).map(([name, value]) => <Text key={name} color="whiteAlpha.600" fontSize="sm" lineHeight="1.45">{name}: {value}</Text>)}<Text color="whiteAlpha.600" fontSize="sm">Quantity: {line.quantity}</Text></VStack>
        </HStack>
        <Separator borderColor="whiteAlpha.200" my="7" />
        <VStack align="stretch" gap="4"><Flex justify="space-between" gap="4"><Text color="whiteAlpha.700">Subtotal</Text><Text whiteSpace="nowrap">{money(subtotal)}</Text></Flex><Flex justify="space-between" gap="4"><Text color="whiteAlpha.700">Delivery</Text><Text whiteSpace="nowrap">{deliveryFee ? money(deliveryFee) : "Free"}</Text></Flex></VStack>
        <Separator borderColor="whiteAlpha.200" my="7" />
        <Flex justify="space-between" align="baseline" gap="4"><Text fontWeight="850">Total</Text><Text fontFamily="var(--kh-font-heading)" fontSize="3xl" lineHeight="1.3" pb="1" whiteSpace="nowrap">{money(subtotal + deliveryFee)}</Text></Flex>
      </Box>
    </Grid>

    <Dialog.Root open={complete} onOpenChange={(details) => setComplete(details.open)} placement="center"><Portal><Dialog.Backdrop bg="blackAlpha.700" backdropFilter="blur(10px)" /><Dialog.Positioner p="5"><Dialog.Content maxW="560px" rounded="3xl" p={{ base: "7", md: "10" }} textAlign="center"><Dialog.CloseTrigger asChild><CloseButton position="absolute" top="5" right="5" rounded="full" /></Dialog.CloseTrigger><Dialog.Body><VStack gap="6"><Box display="grid" placeItems="center" boxSize="16" rounded="full" bg="#dc355f" color="white" fontSize="2xl">✓</Box><Heading fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize="4xl" lineHeight="1.1" pb="1">Order received.</Heading><Text color="blackAlpha.700" lineHeight="1.7">Thank you. Your confirmation and next steps will be sent to the email address provided.</Text><Button asChild minH="13" px="8" rounded="full" bg="#171313" color="white"><Link href="/shop">Continue shopping</Link></Button></VStack></Dialog.Body></Dialog.Content></Dialog.Positioner></Portal></Dialog.Root>
  </Box>
}
