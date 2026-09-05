"use client"

import { useMemo, useState } from "react"
import { Box, Button, Flex, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import PageMenuPlaceholder from "@/components/PageMenuPlaceholder"
import { ProductCard } from "./_components/shop-ui"
import { products } from "./products"

const categories = ["All", "Wigs", "Hair Care", "Bundles"] as const

export default function ShopPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All")
  const visible = useMemo(() => category === "All" ? products : products.filter((product) => product.category === category), [category])

  return <PageMenuPlaceholder title="Shop" width="90%">
    <Box as="main" bg="white" color="#171313" px={{ base: "5", sm: "7", md: "10", xl: "14" }} py={{ base: "10", md: "16" }}>
      <Flex align={{ base: "start", lg: "end" }} justify="space-between" direction={{ base: "column", lg: "row" }} gap="8" mb={{ base: "10", md: "16" }}>
        <VStack align="start" gap="4" maxW="900px">
          <Text textTransform="uppercase" letterSpacing=".16em" fontSize="sm" fontWeight="900" color="#dc355f">Kaykay Hair Shop</Text>
          <Heading as="h1" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "5xl", md: "7xl", xl: "8xl" }} lineHeight=".92" letterSpacing="-.06em">Confidence, delivered.</Heading>
        </VStack>
        <Text maxW="440px" fontSize={{ base: "md", md: "lg" }} color="blackAlpha.700" lineHeight="1.7">Choose your essentials, customise eligible products, and see your exact price before adding to your bag.</Text>
      </Flex>

      <Flex position="sticky" top="3" zIndex="10" width="fit-content" maxW="100%" overflowX="auto" gap="2" p="1.5" mb="8" bg="whiteAlpha.800" backdropFilter="blur(18px)" border="1px solid" borderColor="blackAlpha.100" rounded="full" shadow="sm" aria-label="Filter products">
        {categories.map((item) => <Button key={item} minH="11" px="5" rounded="full" flexShrink="0" variant={category === item ? "solid" : "ghost"} bg={category === item ? "#171313" : "transparent"} color={category === item ? "white" : "#171313"} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</Button>)}
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={{ base: "5", md: "7" }}>
        {visible.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
      </SimpleGrid>
    </Box>
  </PageMenuPlaceholder>
}
