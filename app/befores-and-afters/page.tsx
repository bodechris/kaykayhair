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
  emptyTransformationState,
  TRANSFORMATION_STORAGE_KEY,
  transformationCategories,
  transformations,
  type SavedTransformationState,
  type Transformation,
  type TransformationCategory,
} from "@/lib/transformations";

function readState(): SavedTransformationState {
  if (typeof window === "undefined") return emptyTransformationState;
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(TRANSFORMATION_STORAGE_KEY) || "{}",
    ) as Partial<SavedTransformationState>;
    return {
      loved: Array.isArray(parsed.loved) ? parsed.loved : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
    };
  } catch {
    return emptyTransformationState;
  }
}

function saveState(state: SavedTransformationState) {
  window.localStorage.setItem(TRANSFORMATION_STORAGE_KEY, JSON.stringify(state));
}

function BeforeAfterSlider({ item }: { item: Transformation }) {
  const [position, setPosition] = useState(50);

  return (
    <Box
      position="relative"
      overflow="hidden"
      rounded={{ base: "28px", md: "34px" }}
      bg="blackAlpha.100"
      aspectRatio={{ base: "4 / 5", md: "16 / 11" }}
      userSelect="none"
      _focusWithin={{ boxShadow: "0 0 0 4px var(--kh-color-pink-100)" }}
    >
      <Image
        src={item.beforeImage}
        alt={`${item.title} before`}
        position="absolute"
        inset="0"
        w="100%"
        h="100%"
        objectFit="cover"
        draggable={false}
      />

      <Image
        src={item.afterImage}
        alt={`${item.title} after`}
        position="absolute"
        inset="0"
        w="100%"
        h="100%"
        objectFit="cover"
        draggable={false}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      <Box
        position="absolute"
        top="0"
        bottom="0"
        left={`${position}%`}
        transform="translateX(-50%)"
        w="3px"
        bg="white"
        boxShadow="0 0 0 1px rgba(0,0,0,.08), 0 0 18px rgba(0,0,0,.14)"
        pointerEvents="none"
        zIndex="3"
      >
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          align="center"
          justify="center"
          w={{ base: "48px", md: "54px" }}
          h={{ base: "48px", md: "54px" }}
          rounded="full"
          bg="white"
          color="#171313"
          boxShadow="0 12px 34px rgba(0,0,0,.22)"
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="800"
          letterSpacing="-.25em"
          pr="0.25em"
        >
          ‹›
        </Flex>
      </Box>

      <input
        aria-label={`Drag to compare before and after for ${item.title}`}
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "ew-resize",
          zIndex: 4,
          margin: 0,
          touchAction: "pan-y",
        }}
      />

      <Badge
        position="absolute"
        left={{ base: "3", md: "4" }}
        bottom={{ base: "3", md: "4" }}
        px="3.5"
        py="2"
        rounded="full"
        bg="whiteAlpha.950"
        color="#171313"
        boxShadow="var(--kh-shadow-soft)"
        zIndex="2"
      >
        Before
      </Badge>
      <Badge
        position="absolute"
        right={{ base: "3", md: "4" }}
        bottom={{ base: "3", md: "4" }}
        px="3.5"
        py="2"
        rounded="full"
        bg="var(--kh-color-primary)"
        color="white"
        boxShadow="var(--kh-shadow-soft)"
        zIndex="2"
      >
        After
      </Badge>
      <Badge
        position="absolute"
        top={{ base: "3", md: "4" }}
        left="50%"
        transform="translateX(-50%)"
        px="4"
        py="2"
        rounded="full"
        bg="rgba(23,19,19,.72)"
        color="white"
        backdropFilter="blur(10px)"
        fontSize="xs"
        fontWeight="800"
        zIndex="2"
        pointerEvents="none"
      >
        Drag to compare
      </Badge>
    </Box>
  );
}

