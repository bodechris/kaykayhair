"use client"

import { useMemo, useState } from "react"
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Separator,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react"
import {
  FiAlertCircle,
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiImage,
  FiLock,
} from "react-icons/fi"
import { kaykayServices, type KaykayService, type KaykayServiceSlug } from "@/app/services/services"
import { toaster } from "@/components/ui/toaster"
import { GuidedDateField, GuidedTimeField } from "@/components/ui/proactive-fields"
import {
  formatZar,
  getAvailableSlots,
  getBookableDates,
  getDepositForService,
  parseDurationToMinutes,
  serviceQuestions,
  toDateKey,
  type BookingQuestion,
} from "./booking-config"

export type BookingDraft = {
  id: string
  status: "pending_payment"
  createdAt: string
  selectedServices: Array<{
    serviceSlug: KaykayServiceSlug
    serviceTitle: string
    subserviceSlug: string
    subserviceName: string
    fromPrice: number
    duration: string
  }>
  answers: Record<string, string | string[]>
  date: string
  time: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    note: string
  }
  referenceImages: string[]
  depositAmount: number
  policyAcceptedAt: string
  policyVersion: "2026-09"
}

type Props = {
  selectedServices: KaykayServiceSlug[]
  initialVariantByService?: Record<string, string>
  onClose?: () => void
  onDraftCreated?: (draft: BookingDraft) => void
}

const steps = ["Services", "Questions", "Date & time", "Your details", "Deposit"]

const errorBoxStyles = {
  borderColor: "red.400",
  boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.12)",
  bg: "red.50",
}

function ChoiceCard({
  selected,
  title,
  description,
  meta,
  onClick,
  compact = false,
}: {
  selected: boolean
  title: string
  description?: string
  meta?: string
  onClick: () => void
  compact?: boolean
}) {
  return (
    <Button
      type="button"
      textAlign="left"
      w="full"
      h="auto"
      display="block"
      whiteSpace="normal"
      justifyContent="stretch"
      borderWidth="1px"
      borderColor={selected ? "var(--kh-color-ink)" : "gray.200"}
      bg={selected ? "var(--kh-color-ink)" : "white"}
      color={selected ? "white" : "gray.900"}
      borderRadius="2xl"
      px={compact ? { base: "4", md: "5" } : { base: "5", md: "6" }}
      py={compact ? { base: "3.5", md: "4" } : { base: "4", md: "5" }}
      minH={compact ? "48px" : "54px"}
      transition="all 180ms ease"
      _hover={{
        transform: "translateY(-2px)",
        shadow: "sm",
        borderColor: selected ? "var(--kh-color-ink)" : "var(--kh-color-pink-200)",
      }}
      _focusVisible={{ outline: "3px solid var(--kh-color-pink-200)", outlineOffset: "2px" }}
      onClick={onClick}
    >
      <Flex justify="space-between" gap="4" align="start">
        <Box>
          <Text fontWeight="700">{title}</Text>
          {description ? <Text mt="1" fontSize="sm" opacity={0.75}>{description}</Text> : null}
          {meta ? <Text mt="3" fontSize="xs" fontWeight="700" opacity={0.7}>{meta}</Text> : null}
        </Box>
        {selected ? <Box pt="1"><FiCheck /></Box> : null}
      </Flex>
    </Button>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <HStack gap="2" mt="1" color="red.700" role="alert">
      <FiAlertCircle />
      <Text fontSize="xs" fontWeight="700">{message}</Text>
    </HStack>
  )
}

