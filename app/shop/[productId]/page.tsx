import { notFound } from "next/navigation"
import Link from "next/link"
import { Box, Button, Grid, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import PageMenuPlaceholder from "@/components/PageMenuPlaceholder"
import { ProductConfigurator, ProductGallery } from "../_components/shop-ui"
import { getProduct, products } from "../products"

export function generateStaticParams() {
  return products.map((product) => ({ productId: product.id }))
}

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params
  const product = getProduct(productId)
  if (!product) notFound()

  return <PageMenuPlaceholder title={product.name} width="94%">
    <Box as="main" bg="white" color="#171313" px={{ base: "5", sm: "7", md: "10", xl: "14" }} py={{ base: "7", md: "12" }} overflow="visible">
      <Button asChild variant="ghost" minH="11" px="5" rounded="full" mb="8"><Link href="/shop">← Back to shop</Link></Button>
      <Grid templateColumns={{ base: "1fr", lg: "minmax(0,1.15fr) minmax(360px,.85fr)" }} gap={{ base: "10", lg: "16" }} alignItems="start">
        <ProductGallery product={product} />
        <VStack align="stretch" gap="7" position={{ lg: "sticky" }} top={{ lg: "6" }}>
          <Box>
            <Text textTransform="uppercase" letterSpacing=".14em" fontWeight="900" fontSize="xs" color="#dc355f" mb="3">{product.category}{product.tag ? ` · ${product.tag}` : ""}</Text>
            <Heading as="h1" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "4xl", md: "6xl" }} lineHeight="1.04" letterSpacing="-.055em" pb="0.14em" overflow="visible">{product.name}</Heading>
            <Text mt="5" color="blackAlpha.700" fontSize="lg" lineHeight="1.7">{product.details}</Text>
          </Box>
          <ProductConfigurator product={product} />
          <Box borderTop="1px solid" borderColor="blackAlpha.200" pt="6">
            <Text fontWeight="850" mb="3">Why you’ll love it</Text>
            <SimpleGrid columns={{ base: 1, sm: 3 }} gap="3">
              {product.features.map((feature) => <HStack key={feature} align="start"><Text color="#dc355f">●</Text><Text fontSize="sm">{feature}</Text></HStack>)}
            </SimpleGrid>
          </Box>
        </VStack>
      </Grid>
    </Box>
  </PageMenuPlaceholder>
}
