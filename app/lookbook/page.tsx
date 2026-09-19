"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import PageMenuPlaceholder from "@/components/PageMenuPlaceholder";
import { toaster } from "@/components/ui/toaster";
import {
  emptyLookbookState,
  LOOKBOOK_STORAGE_KEY,
  lookbookCategories,
  lookbookLooks,
  type LookbookCategory,
  type LookbookLook,
  type SavedLookbookState,
} from "@/lib/lookbook";

function readSavedState(): SavedLookbookState {
  if (typeof window === "undefined") return emptyLookbookState;
  try {
    const raw = window.localStorage.getItem(LOOKBOOK_STORAGE_KEY);
    if (!raw) return emptyLookbookState;
    const parsed = JSON.parse(raw) as Partial<SavedLookbookState>;
    return {
      loved: Array.isArray(parsed.loved) ? parsed.loved : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
    };
  } catch {
    return emptyLookbookState;
  }
}

function LookCard({
  look,
  index,
  state,
  onLove,
  onSave,
  onOpen,
}: {
  look: LookbookLook;
  index: number;
  state: SavedLookbookState;
  onLove: (look: LookbookLook) => void;
  onSave: (look: LookbookLook) => void;
  onOpen: (look: LookbookLook) => void;
}) {
  const loved = state.loved.includes(look.id);
  const saved = state.saved.includes(look.id);

  return (
    <Box
      as="article"
      position="relative"
      overflow="hidden"
      rounded={{ base: "24px", md: "30px" }}
      bg="white"
      border="1px solid"
      borderColor="blackAlpha.100"
      boxShadow="0 18px 45px rgba(0,0,0,.06)"
      transition="transform .3s ease, box-shadow .3s ease"
      _hover={{ transform: "translateY(-5px)", boxShadow: "0 28px 70px rgba(0,0,0,.10)" }}
    >
      <Box position="relative" aspectRatio={index % 5 === 0 ? "4 / 5" : index % 3 === 0 ? "1 / 1" : "4 / 5"} overflow="hidden" bg="#eee">
        <Image src={look.image} alt={look.alt} w="100%" h="100%" objectFit="cover" transition="transform .7s cubic-bezier(.16,1,.3,1)" _groupHover={{ transform: "scale(1.04)" }} />
        <Box position="absolute" inset="0" bg="linear-gradient(180deg, rgba(0,0,0,0) 52%, rgba(0,0,0,.48) 100%)" />

        <HStack position="absolute" top="4" left="4" right="4" justify="space-between" align="start">
          {look.trend ? (
            <Badge px="3.5" py="2" rounded="full" bg="whiteAlpha.900" color="#171313" fontWeight="800" fontSize="11px" letterSpacing=".04em">
              {look.trend}
            </Badge>
          ) : <span />}
          <HStack gap="2">
            <IconButton
              aria-label={loved ? `Unlike ${look.title}` : `Love ${look.title}`}
              title={loved ? "Loved" : "Love this look"}
              rounded="full"
              bg="whiteAlpha.900"
              color={loved ? "var(--kh-color-primary)" : "#171313"}
              minW="44px"
              h="44px"
              _hover={{ bg: "white" }}
              onClick={(event) => { event.stopPropagation(); onLove(look); }}
            >
              <Text as="span" fontSize="20px" lineHeight="1">{loved ? "♥" : "♡"}</Text>
            </IconButton>
            <IconButton
              aria-label={saved ? `Remove ${look.title} from My Lookbook` : `Save ${look.title} to My Lookbook`}
              title={saved ? "Saved to My Lookbook" : "Save to My Lookbook"}
              rounded="full"
              bg={saved ? "var(--kh-color-primary)" : "whiteAlpha.900"}
              color={saved ? "white" : "#171313"}
              minW="44px"
              h="44px"
              _hover={{ bg: saved ? "var(--kh-color-pink-600)" : "white" }}
              onClick={(event) => { event.stopPropagation(); onSave(look); }}
            >
              <Text as="span" fontSize="17px" lineHeight="1">{saved ? "✓" : "+"}</Text>
            </IconButton>
          </HStack>
        </HStack>

        <Box position="absolute" left="5" right="5" bottom="5" color="white">
          <Text fontSize="xs" fontWeight="800" letterSpacing=".12em" textTransform="uppercase" opacity=".84">{look.category}</Text>
          <Heading mt="1" fontFamily="var(--kh-font-heading)" fontWeight="500" fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-.035em">{look.title}</Heading>
        </Box>
      </Box>

      <VStack align="stretch" gap="5" p={{ base: "5", md: "6" }}>
        <Text color="blackAlpha.700" lineHeight="1.7" fontSize="sm">{look.description}</Text>
        <Flex gap="2" wrap="wrap">
          {look.tags.map((tag) => <Badge key={tag} px="3" py="1.5" rounded="full" bg="blackAlpha.50" color="#171313" fontWeight="700">{tag}</Badge>)}
        </Flex>
        <Button minH="12" px="6" rounded="full" bg="#171313" color="white" _hover={{ bg: "var(--kh-color-primary)" }} onClick={() => onOpen(look)}>
          Explore this look →
        </Button>
      </VStack>
    </Box>
  );
}

