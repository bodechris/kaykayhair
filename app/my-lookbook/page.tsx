"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Badge, Box, Button, Flex, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import PageMenuPlaceholder from "@/components/PageMenuPlaceholder";
import { emptyLookbookState, LOOKBOOK_STORAGE_KEY, lookbookLooks, type SavedLookbookState } from "@/lib/lookbook";
import { emptyTransformationState, TRANSFORMATION_STORAGE_KEY, transformations, type SavedTransformationState } from "@/lib/transformations";

export default function MyLookbookPage() {
  const [state, setState] = useState<SavedLookbookState>(emptyLookbookState);
  const [transformationState, setTransformationState] = useState<SavedTransformationState>(emptyTransformationState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LOOKBOOK_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<SavedLookbookState>;
        setState({ loved: Array.isArray(parsed.loved) ? parsed.loved : [], saved: Array.isArray(parsed.saved) ? parsed.saved : [] });
      }
      const transformationRaw = window.localStorage.getItem(TRANSFORMATION_STORAGE_KEY);
      if (transformationRaw) {
        const parsed = JSON.parse(transformationRaw) as Partial<SavedTransformationState>;
        setTransformationState({ loved: Array.isArray(parsed.loved) ? parsed.loved : [], saved: Array.isArray(parsed.saved) ? parsed.saved : [] });
      }
    } finally {
      setReady(true);
    }
  }, []);

  const savedLooks = useMemo(() => lookbookLooks.filter((look) => state.saved.includes(look.id)), [state.saved]);
  const savedTransformations = useMemo(() => transformations.filter((item) => transformationState.saved.includes(item.id)), [transformationState.saved]);

  const remove = (id: string) => {
    const next = { ...state, saved: state.saved.filter((item) => item !== id) };
    setState(next);
    window.localStorage.setItem(LOOKBOOK_STORAGE_KEY, JSON.stringify(next));
  };

  const removeTransformation = (id: string) => {
    const next = { ...transformationState, saved: transformationState.saved.filter((item) => item !== id) };
    setTransformationState(next);
    window.localStorage.setItem(TRANSFORMATION_STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <PageMenuPlaceholder title="My Lookbook" width="94%">
      <Box as="main" bg="white" minH="80vh" px={{ base: "5", md: "10", xl: "14" }} py={{ base: "12", md: "18" }}>
        <Flex direction={{ base: "column", lg: "row" }} justify="space-between" align={{ lg: "end" }} gap="8" mb={{ base: "10", md: "14" }}>
          <Box>
            <Text fontSize="xs" fontWeight="900" color="var(--kh-color-primary)" letterSpacing=".15em" textTransform="uppercase">Your saved inspiration</Text>
            <Heading mt="3" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "5xl", md: "7xl" }} lineHeight=".9" letterSpacing="-.06em">My Lookbook.</Heading>
          </Box>
          <VStack align={{ base: "start", lg: "end" }} gap="3" maxW="500px">
            <Text color="blackAlpha.700" lineHeight="1.7">Your current shortlist is stored on this device. When we add customer accounts, this becomes your synced personal collection.</Text>
            <Button asChild minH="12" px="6" rounded="full" variant="outline"><Link href="/lookbook">← Keep exploring</Link></Button>
          </VStack>
        </Flex>

        {!ready ? null : savedLooks.length === 0 && savedTransformations.length === 0 ? (
          <Box py={{ base: "20", md: "28" }} textAlign="center" bg="blackAlpha.50" rounded="36px">
            <Text fontSize="4xl">♡</Text>
            <Heading mt="4" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "3xl", md: "5xl" }}>Nothing saved yet.</Heading>
            <Text mt="3" color="blackAlpha.600">Save looks you would genuinely consider wearing and build your shortlist.</Text>
            <Button asChild mt="7" minH="13" px="7" rounded="full" bg="#171313" color="white"><Link href="/lookbook">Explore the Lookbook</Link></Button>
          </Box>
        ) : (
          <VStack align="stretch" gap="14">
          {savedLooks.length ? <Box><Flex justify="space-between" align="end" mb="6"><Box><Text fontSize="xs" fontWeight="900" color="var(--kh-color-primary)" letterSpacing=".12em" textTransform="uppercase">Saved looks</Text><Heading mt="2" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "3xl", md: "5xl" }}>Style inspiration</Heading></Box><Button asChild rounded="full" variant="ghost"><Link href="/lookbook">Explore more →</Link></Button></Flex><SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={{ base: "6", md: "8" }}>
            {savedLooks.map((look) => (
              <Box key={look.id} border="1px solid" borderColor="blackAlpha.100" rounded="30px" overflow="hidden" boxShadow="var(--kh-shadow-soft)">
                <Box aspectRatio="4 / 5" overflow="hidden" position="relative">
                  <Image src={look.image} alt={look.alt} w="100%" h="100%" objectFit="cover" />
                  {look.trend ? <Badge position="absolute" top="4" left="4" px="3" py="2" rounded="full" bg="whiteAlpha.900">{look.trend}</Badge> : null}
                </Box>
                <VStack align="stretch" gap="4" p="6">
                  <Text fontSize="xs" fontWeight="900" color="var(--kh-color-primary)" textTransform="uppercase" letterSpacing=".12em">{look.category}</Text>
                  <Heading fontFamily="var(--kh-font-heading)" fontWeight="500" fontSize="3xl" letterSpacing="-.04em">{look.title}</Heading>
                  <Text color="blackAlpha.700" fontSize="sm" lineHeight="1.7">{look.description}</Text>
                  <Button asChild minH="12" px="6" rounded="full" bg="#171313" color="white" _hover={{ bg: "var(--kh-color-primary)" }}><Link href={`/services?service=${look.service.slug}&variant=${look.service.variant ?? ""}&look=${look.id}`}>Request this look →</Link></Button>
                  <Button minH="11" px="5" rounded="full" variant="ghost" color="var(--kh-color-primary)" onClick={() => remove(look.id)}>Remove from My Lookbook</Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid></Box> : null}
          {savedTransformations.length ? <Box><Flex justify="space-between" align="end" mb="6"><Box><Text fontSize="xs" fontWeight="900" color="var(--kh-color-primary)" letterSpacing=".12em" textTransform="uppercase">Saved transformations</Text><Heading mt="2" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "3xl", md: "5xl" }}>Before & after shortlist</Heading></Box><Button asChild rounded="full" variant="ghost"><Link href="/befores-and-afters">Explore more →</Link></Button></Flex><SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={{ base: "6", md: "8" }}>{savedTransformations.map((item) => (<Box key={item.id} border="1px solid" borderColor="blackAlpha.100" rounded="30px" overflow="hidden" boxShadow="var(--kh-shadow-soft)"><SimpleGrid columns={2} aspectRatio="1/.82"><Box position="relative"><Image src={item.beforeImage} alt={`${item.title} before`} w="100%" h="100%" objectFit="cover" /><Badge position="absolute" left="3" bottom="3" rounded="full" bg="white" px="3" py="1.5">Before</Badge></Box><Box position="relative"><Image src={item.afterImage} alt={`${item.title} after`} w="100%" h="100%" objectFit="cover" /><Badge position="absolute" right="3" bottom="3" rounded="full" bg="var(--kh-color-primary)" color="white" px="3" py="1.5">After</Badge></Box></SimpleGrid><VStack align="stretch" gap="4" p="6"><Text fontSize="xs" fontWeight="900" color="var(--kh-color-primary)" textTransform="uppercase" letterSpacing=".12em">{item.category}</Text><Heading fontFamily="var(--kh-font-heading)" fontWeight="500" fontSize="3xl" letterSpacing="-.04em">{item.title}</Heading><Text color="blackAlpha.700" fontSize="sm" lineHeight="1.7">{item.story}</Text><Button asChild minH="12" px="6" rounded="full" bg="#171313" color="white" _hover={{ bg: "var(--kh-color-primary)" }}><Link href={`/services?service=${item.service.slug}&variant=${item.service.variant ?? ""}&transformation=${item.id}`}>{item.service.label} →</Link></Button><Button minH="11" px="5" rounded="full" variant="ghost" color="var(--kh-color-primary)" onClick={() => removeTransformation(item.id)}>Remove from My Lookbook</Button></VStack></Box>))}</SimpleGrid></Box> : null}
          </VStack>
        )}
      </Box>
    </PageMenuPlaceholder>
  );
}
