"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge, Box, Button, CloseButton, Dialog, Drawer, Flex, Grid, Heading, HStack, IconButton, Image, Portal, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { discountedPrice, money, type ShopProduct } from "../products"

export function Price({ product, finalPrice }: { product: ShopProduct; finalPrice?: number }) {
  const current = finalPrice ?? discountedPrice(product)
  return <HStack gap="2.5" align="baseline" wrap="wrap" minW="0" overflow="visible">
    {product.discount?.enabled && finalPrice == null && <Text as="s" color="blackAlpha.500" fontSize="sm">{money(product.basePrice)}</Text>}
    <Text fontWeight="800" fontSize="lg" lineHeight="1.45" whiteSpace="nowrap" flexShrink="0" pb="0.5">{money(current)}</Text>
    {product.discount?.enabled && finalPrice == null && <Badge bg="#dc355f" color="white" rounded="full" px="2.5" py="1">Save {product.discount.percentage}%</Badge>}
  </HStack>
}

export function ProductImage({ image, eager = false }: { image: ShopProduct["images"][number]; eager?: boolean }) {
  return <Image src={image.src} alt={image.alt} width="100%" height="100%" objectFit="cover" loading={eager ? "eager" : "lazy"} />
}

export function ProductCard({ product, index }: { product: ShopProduct; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)
  const [quickOpen, setQuickOpen] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); observer.disconnect() }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <>
    <Box ref={ref} bg="white" border="1px solid" borderColor="blackAlpha.100" rounded={{ base: "2xl", md: "3xl" }} overflow="hidden"
      opacity={shown ? 1 : 0} translate={shown ? "0 0" : "0 28px"}
      transition={`opacity .65s ease ${index * 45}ms, translate .65s cubic-bezier(.16,1,.3,1) ${index * 45}ms, box-shadow .35s ease, transform .35s ease`}
      _hover={{ transform: "translateY(-6px)", shadow: "0 26px 70px rgba(20,15,12,.10)" }}>
      <Box aspectRatio="4/5" position="relative" overflow="hidden">
        <ProductImage image={product.images[0]} />
        {product.tag && <Badge position="absolute" top="4" left="4" rounded="full" bg="whiteAlpha.800" backdropFilter="blur(12px)" px="3" py="1.5">{product.tag}</Badge>}
      </Box>
      <VStack align="stretch" gap="3" p={{ base: "5", md: "6" }}>
        <Text textTransform="uppercase" letterSpacing=".14em" fontWeight="800" fontSize="xs" color="blackAlpha.500">{product.category}</Text>
        <Heading as="h2" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-.04em">{product.name}</Heading>
        <Text color="blackAlpha.700" lineHeight="1.65">{product.description}</Text>
        <Price product={product} />
        <Grid templateColumns="1fr auto" gap="3" pt="3">
          <Button asChild minH="13" px="7" rounded="full" bg="#171313" color="white" _hover={{ bg: "#4d3f2e" }}><Link href={`/shop/${product.id}`}>View product <Box as="span" aria-hidden>↗</Box></Link></Button>
          <IconButton aria-label={`Quick view ${product.name}`} minW="13" minH="13" rounded="full" variant="outline" onClick={() => setQuickOpen(true)}>+</IconButton>
        </Grid>
      </VStack>
    </Box>

    <Dialog.Root open={quickOpen} onOpenChange={(details) => setQuickOpen(details.open)} size="lg" placement="center">
      <Portal><Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(10px)" /><Dialog.Positioner p={{ base: "4", md: "8" }}>
        <Dialog.Content rounded={{ base: "2xl", md: "3xl" }} overflow="hidden" maxW="920px" shadow="0 40px 120px rgba(0,0,0,.2)"><Dialog.Header px={{ base: "6", md: "9" }} pt={{ base: "6", md: "8" }} pb="5"><Dialog.Title fontFamily="var(--kh-font-heading)" fontSize={{ base: "2xl", md: "3xl" }} lineHeight="1.2" pb="1">{product.name}</Dialog.Title></Dialog.Header>
          <Dialog.CloseTrigger asChild><CloseButton size="sm" position="absolute" top="5" right="5" rounded="full" /></Dialog.CloseTrigger>
          <Dialog.Body px={{ base: "6", md: "9" }} pb={{ base: "6", md: "9" }}><SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: "6", md: "9" }}>
            <Box aspectRatio="4/5" rounded="2xl" overflow="hidden"><ProductImage image={product.images[0]} eager /></Box>
            <VStack align="stretch" justify="center" gap="4"><Price product={product} /><Text color="blackAlpha.700">{product.description}</Text>
              <Button asChild minH="13" px="7" rounded="full" bg="#171313" color="white"><Link href={`/shop/${product.id}`}>Choose options</Link></Button>
            </VStack>
          </SimpleGrid></Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner></Portal>
    </Dialog.Root>
  </>
}