function TransformationRow({
  item,
  index,
  state,
  onLove,
  onSave,
}: {
  item: Transformation;
  index: number;
  state: SavedTransformationState;
  onLove: (item: Transformation) => void;
  onSave: (item: Transformation) => void;
}) {
  const loved = state.loved.includes(item.id);
  const saved = state.saved.includes(item.id);

  return (
    <Box
      as="article"
      py={{ base: "8", md: "12" }}
      borderTop="1px solid"
      borderColor="blackAlpha.100"
    >
      <SimpleGrid
        columns={{ base: 1, xl: 12 }}
        gap={{ base: "7", md: "10", xl: "12" }}
        alignItems="center"
      >
        <Box gridColumn={{ xl: "span 7" }}>
          <BeforeAfterSlider item={item} />
        </Box>

        <VStack gridColumn={{ xl: "span 5" }} align="stretch" gap="0">
          <Flex justify="space-between" align="center" gap="4" mb="5">
            <HStack gap="3">
              <Text
                fontSize="xs"
                fontWeight="900"
                letterSpacing=".12em"
                color="blackAlpha.500"
              >
                {String(index + 1).padStart(2, "0")}
              </Text>
              <Text
                fontSize="xs"
                fontWeight="900"
                letterSpacing=".12em"
                textTransform="uppercase"
                color="var(--kh-color-primary)"
              >
                {item.eyebrow}
              </Text>
            </HStack>
            <HStack gap="2">
              <IconButton
                aria-label={loved ? `Unlike ${item.title}` : `Love ${item.title}`}
                rounded="full"
                minW="44px"
                h="44px"
                bg={loved ? "var(--kh-bg-pink-soft)" : "blackAlpha.50"}
                color={loved ? "var(--kh-color-primary)" : "#171313"}
                _hover={{ bg: "var(--kh-bg-pink-soft)", color: "var(--kh-color-primary)" }}
                onClick={() => onLove(item)}
              >
                {loved ? "♥" : "♡"}
              </IconButton>
              <IconButton
                aria-label={saved ? `Remove ${item.title} from My Lookbook` : `Save ${item.title} to My Lookbook`}
                rounded="full"
                minW="44px"
                h="44px"
                bg={saved ? "var(--kh-color-primary)" : "blackAlpha.50"}
                color={saved ? "white" : "#171313"}
                _hover={{ bg: saved ? "var(--kh-color-pink-600)" : "var(--kh-bg-pink-soft)" }}
                onClick={() => onSave(item)}
              >
                {saved ? "✓" : "+"}
              </IconButton>
            </HStack>
          </Flex>

          <Heading
            fontFamily="var(--kh-font-heading)"
            fontWeight="400"
            fontSize={{ base: "3xl", md: "5xl" }}
            lineHeight=".98"
            letterSpacing="-.05em"
          >
            {item.title}
          </Heading>

          <Text mt="5" color="blackAlpha.700" lineHeight="1.75" fontSize={{ base: "sm", md: "md" }}>
            {item.story}
          </Text>

          <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mt="6">
            <Box p="5" rounded="22px" bg="blackAlpha.50">
              <Text fontSize="xs" color="blackAlpha.600" fontWeight="700">
                The result
              </Text>
              <Text mt="1" fontWeight="850">
                {item.result}
              </Text>
            </Box>
            <Box p="5" rounded="22px" bg="blackAlpha.50">
              <Text fontSize="xs" color="blackAlpha.600" fontWeight="700">
                Time to allow
              </Text>
              <Text mt="1" fontWeight="850">
                {item.time}
              </Text>
            </Box>
          </SimpleGrid>

          <HStack gap="2" wrap="wrap" mt="5">
            {item.tags.map((tag) => (
              <Badge key={tag} px="3.5" py="2" rounded="full" bg="var(--kh-bg-pink-soft)" color="var(--kh-color-pink-800)">
                {tag}
              </Badge>
            ))}
          </HStack>

          {item.carePlusFit ? (
            <Box mt="5" p="5" rounded="22px" bg="var(--kh-bg-pink-soft)" border="1px solid" borderColor="var(--kh-color-pink-100)">
              <Text fontWeight="900" color="var(--kh-color-pink-800)">
                Want to keep this look maintained?
              </Text>
              <Text mt="1" fontSize="sm" color="var(--kh-color-pink-800)">
                {item.carePlusFit}
              </Text>
            </Box>
          ) : null}

          <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mt="7">
            <Button
              asChild
              minH="13"
              px="7"
              rounded="full"
              bg="#171313"
              color="white"
              _hover={{ bg: "var(--kh-color-primary)" }}
            >
              <Link href={`/services?service=${item.service.slug}&variant=${item.service.variant ?? ""}&transformation=${item.id}`}>
                {item.service.label} →
              </Link>
            </Button>
            <Button
              minH="13"
              px="7"
              rounded="full"
              variant="outline"
              borderColor="blackAlpha.200"
              bg="white"
              onClick={() => onSave(item)}
            >
              {saved ? "✓ Saved to My Lookbook" : "+ Save this result"}
            </Button>
          </SimpleGrid>

          {item.products?.length ? (
            <Box mt="5">
              <Text fontSize="xs" fontWeight="800" color="blackAlpha.600" mb="2">
                Want the hair too?
              </Text>
              <HStack gap="2" wrap="wrap">
                {item.products.map((product) => (
                  <Button
                    key={product.id}
                    asChild
                    size="sm"
                    minH="10"
                    px="5"
                    rounded="full"
                    bg="blackAlpha.50"
                    color="#171313"
                    _hover={{ bg: "blackAlpha.100" }}
                  >
                    <Link href={`/shop/${product.id}`}>{product.label} ↗</Link>
                  </Button>
                ))}
              </HStack>
            </Box>
          ) : null}

          <Button
            asChild
            alignSelf="start"
            mt="4"
            minH="10"
            px="0"
            variant="ghost"
            color="var(--kh-color-primary)"
            _hover={{ bg: "transparent", color: "var(--kh-color-pink-700)" }}
          >
            <Link href="/care-plus">See how Care+ can keep your hair handled every month →</Link>
          </Button>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}

export default function BeforesAndAftersPage() {
  const [category, setCategory] = useState<TransformationCategory>("All");
  const [state, setState] = useState<SavedTransformationState>(emptyTransformationState);

  useEffect(() => setState(readState()), []);

  const visible = useMemo(
    () => (category === "All" ? transformations : transformations.filter((item) => item.category === category)),
    [category],
  );

  const toggleLove = (item: Transformation) => {
    const loved = state.loved.includes(item.id);
    const next = {
      ...state,
      loved: loved ? state.loved.filter((id) => id !== item.id) : [...state.loved, item.id],
    };
    setState(next);
    saveState(next);
  };

  const toggleSave = (item: Transformation) => {
    const saved = state.saved.includes(item.id);
    const next = {
      ...state,
      saved: saved ? state.saved.filter((id) => id !== item.id) : [...state.saved, item.id],
    };
    setState(next);
    saveState(next);
    toaster.create({
      title: saved ? "Removed from My Lookbook" : "Saved to My Lookbook",
      description: saved
        ? `${item.title} has been removed.`
        : "You can come back to this transformation whenever you're ready to book.",
      type: "info",
    });
  };

  return (
    <PageMenuPlaceholder title="Before & Afters" width="96%">
      <Box as="main" bg="white" color="#171313">
        <Box px={{ base: "5", md: "10", xl: "14" }} pt={{ base: "12", md: "18" }} pb={{ base: "10", md: "16" }}>
          <SimpleGrid columns={{ base: 1, lg: 12 }} gap={{ base: "8", lg: "10" }} alignItems="end">
            <Box gridColumn={{ lg: "span 8" }}>
              <Text
                fontSize="xs"
                fontWeight="900"
                letterSpacing=".14em"
                textTransform="uppercase"
                color="var(--kh-color-primary)"
              >
                Real before & after results
              </Text>
              <Heading
                mt="3"
                maxW="900px"
                fontFamily="var(--kh-font-heading)"
                fontWeight="400"
                fontSize={{ base: "5xl", md: "7xl", xl: "8xl" }}
                lineHeight=".9"
                letterSpacing="-.06em"
              >
                See the difference before you book it.
              </Heading>
            </Box>
            <VStack gridColumn={{ lg: "span 4" }} align="start" gap="5" pb={{ lg: "2" }}>
              <Text fontSize={{ base: "md", md: "lg" }} color="blackAlpha.700" lineHeight="1.75">
                Drag across each photo to compare the before and after. Find a result that feels like you, save it, then book the exact service or shop the hair behind it.
              </Text>
              <HStack gap="3" wrap="wrap">
                <Button asChild minH="13" px="7" rounded="full" bg="#171313" color="white">
                  <a href="#transformations">See the results ↓</a>
                </Button>
                <Button asChild minH="13" px="7" rounded="full" bg="var(--kh-bg-pink-soft)" color="var(--kh-color-primary)">
                  <Link href="/my-lookbook">My Lookbook ({state.saved.length})</Link>
                </Button>
              </HStack>
            </VStack>
          </SimpleGrid>
        </Box>

        <Box
          bg="var(--kh-color-black)"
          color="white"
          px={{ base: "5", md: "10", xl: "14" }}
          py={{ base: "8", md: "10" }}
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "6", md: "8" }}>
            <Box>
              <Text color="var(--kh-color-pink-300)" fontWeight="900" fontSize="sm">
                Find your next look
              </Text>
              <Text mt="2" color="whiteAlpha.700" lineHeight="1.7">
                Braids, wigs, healthy-hair treatments, glam and bridal finishes — only the transformations worth stopping for.
              </Text>
            </Box>
            <Box>
              <Text color="var(--kh-color-pink-300)" fontWeight="900" fontSize="sm">
                Save what suits your life
              </Text>
              <Text mt="2" color="whiteAlpha.700" lineHeight="1.7">
                Keep a shortlist for your next work refresh, event, protective style or full switch-up.
              </Text>
            </Box>
            <Box>
              <Text color="var(--kh-color-pink-300)" fontWeight="900" fontSize="sm">
                Book without starting over
              </Text>
              <Text mt="2" color="whiteAlpha.700" lineHeight="1.7">
                When you find the one, the related service is already connected so you can move straight into booking.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>

        <Box id="transformations" px={{ base: "5", md: "10", xl: "14" }} py={{ base: "12", md: "16" }}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            justify="space-between"
            align={{ lg: "end" }}
            gap="7"
            mb={{ base: "4", md: "7" }}
          >
            <Box>
              <Text fontSize="xs" fontWeight="900" letterSpacing=".14em" textTransform="uppercase" color="var(--kh-color-primary)">
                {visible.length} transformations
              </Text>
              <Heading
                mt="2"
                fontFamily="var(--kh-font-heading)"
                fontWeight="400"
                fontSize={{ base: "4xl", md: "6xl" }}
                letterSpacing="-.055em"
              >
                What do you want next?
              </Heading>
            </Box>

            <HStack maxW="100%" overflowX="auto" gap="2" p="1.5" bg="blackAlpha.50" rounded="full">
              {transformationCategories.map((item) => (
                <Button
                  key={item}
                  flexShrink="0"
                  minH="11"
                  px="5"
                  rounded="full"
                  bg={category === item ? "#171313" : "transparent"}
                  color={category === item ? "white" : "#171313"}
                  _hover={{ bg: category === item ? "#171313" : "white" }}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </Button>
              ))}
            </HStack>
          </Flex>

          <Box>
            {visible.map((item, index) => (
              <TransformationRow
                key={item.id}
                item={item}
                index={index}
                state={state}
                onLove={toggleLove}
                onSave={toggleSave}
              />
            ))}
          </Box>
        </Box>

        <Box
          mx={{ base: "5", md: "10", xl: "14" }}
          mb={{ base: "8", md: "10" }}
          p={{ base: "7", md: "11" }}
          rounded={{ base: "30px", md: "44px" }}
          bg="var(--kh-bg-pink-soft)"
          border="1px solid"
          borderColor="var(--kh-color-pink-100)"
        >
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="9" alignItems="center">
            <Box>
              <Text fontSize="xs" fontWeight="900" letterSpacing=".14em" textTransform="uppercase" color="var(--kh-color-primary)">
                Care+ monthly hair membership
              </Text>
              <Heading
                mt="3"
                fontFamily="var(--kh-font-heading)"
                fontWeight="400"
                fontSize={{ base: "4xl", md: "6xl" }}
                lineHeight=".95"
                letterSpacing="-.055em"
              >
                Love being freshly done? Make it easier to stay that way.
              </Heading>
            </Box>
            <VStack align="start" gap="5">
              <Text color="blackAlpha.700" lineHeight="1.75">
                Care+ is for women who want their hair handled regularly without the last-minute scramble. Get predictable monthly spend, routine maintenance and member booking benefits.
              </Text>
              <Button
                asChild
                minH="13"
                px="7"
                rounded="full"
                bg="var(--kh-color-primary)"
                color="white"
                _hover={{ bg: "var(--kh-color-pink-600)" }}
              >
                <Link href="/care-plus">See Care+ plans →</Link>
              </Button>
            </VStack>
          </SimpleGrid>
        </Box>

        <Box
          mx={{ base: "5", md: "10", xl: "14" }}
          mb={{ base: "14", md: "20" }}
          p={{ base: "7", md: "10" }}
          rounded={{ base: "30px", md: "44px" }}
          bg="var(--kh-color-blue)"
          color="white"
        >
          <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ md: "center" }} gap="7">
            <Box maxW="760px">
              <Text fontSize="xs" fontWeight="900" letterSpacing=".14em" textTransform="uppercase" color="whiteAlpha.700">
                Your saved results
              </Text>
              <Heading mt="2" fontFamily="var(--kh-font-heading)" fontWeight="400" fontSize={{ base: "3xl", md: "5xl" }}>
                Keep the looks you would genuinely wear.
              </Heading>
              <Text mt="3" color="whiteAlpha.700">
                Your saved transformations sit alongside your Look Book inspiration on this device.
              </Text>
            </Box>
            <Button asChild minH="13" px="7" rounded="full" bg="white" color="#171313">
              <Link href="/my-lookbook">Open My Lookbook ({state.saved.length}) →</Link>
            </Button>
          </Flex>
        </Box>
      </Box>
    </PageMenuPlaceholder>
  );
}