export default function LookbookPage() {
  const [category, setCategory] = useState<LookbookCategory>("All");
  const [savedState, setSavedState] = useState<SavedLookbookState>(emptyLookbookState);
  const [activeLook, setActiveLook] = useState<LookbookLook | null>(null);

  useEffect(() => setSavedState(readSavedState()), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LOOKBOOK_STORAGE_KEY, JSON.stringify(savedState));
  }, [savedState]);

  useEffect(() => {
    if (!activeLook) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && setActiveLook(null);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prior;
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeLook]);

  const visibleLooks = useMemo(() => category === "All" ? lookbookLooks : lookbookLooks.filter((look) => look.category === category), [category]);
  const trending = lookbookLooks.filter((look) => look.trend === "Trending" || look.trend === "Most loved").slice(0, 4);

  const updateState = (type: "loved" | "saved", look: LookbookLook) => {
    setSavedState((current) => {
      const exists = current[type].includes(look.id);
      return { ...current, [type]: exists ? current[type].filter((id) => id !== look.id) : [...current[type], look.id] };
    });
  };

  const toggleLove = (look: LookbookLook) => {
    const isLoved = savedState.loved.includes(look.id);
    updateState("loved", look);
    toaster.create({
      title: isLoved ? "Removed from loved looks" : "You love this look",
      description: isLoved ? undefined : "We’ll use this signal later to make your Lookbook feel more personal.",
      type: "info",
      duration: 2200,
    });
  };

  const toggleSave = (look: LookbookLook) => {
    const isSaved = savedState.saved.includes(look.id);
    updateState("saved", look);
    toaster.create({
      title: isSaved ? "Removed from My Lookbook" : "Saved to My Lookbook",
      description: isSaved ? undefined : "Keep building your shortlist and come back when you’re ready to book.",
      type: "info",
      duration: 2600,
    });
  };

  return (
    <PageMenuPlaceholder title="Lookbook" width="94%">
      <Box as="main" bg="#fff" color="#171313" overflow="hidden">
        <Box as="section" px={{ base: "5", md: "10", xl: "14" }} pt={{ base: "12", md: "20" }} pb={{ base: "12", md: "18" }}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "10", lg: "16" }} alignItems="end">
            <VStack align="start" gap="6" maxW="900px">
              <Text textTransform="uppercase" letterSpacing=".18em" fontSize="sm" fontWeight="900" color="var(--kh-color-primary)">Kaykay Hair Lookbook</Text>
              <Heading as="h1" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "5xl", md: "7xl", xl: "8xl" }} lineHeight=".9" letterSpacing="-.065em">
                Find the hair you’ll want next.
              </Heading>
              <Text maxW="720px" fontSize={{ base: "md", md: "xl" }} lineHeight="1.7" color="blackAlpha.700">
                Explore what’s trending, what clients keep loving, and what Kaykay is excited about right now. Save ideas as you browse, then turn the one you love into an appointment.
              </Text>
              <HStack gap="3" flexWrap="wrap">
                <Button asChild minH="13" px="7" rounded="full" bg="#171313" color="white" _hover={{ bg: "var(--kh-color-primary)" }}><Link href="#explore">Explore looks</Link></Button>
                <Button asChild minH="13" px="7" rounded="full" variant="outline" borderColor="blackAlpha.200"><Link href="/my-lookbook">My Lookbook · {savedState.saved.length}</Link></Button>
              </HStack>
            </VStack>

            <Box position="relative" minH={{ base: "420px", md: "560px" }}>
              <Box position="absolute" inset={{ base: "0 8% 8% 0", md: "0 14% 8% 0" }} overflow="hidden" rounded={{ base: "34px", md: "54px" }} bg="#eee">
                <Image src="/images/services/braiding/braids-3.webp" alt="Featured Kaykay Hair braid look" w="100%" h="100%" objectFit="cover" />
              </Box>
              <Box position="absolute" right="0" bottom="0" w={{ base: "42%", md: "38%" }} aspectRatio=".82" overflow="hidden" rounded={{ base: "26px", md: "38px" }} border="8px solid white" boxShadow="var(--kh-shadow-editorial)">
                <Image src="/images/services/wig-installation/wig-installation-6.webp" alt="Featured Kaykay Hair wig look" w="100%" h="100%" objectFit="cover" />
              </Box>
              <Badge position="absolute" top="5" left="5" px="4" py="2.5" rounded="full" bg="white" color="var(--kh-color-primary)" fontWeight="900" boxShadow="var(--kh-shadow-soft)">TRENDING NOW</Badge>
            </Box>
          </SimpleGrid>
        </Box>

        <Box as="section" bg="var(--kh-color-black)" color="white" px={{ base: "5", md: "10", xl: "14" }} py={{ base: "10", md: "14" }}>
          <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap="8" align={{ md: "end" }} mb="8">
            <Box>
              <Text color="var(--kh-color-pink-300)" fontSize="xs" fontWeight="900" letterSpacing=".15em" textTransform="uppercase">Popular right now</Text>
              <Heading mt="2" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-.045em">Looks worth screenshotting.</Heading>
            </Box>
            <Text maxW="430px" color="whiteAlpha.700" lineHeight="1.7">A quick pulse of styles clients are saving, requesting and wearing now.</Text>
          </Flex>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: "3", md: "5" }}>
            {trending.map((look) => (
              <Box key={look.id} as="button" textAlign="left" onClick={() => setActiveLook(look)} overflow="hidden" rounded={{ base: "20px", md: "28px" }} position="relative" aspectRatio=".78" bg="whiteAlpha.100">
                <Image src={look.image} alt={look.alt} w="100%" h="100%" objectFit="cover" />
                <Box position="absolute" inset="0" bg="linear-gradient(180deg, transparent 45%, rgba(0,0,0,.7))" />
                <Box position="absolute" left="4" right="4" bottom="4"><Text fontWeight="800">{look.shortTitle}</Text><Text mt="1" fontSize="xs" color="whiteAlpha.700">{look.trend}</Text></Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Box id="explore" as="section" px={{ base: "5", md: "10", xl: "14" }} py={{ base: "14", md: "20" }}>
          <Flex direction={{ base: "column", lg: "row" }} justify="space-between" align={{ lg: "end" }} gap="7" mb="9">
            <Box>
              <Text fontSize="xs" fontWeight="900" letterSpacing=".15em" textTransform="uppercase" color="var(--kh-color-primary)">Explore by style</Text>
              <Heading mt="2" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-.055em">Build your shortlist.</Heading>
            </Box>
            <HStack maxW="100%" overflowX="auto" gap="2" p="1.5" bg="blackAlpha.50" rounded="full">
              {lookbookCategories.map((item) => (
                <Button key={item} flexShrink="0" minH="11" px="5" rounded="full" bg={category === item ? "#171313" : "transparent"} color={category === item ? "white" : "#171313"} _hover={{ bg: category === item ? "#171313" : "white" }} onClick={() => setCategory(item)}>
                  {item}
                </Button>
              ))}
            </HStack>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={{ base: "6", md: "8" }}>
            {visibleLooks.map((look, index) => <LookCard key={look.id} look={look} index={index} state={savedState} onLove={toggleLove} onSave={toggleSave} onOpen={setActiveLook} />)}
          </SimpleGrid>
        </Box>

        <Box as="section" mx={{ base: "5", md: "10", xl: "14" }} mb={{ base: "8", md: "10" }} p={{ base: "7", md: "11" }} rounded={{ base: "30px", md: "44px" }} bg="var(--kh-bg-pink-soft)" border="1px solid" borderColor="var(--kh-color-pink-100)">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="9" alignItems="center">
            <Box><Text fontSize="xs" fontWeight="900" letterSpacing=".15em" textTransform="uppercase" color="var(--kh-color-primary)">Love staying inspired?</Text><Heading mt="3" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "4xl", md: "6xl" }} lineHeight=".94" letterSpacing="-.055em">Make great hair your monthly routine.</Heading></Box>
            <VStack align="start" gap="5"><Text color="blackAlpha.700" lineHeight="1.75">Care+ is for clients who do not want to wait for a special occasion to feel put together. Get recurring care, easier booking and better long-term value.</Text><Button asChild minH="13" px="7" rounded="full" bg="var(--kh-color-primary)" color="white" _hover={{ bg: "var(--kh-color-pink-600)" }}><Link href="/care-plus">Explore Care+ membership →</Link></Button></VStack>
          </SimpleGrid>
        </Box>

        <Box as="section" mx={{ base: "5", md: "10", xl: "14" }} mb={{ base: "8", md: "10" }} p={{ base: "7", md: "10" }} rounded={{ base: "30px", md: "44px" }} bg="var(--kh-color-blue)" color="white">
          <Flex direction={{ base: "column", md: "row" }} align={{ md: "center" }} justify="space-between" gap="7">
            <Box maxW="760px">
              <Text fontSize="xs" fontWeight="900" letterSpacing=".15em" textTransform="uppercase" color="whiteAlpha.700">Fresh looks keep moving</Text>
              <Heading mt="2" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-.045em">See the newest Kaykay Hair work on Instagram.</Heading>
            </Box>
            <Button asChild minH="13" px="7" rounded="full" bg="white" color="#171313" _hover={{ bg: "var(--kh-bg-pink-soft)" }}>
              <a href="https://www.instagram.com/kaykayhairofficial/" target="_blank" rel="noreferrer">@kaykayhairofficial ↗</a>
            </Button>
          </Flex>
        </Box>

        <Box as="section" mx={{ base: "5", md: "10", xl: "14" }} mb={{ base: "14", md: "20" }} p={{ base: "7", md: "12" }} rounded={{ base: "30px", md: "44px" }} bg="var(--kh-bg-pink-soft)" border="1px solid" borderColor="var(--kh-color-pink-100)">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="9" alignItems="center">
            <Box>
              <Text fontSize="xs" fontWeight="900" letterSpacing=".15em" textTransform="uppercase" color="var(--kh-color-primary)">Your personal inspiration board</Text>
              <Heading mt="3" maxW="720px" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "4xl", md: "6xl" }} lineHeight=".95" letterSpacing="-.055em">Don’t lose the look you came back for.</Heading>
            </Box>
            <VStack align="start" gap="5">
              <Text color="blackAlpha.700" lineHeight="1.75">Save looks into My Lookbook as you browse. For now they stay safely on this device; when the customer account is connected, we’ll sync them to the member profile so the collection follows the client.</Text>
              <Button asChild minH="13" px="7" rounded="full" bg="var(--kh-color-primary)" color="white" _hover={{ bg: "var(--kh-color-pink-600)" }}><Link href="/my-lookbook">Open My Lookbook ({savedState.saved.length}) →</Link></Button>
            </VStack>
          </SimpleGrid>
        </Box>

        {activeLook ? (
          <Box position="fixed" inset="0" zIndex="var(--kh-modal-z-index)" bg="rgba(0,0,0,.58)" backdropFilter="blur(12px)" p={{ base: "0", md: "5" }} display="flex" alignItems="center" justifyContent="center" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveLook(null); }}>
            <Box w="min(1180px, 100%)" maxH={{ base: "100dvh", md: "92dvh" }} overflowY="auto" bg="white" rounded={{ base: "0", md: "36px" }} boxShadow="var(--kh-shadow-editorial)">
              <SimpleGrid columns={{ base: 1, lg: 2 }} minH={{ lg: "680px" }}>
                <Box minH={{ base: "42vh", lg: "680px" }} position="relative" bg="#eee">
                  <Image src={activeLook.image} alt={activeLook.alt} w="100%" h="100%" objectFit="cover" position="absolute" inset="0" />
                  <Badge position="absolute" top="5" left="5" px="4" py="2" rounded="full" bg="whiteAlpha.900" color="#171313" fontWeight="900">{activeLook.trend ?? activeLook.category}</Badge>
                </Box>
                <VStack align="stretch" gap="0" p={{ base: "6", md: "9" }}>
                  <Flex justify="space-between" align="center" mb="7">
                    <Text fontSize="xs" fontWeight="900" letterSpacing=".15em" textTransform="uppercase" color="var(--kh-color-primary)">{activeLook.category}</Text>
                    <IconButton aria-label="Close look details" rounded="full" variant="ghost" onClick={() => setActiveLook(null)}>✕</IconButton>
                  </Flex>
                  <Heading fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "4xl", md: "6xl" }} lineHeight=".94" letterSpacing="-.055em">{activeLook.title}</Heading>
                  <Text mt="5" color="blackAlpha.700" lineHeight="1.75" fontSize={{ base: "md", md: "lg" }}>{activeLook.description}</Text>

                  <Flex mt="6" gap="2" wrap="wrap">{activeLook.tags.map((tag) => <Badge key={tag} px="3.5" py="2" rounded="full" bg="blackAlpha.50" color="#171313">{tag}</Badge>)}</Flex>

                  <SimpleGrid columns={2} gap="4" mt="7" p="5" bg="blackAlpha.50" rounded="24px">
                    <Box><Text fontSize="xs" color="blackAlpha.600">Typical upkeep</Text><Text mt="1" fontWeight="800">{activeLook.maintenance}</Text></Box>
                    <Box><Text fontSize="xs" color="blackAlpha.600">Great for</Text><Text mt="1" fontWeight="800">{activeLook.idealFor}</Text></Box>
                  </SimpleGrid>

                  <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mt="7">
                    <Button asChild minH="13" px="6" rounded="full" bg="#171313" color="white" _hover={{ bg: "var(--kh-color-primary)" }}>
                      <Link href={`/services?service=${activeLook.service.slug}&variant=${activeLook.service.variant ?? ""}&look=${activeLook.id}`}>{activeLook.service.label} →</Link>
                    </Button>
                    <Button minH="13" px="6" rounded="full" variant="outline" borderColor="blackAlpha.200" onClick={() => toggleSave(activeLook)}>
                      {savedState.saved.includes(activeLook.id) ? "✓ Saved to My Lookbook" : "+ Save to My Lookbook"}
                    </Button>
                  </SimpleGrid>

                  {activeLook.products?.length ? (
                    <Box mt="8" pt="7" borderTop="1px solid" borderColor="blackAlpha.100">
                      <Text fontWeight="900" mb="3">Shop this direction</Text>
                      <VStack align="stretch" gap="2">
                        {activeLook.products.map((product) => (
                          <Button key={product.id} asChild minH="12" px="5" rounded="full" justifyContent="space-between" variant="ghost" bg="blackAlpha.50" _hover={{ bg: "var(--kh-bg-pink-soft)" }}>
                            <Link href={`/shop/${product.id}`}><span>{product.label}</span><span>↗</span></Link>
                          </Button>
                        ))}
                      </VStack>
                    </Box>
                  ) : null}
                </VStack>
              </SimpleGrid>
            </Box>
          </Box>
        ) : null}
      </Box>
    </PageMenuPlaceholder>
  );
}