export function ProductConfigurator({ product }: { product: ShopProduct }) {
  const router = useRouter()
  const defaults = Object.fromEntries((product.options ?? []).map((option) => [option.name, option.values[0]?.label ?? ""]))
  const [selected, setSelected] = useState<Record<string, string>>(defaults)
  const [quantity, setQuantity] = useState(1)
  const [cartOpen, setCartOpen] = useState(false)
  const unitPrice = useMemo(() => {
    let total = discountedPrice(product)
    for (const option of product.options ?? []) total += option.values.find((value) => value.label === selected[option.name])?.priceAdjustment ?? 0
    return total
  }, [product, selected])

  const continueToCheckout = () => {
    window.localStorage.setItem("kaykay-checkout", JSON.stringify({ productId: product.id, quantity, selections: selected, unitPrice }))
    setCartOpen(false)
    router.push("/checkout")
  }

  return <VStack align="stretch" gap="6">
    <Box><Text color="blackAlpha.500" fontSize="sm" mb="1">Your price</Text><Price product={product} finalPrice={unitPrice} />
      {product.discount?.enabled && <Text color="#b02751" fontSize="sm" mt="1">Discount applied before selected upgrades.</Text>}
    </Box>
    {(product.options ?? []).map((option) => <Box key={option.name}>
      <Flex justify="space-between" mb="2"><Text fontWeight="750">{option.name}</Text><Text color="blackAlpha.500" fontSize="sm">{option.required ? "Required" : "Optional"}</Text></Flex>
      <Flex gap="2.5" wrap="wrap">{option.values.map((value) => {
        const active = selected[option.name] === value.label
        return <Button key={value.label} variant={active ? "solid" : "outline"} minH="11" h="auto" px="5" py="2.5" lineHeight="1.35" whiteSpace="normal" textAlign="left" rounded="full" bg={active ? "#171313" : "white"} color={active ? "white" : "#171313"}
          onClick={() => setSelected((current) => ({ ...current, [option.name]: value.label }))}>
          {value.swatch && <Box boxSize="3" rounded="full" bg={value.swatch} border="1px solid" borderColor="blackAlpha.200" />}{value.label}{value.priceAdjustment ? ` +${money(value.priceAdjustment)}` : ""}
        </Button>
      })}</Flex>
    </Box>)}
    <Box><Text fontWeight="750" mb="2">Quantity <Text as="span" color="blackAlpha.500" fontSize="sm">· Required</Text></Text>
      <HStack gap="3"><IconButton aria-label="Reduce quantity" minW="12" minH="12" variant="outline" rounded="full" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</IconButton>
        <Text minW="10" textAlign="center" fontWeight="800" aria-live="polite">{quantity}</Text>
        <IconButton aria-label="Increase quantity" minW="12" minH="12" variant="outline" rounded="full" onClick={() => setQuantity((q) => q + 1)}>+</IconButton></HStack>
    </Box>
    <Button size="lg" minH="15" px={{ base: "6", md: "9" }} rounded="full" bg="#dc355f" color="white" _hover={{ bg: "#bd244b" }} onClick={() => setCartOpen(true)}>Add to bag · {money(unitPrice * quantity)}</Button>

    <Drawer.Root open={cartOpen} onOpenChange={(details) => setCartOpen(details.open)} placement="end" size="md"><Portal>
      <Drawer.Backdrop bg="blackAlpha.600" backdropFilter="blur(10px)" /><Drawer.Positioner><Drawer.Content w={{ base: "100%", sm: "min(500px, 100vw)" }} maxW="100vw" overflow="hidden" boxSizing="border-box">
        <Drawer.Header borderBottomWidth="1px" px={{ base: "5", md: "8" }} py="6"><Drawer.Title fontFamily="var(--kh-font-heading)" fontSize="2xl" lineHeight="1.3" pb="1">Your bag</Drawer.Title></Drawer.Header><Drawer.CloseTrigger asChild><CloseButton size="sm" position="absolute" top="5" right="5" rounded="full" /></Drawer.CloseTrigger>
        <Drawer.Body px={{ base: "5", md: "8" }} py="7" minW="0"><HStack align="start" gap="5" minW="0"><Box boxSize={{ base: "24", md: "28" }} rounded="xl" overflow="hidden" flexShrink="0"><ProductImage image={product.images[0]} /></Box>
          <VStack align="stretch" gap="1"><Text fontWeight="800">{product.name}</Text>{Object.entries(selected).map(([name, value]) => <Text key={name} color="blackAlpha.600" fontSize="sm">{name}: {value}</Text>)}
            <Text color="blackAlpha.600" fontSize="sm">Quantity: {quantity}</Text><Text fontWeight="800" mt="2">{money(unitPrice * quantity)}</Text></VStack>
        </HStack></Drawer.Body>
        <Drawer.Footer borderTopWidth="1px" px={{ base: "5", md: "8" }} py="6" flexDirection="column" alignItems="stretch" gap="4" minW="0"><Flex justify="space-between" align="baseline" gap="4" minW="0"><Text flexShrink="0">Subtotal</Text><Text fontWeight="900" lineHeight="1.45" whiteSpace="nowrap" minW="0">{money(unitPrice * quantity)}</Text></Flex>
          <Button minH="13" px="7" rounded="full" bg="#171313" color="white" onClick={continueToCheckout}>Continue to checkout</Button><Drawer.ActionTrigger asChild><Button minH="12" px="7" variant="ghost" rounded="full">Continue shopping</Button></Drawer.ActionTrigger>
        </Drawer.Footer>
      </Drawer.Content></Drawer.Positioner>
    </Portal></Drawer.Root>
  </VStack>
}

export function ProductGallery({ product }: { product: ShopProduct }) {
  const [active, setActive] = useState(0)
  return <Grid templateColumns={{ base: "1fr", md: "88px 1fr" }} gap="3">
    <Flex direction={{ base: "row", md: "column" }} gap="3" order={{ base: 2, md: 1 }} overflowX="auto">
      {product.images.map((image, index) => <Button key={image.src} p="0" minW={{ base: "72px", md: "88px" }} h={{ base: "88px", md: "108px" }} overflow="hidden" rounded="xl" variant="outline"
        borderWidth={active === index ? "2px" : "1px"} borderColor={active === index ? "#dc355f" : "blackAlpha.200"} onClick={() => setActive(index)} aria-label={`Show image ${index + 1} of ${product.name}`}>
        <ProductImage image={image} />
      </Button>)}
    </Flex>
    <Box order={{ base: 1, md: 2 }} aspectRatio="4/5" overflow="hidden" rounded={{ base: "2xl", md: "3xl" }} bg="gray.50"><ProductImage image={product.images[active]} eager /></Box>
  </Grid>
}
