import type { KaykayServiceSlug } from "@/app/services/services"

export type BookingQuestionType = "single" | "multi" | "text" | "textarea" | "yes-no" | "date" | "time"

export type BookingQuestion = {
  id: string
  label: string
  helpText?: string
  type: BookingQuestionType
  required?: boolean
  options?: string[]
  minDaysFromNow?: number
  maxDaysFromNow?: number
  startHour?: number
  endHour?: number
  intervalMinutes?: number
}

export type BookingRules = {
  minimumDeposit: number
  depositType: "fixed" | "percentage"
  depositValue: number
  leadTimeHours: number
  bookingHorizonDays: number
  bufferMinutes: number
  openingHour: number
  closingHour: number
  workingDays: number[]
}

export const defaultBookingRules: BookingRules = {
  minimumDeposit: 200,
  depositType: "fixed",
  depositValue: 300,
  leadTimeHours: 12,
  bookingHorizonDays: 60,
  bufferMinutes: 30,
  openingHour: 9,
  closingHour: 18,
  workingDays: [2, 3, 4, 5, 6], // Tue-Sat
}

export const serviceDepositOverrides: Partial<Record<KaykayServiceSlug, number>> = {
  braiding: 300,
  "bridal-event-hair": 500,
  "hair-care": 250,
  "wig-revamping-installations": 300,
  cornrows: 250,
  makeup: 250,
  "pedicure-manicure": 200,
}

const sharedHairQuestions: BookingQuestion[] = [
  {
    id: "hair-condition",
    label: "How would you describe your current hair condition?",
    type: "single",
    required: true,
    options: ["Healthy", "Dry", "Fragile / breaking", "Recently treated", "Not sure"],
  },
  {
    id: "sensitivities",
    label: "Do you have any scalp sensitivities, allergies, or concerns we should know about?",
    type: "textarea",
    helpText: "Optional. Please share anything that could affect your service.",
  },
]

export const serviceQuestions: Partial<Record<KaykayServiceSlug, BookingQuestion[]>> = {
  braiding: [
    {
      id: "braid-size",
      label: "What braid size would you like?",
      type: "single",
      required: true,
      options: ["Small", "Medium", "Large"],
    },
    {
      id: "braid-length",
      label: "What length would you like?",
      type: "single",
      required: true,
      options: ["Shoulder", "Mid-back", "Waist", "Extra long"],
    },
    {
      id: "bring-extensions",
      label: "Will you bring your own extensions?",
      type: "yes-no",
      required: true,
      options: ["Yes", "No"],
    },
    ...sharedHairQuestions,
  ],
  "bridal-event-hair": [
    {
      id: "event-type",
      label: "What type of event are you booking for?",
      type: "single",
      required: true,
      options: ["Wedding", "Traditional ceremony", "Birthday", "Photoshoot", "Formal event", "Other"],
    },
    {
      id: "event-date",
      label: "What date is your event?",
      type: "date",
      required: true,
      minDaysFromNow: 1,
      maxDaysFromNow: 540,
      helpText: "Choose an upcoming date. This helps us plan your service and any trial appointment around the event.",
    },
    {
      id: "event-time",
      label: "What time do you need to be fully ready by?",
      type: "time",
      required: true,
      startHour: 6,
      endHour: 22,
      intervalMinutes: 30,
      helpText: "Choose the time you need to be completely finished — not the time you expect to arrive.",
    },
    {
      id: "trial-needed",
      label: "Would you like us to discuss a trial appointment?",
      type: "yes-no",
      options: ["Yes", "No"],
    },
    ...sharedHairQuestions,
  ],
  "hair-care": [
    {
      id: "main-goal",
      label: "What is your main hair-care goal?",
      type: "multi",
      required: true,
      options: ["Moisture", "Strength", "Scalp health", "Breakage recovery", "Length retention", "General maintenance"],
    },
    ...sharedHairQuestions,
  ],
  "wig-revamping-installations": [
    {
      id: "wig-type",
      label: "What type of wig are we working with?",
      type: "single",
      required: true,
      options: ["Closure", "Frontal", "Glueless", "Machine-made", "Not sure"],
    },
    {
      id: "wig-condition",
      label: "Is the wig new or previously worn?",
      type: "single",
      required: true,
      options: ["New", "Previously worn", "Needs revamping", "Not sure"],
    },
    ...sharedHairQuestions,
  ],
  cornrows: [
    {
      id: "cornrow-use",
      label: "What are the cornrows for?",
      type: "single",
      required: true,
      options: ["Standalone style", "Wig base", "Protective style", "Event / special look"],
    },
    ...sharedHairQuestions,
  ],
  makeup: [
    {
      id: "makeup-finish",
      label: "What finish do you prefer?",
      type: "single",
      required: true,
      options: ["Natural", "Soft glam", "Full glam", "Not sure — advise me"],
    },
    {
      id: "skin-sensitivity",
      label: "Do you have skin sensitivities or product allergies?",
      type: "textarea",
      helpText: "Optional, but important if there are products we should avoid.",
    },
  ],
  "pedicure-manicure": [
    {
      id: "nail-removal",
      label: "Do you need existing gel, acrylic, or polish removed?",
      type: "single",
      required: true,
      options: ["No removal", "Gel removal", "Acrylic removal", "Regular polish removal"],
    },
    {
      id: "nail-art",
      label: "Would you like nail art?",
      type: "yes-no",
      required: true,
      options: ["Yes", "No"],
    },
  ],
}

export const getDepositForService = (slug: KaykayServiceSlug) =>
  Math.max(defaultBookingRules.minimumDeposit, serviceDepositOverrides[slug] ?? defaultBookingRules.depositValue)

export const formatZar = (value: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(value)

export const parseDurationToMinutes = (duration?: string) => {
  if (!duration) return 120
  const lower = duration.toLowerCase()
  const nums = lower.match(/\d+(?:\.\d+)?/g)?.map(Number) ?? []
  if (!nums.length) return 120
  const max = Math.max(...nums)
  return lower.includes("minute") ? Math.ceil(max) : Math.ceil(max * 60)
}

export const toDateKey = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export const getBookableDates = (days = 21) => {
  const now = new Date()
  const dates: Date[] = []
  for (let i = 1; i <= days * 2 && dates.length < days; i += 1) {
    const date = new Date(now)
    date.setDate(now.getDate() + i)
    if (defaultBookingRules.workingDays.includes(date.getDay())) dates.push(date)
  }
  return dates
}

export const getAvailableSlots = (date: Date, durationMinutes: number) => {
  const total = durationMinutes + defaultBookingRules.bufferMinutes
  const slots: string[] = []
  const open = defaultBookingRules.openingHour * 60
  const close = defaultBookingRules.closingHour * 60

  // Deterministic gaps make the frontend useful before the DB-backed availability engine is connected.
  const seed = date.getDate() + date.getMonth() * 31
  for (let minute = open; minute + total <= close; minute += 30) {
    const index = (minute - open) / 30
    const unavailable = (index + seed) % 5 === 1 || (index + seed) % 11 === 4
    if (unavailable) continue
    const hh = Math.floor(minute / 60)
    const mm = minute % 60
    slots.push(`${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`)
  }
  return slots
}