function QuestionField({
  question,
  value,
  onChange,
  invalid,
}: {
  question: BookingQuestion
  value?: string | string[]
  onChange: (value: string | string[]) => void
  invalid?: boolean
}) {
  const wrapperProps = invalid ? errorBoxStyles : {}

  if (question.type === "text") {
    return (
      <Box borderWidth={invalid ? "1px" : "0"} borderRadius="2xl" p={invalid ? "4" : "0"} {...wrapperProps}>
        <Stack gap="2">
          <Text fontWeight="700">{question.label}{question.required ? " *" : ""}</Text>
          <Input
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            borderRadius="xl"
            h="52px"
            px="4"
            aria-invalid={invalid || undefined}
            _focusVisible={{ borderColor: "var(--kh-color-primary)", boxShadow: "0 0 0 1px var(--kh-color-primary)" }}
          />
          {question.helpText ? <Text fontSize="xs" color="gray.500">{question.helpText}</Text> : null}
          <FieldError message={invalid ? "Please complete this field." : undefined} />
        </Stack>
      </Box>
    )
  }

  if (question.type === "date") {
    return (
      <Box borderWidth={invalid ? "1px" : "0"} borderRadius="2xl" p={invalid ? "4" : "0"} {...wrapperProps}>
        <Stack gap="2">
          <Text fontWeight="700">{question.label}{question.required ? " *" : ""}</Text>
          <GuidedDateField
            value={typeof value === "string" ? value : ""}
            onChange={onChange}
            minDaysFromNow={question.minDaysFromNow ?? 0}
            maxDaysFromNow={question.maxDaysFromNow ?? 365}
            invalid={invalid}
          />
          {question.helpText ? <Text fontSize="xs" color="gray.500">{question.helpText}</Text> : null}
          <FieldError message={invalid ? "Choose a future date to continue." : undefined} />
        </Stack>
      </Box>
    )
  }

  if (question.type === "time") {
    return (
      <Box borderWidth={invalid ? "1px" : "0"} borderRadius="2xl" p={invalid ? "4" : "0"} {...wrapperProps}>
        <Stack gap="2">
          <Text fontWeight="700">{question.label}{question.required ? " *" : ""}</Text>
          <GuidedTimeField
            value={typeof value === "string" ? value : ""}
            onChange={onChange}
            startHour={question.startHour ?? 7}
            endHour={question.endHour ?? 20}
            intervalMinutes={question.intervalMinutes ?? 30}
            invalid={invalid}
          />
          {question.helpText ? <Text fontSize="xs" color="gray.500">{question.helpText}</Text> : null}
          <FieldError message={invalid ? "Choose the time you need to be ready." : undefined} />
        </Stack>
      </Box>
    )
  }

  if (question.type === "textarea") {
    return (
      <Box borderWidth={invalid ? "1px" : "0"} borderRadius="2xl" p={invalid ? "4" : "0"} {...wrapperProps}>
        <Stack gap="2">
          <Text fontWeight="700">{question.label}{question.required ? " *" : ""}</Text>
          <Textarea
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            borderRadius="xl"
            minH="130px"
            px="4"
            py="3.5"
            resize="vertical"
            aria-invalid={invalid || undefined}
            _focusVisible={{ borderColor: "var(--kh-color-primary)", boxShadow: "0 0 0 1px var(--kh-color-primary)" }}
          />
          {question.helpText ? <Text fontSize="xs" color="gray.500">{question.helpText}</Text> : null}
          <FieldError message={invalid ? "Please complete this field." : undefined} />
        </Stack>
      </Box>
    )
  }

  if (question.type === "multi") {
    const selectedValues = Array.isArray(value) ? value : []
    return (
      <Box borderWidth={invalid ? "1px" : "0"} borderRadius="2xl" p={invalid ? "4" : "0"} {...wrapperProps}>
        <Stack gap="3">
          <Text fontWeight="700">{question.label}{question.required ? " *" : ""}</Text>
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2">
            {question.options?.map((option) => {
              const active = selectedValues.includes(option)
              return (
                <ChoiceCard
                  key={option}
                  selected={active}
                  title={option}
                  onClick={() => onChange(active ? selectedValues.filter((v) => v !== option) : [...selectedValues, option])}
                />
              )
            })}
          </SimpleGrid>
          <FieldError message={invalid ? "Choose at least one option." : undefined} />
        </Stack>
      </Box>
    )
  }

  return (
    <Box borderWidth={invalid ? "1px" : "0"} borderRadius="2xl" p={invalid ? "4" : "0"} {...wrapperProps}>
      <Stack gap="3">
        <Text fontWeight="700">{question.label}{question.required ? " *" : ""}</Text>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2">
          {question.options?.map((option) => (
            <ChoiceCard
              key={option}
              selected={value === option}
              title={option}
              onClick={() => onChange(option)}
            />
          ))}
        </SimpleGrid>
        {question.helpText ? <Text fontSize="xs" color="gray.500">{question.helpText}</Text> : null}
        <FieldError message={invalid ? "Choose an option to continue." : undefined} />
      </Stack>
    </Box>
  )
}

