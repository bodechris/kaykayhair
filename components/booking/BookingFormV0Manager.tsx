"use client"

import { CloseButton, Drawer, Portal } from "@chakra-ui/react"
import type { KaykayServiceSlug } from "@/app/services/services"
import BookingFormV0, { type BookingDraft } from "./BookingFormV0"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedServices: KaykayServiceSlug[]
  initialVariantByService?: Record<string, string>
  onDraftCreated?: (draft: BookingDraft) => void
}

export default function BookingFormV0Manager({ open, onOpenChange, selectedServices, initialVariantByService, onDraftCreated }: Props) {
  return (
    <Drawer.Root open={open} onOpenChange={(details) => onOpenChange(details.open)} placement="end" size="xl">
      <Portal>
        <Drawer.Backdrop bg="blackAlpha.500" backdropFilter="blur(6px)" />
        <Drawer.Positioner p={{ base: 0, md: 3 }}>
          <Drawer.Content
            borderRadius={{ base: 0, md: "3xl" }}
            overflow="hidden"
            maxW={{ base: "100vw", md: "860px" }}
            h={{ base: "100dvh", md: "calc(100dvh - 24px)" }}
            bg="white"
          >
            <Drawer.Header borderBottomWidth="1px" px={{ base: "5", md: "9" }} py={{ base: "5", md: "6" }}>
              <Drawer.Title fontSize="sm" letterSpacing="0.04em">BOOK AN APPOINTMENT</Drawer.Title>
              <Drawer.CloseTrigger asChild><CloseButton size="sm" position="absolute" top={{ base: "4", md: "5" }} right={{ base: "4", md: "6" }} rounded="full" /></Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body p="0" overflow="hidden">
              <BookingFormV0
                selectedServices={selectedServices}
                initialVariantByService={initialVariantByService}
                onClose={() => onOpenChange(false)}
                onDraftCreated={onDraftCreated}
              />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
