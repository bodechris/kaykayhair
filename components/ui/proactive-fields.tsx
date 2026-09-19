"use client"

import { useMemo, useState } from "react"
import { Box, Button, Flex, HStack, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { FiCalendar, FiCheck, FiClock } from "react-icons/fi"

const focusStyles = {
  borderColor: "var(--kh-color-primary)",
  boxShadow: "0 0 0 1px var(--kh-color-primary)",
}

export function formatHumanDate(date: Date) {
  return date.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
}

export function toLocalDateInput(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function GuidedDateField({
  value,
  onChange,
  minDaysFromNow = 0,
  maxDaysFromNow = 365,
  suggestions = 6,
  invalid,
}: {
  value?: string
  onChange: (value: string) => void
  minDaysFromNow?: number
  maxDaysFromNow?: number
  suggestions?: number
  invalid?: boolean
}) {
  const dates = useMemo(() => {
    const start = new Date()
    start.setHours(12, 0, 0, 0)
    return Array.from({ length: suggestions }, (_, index) => {
      const date = new Date(start)
      date.setDate(date.getDate() + minDaysFromNow + index)
      return date
    })
  }, [minDaysFromNow, suggestions])

  const minDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + minDaysFromNow)
    return toLocalDateInput(date)
  }, [minDaysFromNow])

  const maxDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + maxDaysFromNow)
    return toLocalDateInput(date)
  }, [maxDaysFromNow])

  return (
    <Stack gap="3">
      <Flex gap="2" overflowX="auto" pb="1" css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
        {dates.map((date) => {
          const key = toLocalDateInput(date)
          const selected = value === key
          return (
            <Button
              key={key}
              type="button"
              flex="0 0 auto"
              minW="116px"
              h="auto"
              px="4"
              py="3.5"
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={selected ? "var(--kh-color-primary)" : "gray.200"}
              bg={selected ? "var(--kh-bg-pink-soft)" : "white"}
              color="var(--kh-color-ink)"
              onClick={() => onChange(key)}
              _hover={{ borderColor: "var(--kh-color-pink-200)", bg: "var(--kh-bg-pink-soft)" }}
              _focusVisible={{ outline: "3px solid var(--kh-color-pink-200)", outlineOffset: "2px" }}
            >
              <Stack gap="0" align="start" w="full">
                <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing=".06em">
                  {date.toLocaleDateString("en-ZA", { weekday: "short" })}
                </Text>
                <HStack justify="space-between" w="full" gap="3">
                  <Text fontWeight="800">{date.toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}</Text>
                  {selected ? <FiCheck /> : null}
                </HStack>
              </Stack>
            </Button>
          )
        })}
      </Flex>

      <Box position="relative">
        <Box position="absolute" left="4" top="50%" transform="translateY(-50%)" color="gray.500" pointerEvents="none"><FiCalendar /></Box>
        <Input
          type="date"
          value={value ?? ""}
          min={minDate}
          max={maxDate}
          onChange={(event) => onChange(event.target.value)}
          h="52px"
          pl="11"
          pr="4"
          borderRadius="xl"
          aria-invalid={invalid || undefined}
          _focusVisible={focusStyles}
        />
      </Box>
      <Text fontSize="xs" color="gray.500">Choose one of the upcoming dates, or pick another future date.</Text>
    </Stack>
  )
}

export function GuidedTimeField({
  value,
  onChange,
  startHour = 7,
  endHour = 20,
  intervalMinutes = 60,
  invalid,
}: {
  value?: string
  onChange: (value: string) => void
  startHour?: number
  endHour?: number
  intervalMinutes?: number
  invalid?: boolean
}) {
  const [showCustom, setShowCustom] = useState(false)
  const times = useMemo(() => {
    const values: string[] = []
    for (let minutes = startHour * 60; minutes <= endHour * 60; minutes += intervalMinutes) {
      const hh = String(Math.floor(minutes / 60)).padStart(2, "0")
      const mm = String(minutes % 60).padStart(2, "0")
      values.push(`${hh}:${mm}`)
    }
    return values
  }, [startHour, endHour, intervalMinutes])

  const commonTimes = times.filter((_, index) => index % Math.max(1, Math.floor(120 / intervalMinutes)) === 0)

  return (
    <Stack gap="3">
      <SimpleGrid columns={{ base: 2, sm: 4 }} gap="2">
        {commonTimes.map((time) => {
          const selected = value === time
          const hour = Number(time.slice(0, 2))
          const period = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening"
          return (
            <Button
              key={time}
              type="button"
              h="auto"
              minH="64px"
              px="4"
              py="3"
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={selected ? "var(--kh-color-ink)" : "gray.200"}
              bg={selected ? "var(--kh-color-ink)" : "white"}
              color={selected ? "white" : "var(--kh-color-ink)"}
              justifyContent="flex-start"
              onClick={() => { onChange(time); setShowCustom(false) }}
              _hover={{ borderColor: selected ? "var(--kh-color-ink)" : "var(--kh-color-pink-200)", transform: "translateY(-1px)" }}
              _focusVisible={{ outline: "3px solid var(--kh-color-pink-200)", outlineOffset: "2px" }}
            >
              <Stack gap="0" align="start">
                <Text fontWeight="850">{time}</Text>
                <Text fontSize="xs" opacity={selected ? 0.7 : 0.55}>{period}</Text>
              </Stack>
            </Button>
          )
        })}
      </SimpleGrid>

      <Button
        type="button"
        variant="ghost"
        alignSelf="start"
        px="0"
        minH="auto"
        color="var(--kh-color-primary)"
        fontSize="sm"
        onClick={() => setShowCustom((current) => !current)}
      >
        {showCustom ? "Hide custom time" : "Need another time?"}
      </Button>

      {showCustom ? (
        <Box position="relative" maxW="260px">
          <Box position="absolute" left="4" top="50%" transform="translateY(-50%)" color="gray.500" pointerEvents="none"><FiClock /></Box>
          <Input
            type="time"
            value={value ?? ""}
            min={`${String(startHour).padStart(2, "0")}:00`}
            max={`${String(endHour).padStart(2, "0")}:00`}
            step={intervalMinutes * 60}
            onChange={(event) => onChange(event.target.value)}
            h="52px"
            pl="11"
            pr="4"
            borderRadius="xl"
            aria-invalid={invalid || undefined}
            _focusVisible={focusStyles}
          />
        </Box>
      ) : null}
      <Text fontSize="xs" color="gray.500">Times are shown in 24-hour format so there is no AM/PM ambiguity.</Text>
    </Stack>
  )
}