export default function BookingFormV0({ selectedServices, initialVariantByService = {}, onClose, onDraftCreated }: Props) {
  const selectedModels = useMemo(
    () => selectedServices
      .map((slug) => kaykayServices.find((service) => service.slug === slug))
      .filter((service): service is KaykayService => Boolean(service)),
    [selectedServices],
  )

  const [step, setStep] = useState(0)
  const [variantByService, setVariantByService] = useState<Record<string, string>>(initialVariantByService)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [dateKey, setDateKey] = useState("")
  const [time, setTime] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [note, setNote] = useState("")
  const [referenceImages, setReferenceImages] = useState<string[]>([])
  const [depositAccepted, setDepositAccepted] = useState(false)
  const [invalidTarget, setInvalidTarget] = useState("")
  const [savedDraft, setSavedDraft] = useState<BookingDraft | null>(null)
  const [isSavingDraft, setIsSavingDraft] = useState(false)

  const chosen = useMemo(() => selectedModels.map((service) => {
    const chosenSlug = variantByService[service.slug]
    const variant = service.subservices?.find((item) => item.slug === chosenSlug)
    return variant ? { service, variant } : null
  }).filter(Boolean), [selectedModels, variantByService])

  const durationMinutes = useMemo(
    () => chosen.reduce((sum, item) => sum + parseDurationToMinutes(item?.variant.duration), 0),
    [chosen],
  )
  const totalFromPrice = useMemo(
    () => chosen.reduce((sum, item) => sum + (item?.variant.fromPrice ?? item?.service.fromPrice ?? 0), 0),
    [chosen],
  )
  const depositAmount = useMemo(
    () => chosen.reduce((sum, item) => sum + (item ? getDepositForService(item.service.slug) : 0), 0),
    [chosen],
  )
  const allQuestions = useMemo(
    () => selectedServices.flatMap((slug) => (serviceQuestions[slug] ?? []).map((question) => ({
      ...question,
      key: `${slug}:${question.id}`,
      serviceSlug: slug,
    }))),
    [selectedServices],
  )
  const dates = useMemo(() => getBookableDates(18), [])
  const selectedDate = useMemo(() => dates.find((date) => toDateKey(date) === dateKey), [dates, dateKey])
  const slots = useMemo(
    () => selectedDate ? getAvailableSlots(selectedDate, durationMinutes || 120) : [],
    [selectedDate, durationMinutes],
  )
  const morningSlots = useMemo(() => slots.filter((slot) => Number(slot.split(":")[0]) < 12), [slots])
  const afternoonSlots = useMemo(() => slots.filter((slot) => Number(slot.split(":")[0]) >= 12), [slots])
  const estimatedBalance = Math.max(0, totalFromPrice - depositAmount)

  const setAnswer = (key: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    if (invalidTarget === `question:${key}`) setInvalidTarget("")
  }

  const revealError = (message: string, target: string) => {
    setInvalidTarget(target)
    toaster.create({
      type: "error",
      title: "Please check this step",
      description: message,
      duration: 4500,
      closable: true,
    })

    window.setTimeout(() => {
      const element = document.querySelector<HTMLElement>(`[data-booking-field="${target}"]`)
      if (!element) return
      element.scrollIntoView({ behavior: "smooth", block: "center" })
      window.setTimeout(() => {
        const focusable = element.querySelector<HTMLElement>("input, textarea, button, [tabindex]:not([tabindex='-1'])")
        focusable?.focus({ preventScroll: true })
      }, 350)
    }, 60)
  }

  const validateStep = () => {
    setInvalidTarget("")

    if (step === 0) {
      const missingService = selectedModels.find((service) => !variantByService[service.slug])
      if (missingService) {
        revealError(`Choose the exact ${missingService.title.toLowerCase()} service you want to continue.`, `service:${missingService.slug}`)
        return false
      }
    }

    if (step === 1) {
      const missing = allQuestions.find((q) => {
        if (!q.required) return false
        const value = answers[q.key]
        return Array.isArray(value) ? value.length === 0 : !String(value ?? "").trim()
      })
      if (missing) {
        revealError(`Please answer “${missing.label}” before continuing.`, `question:${missing.key}`)
        return false
      }
    }

    if (step === 2) {
      if (!dateKey) {
        revealError("Choose an available appointment date.", "appointment-date")
        return false
      }
      if (!time) {
        revealError("Choose an available appointment time.", "appointment-time")
        return false
      }
    }

    if (step === 3) {
      const details = [
        { value: firstName.trim(), target: "first-name", label: "first name" },
        { value: lastName.trim(), target: "last-name", label: "last name" },
        { value: email.trim(), target: "email", label: "email address" },
        { value: phone.trim(), target: "phone", label: "phone number" },
      ]
      const missing = details.find((item) => !item.value)
      if (missing) {
        revealError(`Please add your ${missing.label}.`, missing.target)
        return false
      }
    }

    return true
  }

  const next = () => {
    if (!validateStep()) return
    setStep((current) => Math.min(current + 1, steps.length - 1))
  }

  const back = () => {
    setInvalidTarget("")
    setStep((current) => Math.max(current - 1, 0))
  }

  const createDraft = async () => {
    setInvalidTarget("")
    if (!depositAccepted) {
      revealError("Confirm the non-refundable deposit policy before continuing to payment.", "deposit-policy")
      return
    }
    if (!dateKey || !time || chosen.length !== selectedModels.length || isSavingDraft) return

    const policyAcceptedAt = new Date().toISOString()
    const draftBase: Omit<BookingDraft, "id" | "createdAt" | "depositAmount"> = {
      status: "pending_payment",
      selectedServices: chosen.map((item) => ({
        serviceSlug: item!.service.slug,
        serviceTitle: item!.service.title,
        subserviceSlug: item!.variant.slug,
        subserviceName: item!.variant.name,
        fromPrice: item!.variant.fromPrice ?? item!.service.fromPrice,
        duration: item!.variant.duration ?? item!.service.duration,
      })),
      answers,
      date: dateKey,
      time,
      customer: { firstName, lastName, email, phone, note },
      referenceImages,
      policyAcceptedAt,
      policyVersion: "2026-09",
    }

    setIsSavingDraft(true)
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedServices: draftBase.selectedServices.map((item) => ({
            serviceSlug: item.serviceSlug,
            subserviceSlug: item.subserviceSlug,
          })),
          answers,
          date: dateKey,
          time,
          customer: draftBase.customer,
          referenceImages,
          depositAccepted: true,
          policyAcceptedAt,
          policyVersion: draftBase.policyVersion,
        }),
      })

      const result = await response.json() as {
        id?: string
        createdAt?: string
        depositAmount?: number
        error?: string
      }

      if (!response.ok || !result.id || !result.createdAt) {
        throw new Error(result.error || "Booking could not be saved.")
      }

      const draft: BookingDraft = {
        ...draftBase,
        id: result.id,
        createdAt: result.createdAt,
        depositAmount: result.depositAmount ?? depositAmount,
      }

      setSavedDraft(draft)
      onDraftCreated?.(draft)
      toaster.create({
        type: "success",
        title: "Booking saved",
        description: `Reference ${draft.id} has been saved.`,
        duration: 4500,
        closable: true,
      })
    } catch (error) {
      toaster.create({
        type: "error",
        title: "Booking not saved",
        description: error instanceof Error ? error.message : "Please try again.",
        duration: 6000,
        closable: true,
      })
    } finally {
      setIsSavingDraft(false)
    }
  }

  if (!selectedModels.length) {
    return <Box p="6"><Text>Select at least one service to start a booking.</Text></Box>
  }

  if (savedDraft) {
    return (
      <Stack gap="6" p={{ base: "1", md: "3" }}>
        <Box w="12" h="12" borderRadius="full" bg="var(--kh-bg-pink-soft)" color="var(--kh-color-primary)" display="grid" placeItems="center"><FiCheck size={22} /></Box>
        <Box>
          <Text fontSize="sm" fontWeight="700" color="var(--kh-color-primary)">BOOKING DRAFT CREATED</Text>
          <Heading mt="2" size="2xl">Your appointment is ready for deposit payment.</Heading>
          <Text mt="3" color="gray.600">Reference {savedDraft.id}. Your booking is saved as pending payment. The appointment becomes confirmed once the deposit payment is connected and completed.</Text>
        </Box>
        <Box borderWidth="1px" borderRadius="2xl" p="5">
          <Stack gap="3">
            {savedDraft.selectedServices.map((item) => (
              <Flex key={item.subserviceSlug} justify="space-between" gap="4">
                <Text fontWeight="700">{item.subserviceName}</Text>
                <Text color="gray.600">from {formatZar(item.fromPrice)}</Text>
              </Flex>
            ))}
            <Separator />
            <Flex justify="space-between"><Text>Date</Text><Text fontWeight="700">{savedDraft.date} · {savedDraft.time}</Text></Flex>
            <Flex justify="space-between"><Text>Deposit required</Text><Text fontWeight="800">{formatZar(savedDraft.depositAmount)}</Text></Flex>
          </Stack>
        </Box>
        <Button size="lg" minH="52px" px={{ base: "6", md: "8" }} borderRadius="full" bg="var(--kh-color-ink)" color="white" disabled>
          Payment gateway connects here
        </Button>
        <Button variant="ghost" minH="46px" px="6" borderRadius="full" onClick={onClose}>Close</Button>
      </Stack>
    )
  }

  return (
    <Flex direction="column" h="full" minH="0">
      <Box px={{ base: "5", md: "9" }} pt={{ base: "5", md: "6" }} pb={{ base: "4", md: "5" }} borderBottomWidth="1px">
        <HStack gap="2" overflowX="auto" pb="1">
          {steps.map((label, index) => (
            <HStack key={label} gap="2" flexShrink={0} opacity={index <= step ? 1 : 0.42}>
              <Box
                w="7"
                h="7"
                borderRadius="full"
                bg={index === step ? "var(--kh-color-ink)" : index < step ? "var(--kh-color-primary)" : "gray.100"}
                color={index <= step ? "white" : "gray.700"}
                display="grid"
                placeItems="center"
                fontSize="xs"
                fontWeight="800"
              >
                {index < step ? <FiCheck /> : index + 1}
              </Box>
              <Text fontSize="xs" fontWeight="700">{label}</Text>
            </HStack>
          ))}
        </HStack>
      </Box>

      <Box flex="1" minH="0" overflowY="auto" px={{ base: "5", md: "9" }} py={{ base: "7", md: "8" }} scrollBehavior="smooth">
        {step === 0 ? (
          <Stack gap="7">
            <Box>
              <Text fontSize="sm" fontWeight="700" color="var(--kh-color-primary)">STEP 1</Text>
              <Heading size="2xl" mt="1">Choose the exact services.</Heading>
              <Text color="gray.600" mt="2">This lets us calculate the right appointment length, starting price and deposit.</Text>
            </Box>

            {selectedModels.map((service) => (
              <Box
                key={service.slug}
                data-booking-field={`service:${service.slug}`}
                borderWidth={invalidTarget === `service:${service.slug}` ? "1px" : "0"}
                borderRadius="2xl"
                p={invalidTarget === `service:${service.slug}` ? "4" : "0"}
                {...(invalidTarget === `service:${service.slug}` ? errorBoxStyles : {})}
              >
                <Stack gap="3">
                  <HStack justify="space-between" align="start">
                    <Box>
                      <Text fontSize="sm" color="gray.500">{service.eyebrow}</Text>
                      <Heading size="lg">{service.title}</Heading>
                    </Box>
                    <Badge borderRadius="full" px="3">from {formatZar(service.fromPrice)}</Badge>
                  </HStack>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="3">
                    {service.subservices?.map((variant) => (
                      <ChoiceCard
                        key={variant.slug}
                        selected={variantByService[service.slug] === variant.slug}
                        title={variant.name}
                        description={variant.description}
                        meta={`from ${formatZar(variant.fromPrice ?? service.fromPrice)} · ${variant.duration ?? service.duration}`}
                        onClick={() => {
                          setVariantByService((prev) => ({ ...prev, [service.slug]: variant.slug }))
                          if (invalidTarget === `service:${service.slug}`) setInvalidTarget("")
                        }}
                      />
                    ))}
                  </SimpleGrid>
                  {service.bookingNotes?.length ? (
                    <Box bg="gray.50" borderRadius="xl" p="4">
                      <Text fontSize="xs" fontWeight="800" mb="2">GOOD TO KNOW</Text>
                      {service.bookingNotes.map((item) => <Text key={item} fontSize="sm" color="gray.600">• {item}</Text>)}
                    </Box>
                  ) : null}
                  <FieldError message={invalidTarget === `service:${service.slug}` ? "Choose one service option to continue." : undefined} />
                </Stack>
              </Box>
            ))}
          </Stack>
        ) : null}

        {step === 1 ? (
          <Stack gap="7">
            <Box>
              <Text fontSize="sm" fontWeight="700" color="var(--kh-color-primary)">STEP 2</Text>
              <Heading size="2xl" mt="1">A few details before your visit.</Heading>
              <Text color="gray.600" mt="2">These questions are service-specific and are ready to be managed from the admin area next.</Text>
            </Box>

            {allQuestions.map((question) => (
              <Box key={question.key} data-booking-field={`question:${question.key}`}>
                <QuestionField
                  question={question}
                  value={answers[question.key]}
                  onChange={(value) => setAnswer(question.key, value)}
                  invalid={invalidTarget === `question:${question.key}`}
                />
              </Box>
            ))}

            <Box borderWidth="1px" borderRadius="2xl" px={{ base: "5", md: "6" }} py={{ base: "5", md: "6" }}>
              <HStack mb="3"><FiImage /><Text fontWeight="800">Reference images</Text></HStack>
              <Text fontSize="sm" color="gray.600" mb="4">Add inspiration or a useful reference. Files are listed locally for now; secure upload storage will be connected with the backend.</Text>
              <Input
                type="file"
                accept="image/*"
                multiple
                px="4"
                py="3"
                h="auto"
                minH="52px"
                borderRadius="xl"
                _focusVisible={{ borderColor: "var(--kh-color-primary)", boxShadow: "0 0 0 1px var(--kh-color-primary)" }}
                onChange={(event) => setReferenceImages(Array.from(event.target.files ?? []).slice(0, 3).map((file) => file.name))}
              />
              {referenceImages.length ? <Text mt="2" fontSize="xs" color="gray.500">{referenceImages.join(" · ")}</Text> : null}
            </Box>
          </Stack>
        ) : null}

        {step === 2 ? (
          <Stack gap="7">
            <Box>
              <Text fontSize="sm" fontWeight="700" color="var(--kh-color-primary)">STEP 3</Text>
              <Heading size="2xl" mt="1">Choose your appointment.</Heading>
              <Text color="gray.600" mt="2">Pick a date first, then choose one of the times that can fit your full appointment.</Text>
            </Box>

            <Box
              data-booking-field="appointment-date"
              borderWidth={invalidTarget === "appointment-date" ? "1px" : "0"}
              borderRadius="2xl"
              p={invalidTarget === "appointment-date" ? "4" : "0"}
              {...(invalidTarget === "appointment-date" ? errorBoxStyles : {})}
            >
              <Flex justify="space-between" align="end" gap="4" mb="4">
                <Box>
                  <HStack><FiCalendar /><Text fontWeight="800">Available dates</Text></HStack>
                  <Text mt="1" fontSize="sm" color="gray.500">Showing the next available working days.</Text>
                </Box>
                {selectedDate ? (
                  <Badge borderRadius="full" px="3" py="1" bg="var(--kh-bg-pink-soft)" color="var(--kh-color-primary)">
                    Selected
                  </Badge>
                ) : null}
              </Flex>

              <Box overflowX="auto" pb="2" mx={{ base: "-1", md: "0" }}>
                <HStack gap="3" align="stretch" minW="max-content" px={{ base: "1", md: "0" }}>
                  {dates.map((date) => {
                    const key = toDateKey(date)
                    const selected = dateKey === key
                    return (
                      <Button
                        type="button"
                        key={key}
                        minW="92px"
                        h="auto"
                        display="block"
                        whiteSpace="normal"
                        borderWidth="1px"
                        borderColor={selected ? "var(--kh-color-primary)" : "gray.200"}
                        bg={selected ? "var(--kh-color-primary)" : "white"}
                        color={selected ? "white" : "var(--kh-color-ink)"}
                        borderRadius="2xl"
                        px="4"
                        py="4"
                        textAlign="left"
                        transition="all 180ms ease"
                        _hover={{ transform: "translateY(-2px)", borderColor: "var(--kh-color-primary)" }}
                        _focusVisible={{ outline: "3px solid var(--kh-color-pink-200)", outlineOffset: "2px" }}
                        onClick={() => {
                          setDateKey(key)
                          setTime("")
                          setInvalidTarget("")
                        }}
                      >
                        <Text fontSize="xs" fontWeight="700" opacity={selected ? 0.82 : 0.55} textTransform="uppercase">
                          {date.toLocaleDateString("en-ZA", { weekday: "short" })}
                        </Text>
                        <Text mt="1" fontSize="2xl" lineHeight="1" fontWeight="900">{date.getDate()}</Text>
                        <Text mt="2" fontSize="xs" fontWeight="700" opacity={selected ? 0.82 : 0.55}>
                          {date.toLocaleDateString("en-ZA", { month: "short" })}
                        </Text>
                      </Button>
                    )
                  })}
                </HStack>
              </Box>
              <FieldError message={invalidTarget === "appointment-date" ? "Choose a date to continue." : undefined} />
            </Box>

            <Box
              data-booking-field="appointment-time"
              borderWidth={invalidTarget === "appointment-time" ? "1px" : "0"}
              borderRadius="2xl"
              p={invalidTarget === "appointment-time" ? "4" : "0"}
              {...(invalidTarget === "appointment-time" ? errorBoxStyles : {})}
            >
              <Flex justify="space-between" align="end" gap="4" mb="4">
                <Box>
                  <HStack><FiClock /><Text fontWeight="800">Available times</Text></HStack>
                  <Text mt="1" fontSize="sm" color="gray.500">
                    {selectedDate
                      ? selectedDate.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" })
                      : "Select a date to reveal times."}
                  </Text>
                </Box>
                {time ? (
                  <Badge borderRadius="full" px="3" py="1" bg="var(--kh-bg-pink-soft)" color="var(--kh-color-primary)">{time}</Badge>
                ) : null}
              </Flex>

              {!selectedDate ? (
                <Box borderWidth="1px" borderStyle="dashed" borderRadius="2xl" px="5" py="7" textAlign="center" bg="gray.50">
                  <Text fontWeight="700">Choose a date first</Text>
                  <Text mt="1" fontSize="sm" color="gray.500">Available appointment times will appear here.</Text>
                </Box>
              ) : slots.length ? (
                <Stack gap="5">
                  {morningSlots.length ? (
                    <Box>
                      <Text mb="2.5" fontSize="xs" fontWeight="800" color="gray.500" textTransform="uppercase" letterSpacing="0.08em">Morning</Text>
                      <SimpleGrid columns={{ base: 3, sm: 4 }} gap="2">
                        {morningSlots.map((slot) => (
                          <ChoiceCard
                            key={slot}
                            selected={time === slot}
                            title={slot}
                            compact
                            onClick={() => { setTime(slot); setInvalidTarget("") }}
                          />
                        ))}
                      </SimpleGrid>
                    </Box>
                  ) : null}

                  {afternoonSlots.length ? (
                    <Box>
                      <Text mb="2.5" fontSize="xs" fontWeight="800" color="gray.500" textTransform="uppercase" letterSpacing="0.08em">Afternoon</Text>
                      <SimpleGrid columns={{ base: 3, sm: 4 }} gap="2">
                        {afternoonSlots.map((slot) => (
                          <ChoiceCard
                            key={slot}
                            selected={time === slot}
                            title={slot}
                            compact
                            onClick={() => { setTime(slot); setInvalidTarget("") }}
                          />
                        ))}
                      </SimpleGrid>
                    </Box>
                  ) : null}
                </Stack>
              ) : (
                <Box borderWidth="1px" borderStyle="dashed" borderRadius="2xl" px="5" py="7" textAlign="center" bg="gray.50">
                  <Text fontWeight="700">No times fit this appointment length.</Text>
                  <Text mt="1" fontSize="sm" color="gray.500">Try another available date.</Text>
                </Box>
              )}
              <FieldError message={invalidTarget === "appointment-time" ? "Choose one of the available times." : undefined} />
            </Box>

            <Box borderWidth="1px" borderColor="var(--kh-color-pink-100)" bg="var(--kh-bg-pink-soft)" borderRadius="2xl" px={{ base: "5", md: "6" }} py="5">
              <Flex justify="space-between" gap="4" align="start">
                <Box>
                  <Text fontSize="xs" fontWeight="800" color="var(--kh-color-primary)" textTransform="uppercase">Appointment length</Text>
                  <Text mt="1" fontWeight="800">Up to {Math.ceil(durationMinutes / 60)} hours</Text>
                  <Text mt="1" fontSize="sm" color="gray.600">Includes the configured service buffer.</Text>
                </Box>
                {dateKey && time ? (
                  <Box textAlign="right">
                    <Text fontSize="xs" color="gray.500">Selected</Text>
                    <Text fontWeight="900">{time}</Text>
                  </Box>
                ) : null}
              </Flex>
            </Box>
          </Stack>
        ) : null}

        {step === 3 ? (
          <Stack gap="6">
            <Box>
              <Text fontSize="sm" fontWeight="700" color="var(--kh-color-primary)">STEP 4</Text>
              <Heading size="2xl" mt="1">Your booking details.</Heading>
              <Text color="gray.600" mt="2">We’ll use these details for confirmations and appointment updates.</Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
              <Box data-booking-field="first-name" borderWidth={invalidTarget === "first-name" ? "1px" : "0"} borderRadius="2xl" p={invalidTarget === "first-name" ? "4" : "0"} {...(invalidTarget === "first-name" ? errorBoxStyles : {})}>
                <Stack gap="2">
                  <Text fontWeight="700">First name *</Text>
                  <Input value={firstName} onChange={(e) => { setFirstName(e.target.value); if (invalidTarget === "first-name") setInvalidTarget("") }} autoComplete="given-name" placeholder="e.g. Kaykay" borderRadius="xl" h="52px" px="4" aria-invalid={invalidTarget === "first-name" || undefined} _focusVisible={{ borderColor: "var(--kh-color-primary)", boxShadow: "0 0 0 1px var(--kh-color-primary)" }} />
                  <FieldError message={invalidTarget === "first-name" ? "Add your first name." : undefined} />
                </Stack>
              </Box>
              <Box data-booking-field="last-name" borderWidth={invalidTarget === "last-name" ? "1px" : "0"} borderRadius="2xl" p={invalidTarget === "last-name" ? "4" : "0"} {...(invalidTarget === "last-name" ? errorBoxStyles : {})}>
                <Stack gap="2">
                  <Text fontWeight="700">Last name *</Text>
                  <Input value={lastName} onChange={(e) => { setLastName(e.target.value); if (invalidTarget === "last-name") setInvalidTarget("") }} autoComplete="family-name" placeholder="e.g. Mokoena" borderRadius="xl" h="52px" px="4" aria-invalid={invalidTarget === "last-name" || undefined} _focusVisible={{ borderColor: "var(--kh-color-primary)", boxShadow: "0 0 0 1px var(--kh-color-primary)" }} />
                  <FieldError message={invalidTarget === "last-name" ? "Add your last name." : undefined} />
                </Stack>
              </Box>
              <Box data-booking-field="email" borderWidth={invalidTarget === "email" ? "1px" : "0"} borderRadius="2xl" p={invalidTarget === "email" ? "4" : "0"} {...(invalidTarget === "email" ? errorBoxStyles : {})}>
                <Stack gap="2">
                  <Text fontWeight="700">Email *</Text>
                  <Input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (invalidTarget === "email") setInvalidTarget("") }} autoComplete="email" inputMode="email" placeholder="name@example.com" borderRadius="xl" h="52px" px="4" aria-invalid={invalidTarget === "email" || undefined} _focusVisible={{ borderColor: "var(--kh-color-primary)", boxShadow: "0 0 0 1px var(--kh-color-primary)" }} />
                  <FieldError message={invalidTarget === "email" ? "Add your email address." : undefined} />
                </Stack>
              </Box>
              <Box data-booking-field="phone" borderWidth={invalidTarget === "phone" ? "1px" : "0"} borderRadius="2xl" p={invalidTarget === "phone" ? "4" : "0"} {...(invalidTarget === "phone" ? errorBoxStyles : {})}>
                <Stack gap="2">
                  <Text fontWeight="700">Phone *</Text>
                  <Input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); if (invalidTarget === "phone") setInvalidTarget("") }} autoComplete="tel" inputMode="tel" placeholder="+27 71 234 5678" borderRadius="xl" h="52px" px="4" aria-invalid={invalidTarget === "phone" || undefined} _focusVisible={{ borderColor: "var(--kh-color-primary)", boxShadow: "0 0 0 1px var(--kh-color-primary)" }} />
                  <FieldError message={invalidTarget === "phone" ? "Add your phone number." : undefined} />
                </Stack>
              </Box>
            </SimpleGrid>

            <Stack gap="2">
              <Text fontWeight="700">Anything Kaykay should know?</Text>
              <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Tell us about your hair, preferred look, special requirements or anything that may help us prepare." minH="160px" borderRadius="xl" px="4" py="3.5" _focusVisible={{ borderColor: "var(--kh-color-primary)", boxShadow: "0 0 0 1px var(--kh-color-primary)" }} />
            </Stack>
          </Stack>
        ) : null}

        {step === 4 ? (
          <Stack gap="6">
            <Box>
              <Text fontSize="sm" fontWeight="700" color="var(--kh-color-primary)">STEP 5</Text>
              <Heading size="2xl" mt="1">Review & secure your booking.</Heading>
              <Text color="gray.600" mt="2">Your appointment is secured after the non-refundable deposit is successfully paid.</Text>
            </Box>

            <Box borderWidth="1px" borderRadius="3xl" overflow="hidden" bg="white">
              <Box px={{ base: "5", md: "6" }} py="5" bg="var(--kh-bg-pink-soft)" borderBottomWidth="1px" borderColor="var(--kh-color-pink-100)">
                <Flex justify="space-between" gap="5" align="start">
                  <Box>
                    <Text fontSize="xs" fontWeight="800" color="var(--kh-color-primary)" textTransform="uppercase" letterSpacing="0.08em">Your appointment</Text>
                    <Heading size="lg" mt="1">{selectedDate?.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" })}</Heading>
                    <HStack mt="2" gap="2" color="gray.700">
                      <FiClock />
                      <Text fontWeight="700">{time} · up to {Math.ceil(durationMinutes / 60)} hrs</Text>
                    </HStack>
                  </Box>
                  <Box w="12" h="12" flexShrink={0} borderRadius="full" bg="white" color="var(--kh-color-primary)" display="grid" placeItems="center" shadow="sm"><FiCalendar /></Box>
                </Flex>
              </Box>

              <Stack px={{ base: "5", md: "6" }} py="5" gap="4">
                {chosen.map((item) => item ? (
                  <Flex key={item.variant.slug} justify="space-between" gap="4" align="start">
                    <Box>
                      <Text fontWeight="800">{item.variant.name}</Text>
                      <Text fontSize="sm" color="gray.500">{item.service.title} · {item.variant.duration}</Text>
                    </Box>
                    <Text fontWeight="700" whiteSpace="nowrap">from {formatZar(item.variant.fromPrice ?? item.service.fromPrice)}</Text>
                  </Flex>
                ) : null)}
              </Stack>
            </Box>

            <Box borderWidth="1px" borderRadius="3xl" overflow="hidden">
              <SimpleGrid columns={{ base: 1, sm: 2 }}>
                <Box px={{ base: "5", md: "6" }} py={{ base: "5", md: "6" }} bg="var(--kh-color-primary)" color="white">
                  <Text fontSize="xs" fontWeight="800" textTransform="uppercase" letterSpacing="0.08em" opacity={0.8}>Due today</Text>
                  <Text mt="2" fontSize={{ base: "4xl", md: "5xl" }} lineHeight="1" fontWeight="900">{formatZar(depositAmount)}</Text>
                  <Text mt="3" fontSize="sm" opacity={0.86}>Non-refundable booking deposit</Text>
                </Box>
                <Box px={{ base: "5", md: "6" }} py={{ base: "5", md: "6" }} bg="white">
                  <Text fontSize="xs" fontWeight="800" color="gray.500" textTransform="uppercase" letterSpacing="0.08em">Estimated later balance</Text>
                  <Text mt="2" fontSize={{ base: "3xl", md: "4xl" }} lineHeight="1" fontWeight="900">{formatZar(estimatedBalance)}</Text>
                  <Text mt="3" fontSize="sm" color="gray.500">Estimated amount due after your service.</Text>
                </Box>
              </SimpleGrid>
              <Separator />
              <Stack px={{ base: "5", md: "6" }} py="4" gap="2">
                <Flex justify="space-between" gap="4">
                  <Text color="gray.600">Estimated service total</Text>
                  <Text fontWeight="800">from {formatZar(totalFromPrice)}</Text>
                </Flex>
                <Flex justify="space-between" gap="4">
                  <Text color="gray.600">Deposit applied to final balance</Text>
                  <Text fontWeight="800">− {formatZar(depositAmount)}</Text>
                </Flex>
              </Stack>
            </Box>

            <Box
              data-booking-field="deposit-policy"
              bg={invalidTarget === "deposit-policy" ? "red.50" : "var(--kh-bg-pink-soft)"}
              border="1px solid"
              borderColor={invalidTarget === "deposit-policy" ? "red.400" : "var(--kh-color-pink-100)"}
              boxShadow={invalidTarget === "deposit-policy" ? "0 0 0 3px rgba(239, 68, 68, 0.12)" : "none"}
              borderRadius="2xl"
              px={{ base: "5", md: "6" }}
              py={{ base: "5", md: "6" }}
            >
              <HStack align="start" gap="3">
                <Box mt="1" color={invalidTarget === "deposit-policy" ? "red.600" : "var(--kh-color-primary)"}><FiLock /></Box>
                <Box>
                  <Text fontWeight="900">Deposit policy</Text>
                  <Text mt="1" fontSize="sm" color="gray.700">Your deposit secures the appointment and is deducted from the final service balance. The deposit is non-refundable. Rescheduling rules will be managed by the booking policy in admin.</Text>
                </Box>
              </HStack>
              <Box as="label" display="flex" gap="3" alignItems="start" mt="4" cursor="pointer">
                <input
                  type="checkbox"
                  checked={depositAccepted}
                  onChange={(e) => {
                    setDepositAccepted(e.target.checked)
                    if (e.target.checked && invalidTarget === "deposit-policy") setInvalidTarget("")
                  }}
                  style={{ marginTop: 4, width: 18, height: 18, accentColor: "var(--kh-color-primary)" }}
                />
                <Text fontSize="sm" fontWeight="700">I understand and accept that the booking deposit is non-refundable.</Text>
              </Box>
              <FieldError message={invalidTarget === "deposit-policy" ? "Confirm the deposit policy to continue to payment." : undefined} />
            </Box>

            <Button size="lg" minH="56px" px={{ base: "7", md: "9" }} borderRadius="full" bg="var(--kh-color-ink)" color="white" _hover={{ bg: "var(--kh-color-primary)" }} onClick={createDraft} disabled={isSavingDraft}>
              {isSavingDraft ? "Saving booking…" : <>Continue to pay {formatZar(depositAmount)} deposit <FiArrowRight /></>}
            </Button>
            <HStack justify="center" gap="2" color="gray.500">
              <FiLock />
              <Text textAlign="center" fontSize="xs">Secure payment and server-side slot locking connect in the backend phase.</Text>
            </HStack>
          </Stack>
        ) : null}
      </Box>

      {step < 4 ? (
        <Flex px={{ base: "5", md: "9" }} py={{ base: "4", md: "5" }} borderTopWidth="1px" justify="space-between" bg="white" gap="3">
          <Button variant="ghost" minH="46px" px={{ base: "5", md: "6" }} borderRadius="full" onClick={step === 0 ? onClose : back}><FiArrowLeft /> {step === 0 ? "Close" : "Back"}</Button>
          <Button minH="46px" px={{ base: "6", md: "8" }} borderRadius="full" bg="var(--kh-color-ink)" color="white" _hover={{ bg: "var(--kh-color-primary)" }} onClick={next}>Continue <FiArrowRight /></Button>
        </Flex>
      ) : (
        <Flex px={{ base: "5", md: "9" }} py={{ base: "4", md: "5" }} borderTopWidth="1px" bg="white">
          <Button variant="ghost" minH="46px" px={{ base: "5", md: "6" }} borderRadius="full" onClick={back}><FiArrowLeft /> Back</Button>
        </Flex>
      )}
    </Flex>
  )
}
