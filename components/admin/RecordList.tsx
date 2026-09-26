import { Badge, Box, Flex, Stack, Text } from "@chakra-ui/react"

export type AdminRecord = {
  id: string
  title: string
  subtitle?: string
  badge?: string
  details?: Array<{ label: string; value: string }>
}

export default function RecordList({ records, emptyMessage }: { records: AdminRecord[]; emptyMessage: string }) {
  if (!records.length) {
    return (
      <Box bg="white" border="1px solid #ebe8ec" borderRadius="26px" p={{ base: 6, md: 8 }} color="#746d77">
        {emptyMessage}
      </Box>
    )
  }

  return (
    <Stack gap="3">
      {records.map((record) => (
        <Box key={record.id} bg="white" border="1px solid #ebe8ec" borderRadius="24px" p={{ base: 5, md: 6 }}>
          <Flex justify="space-between" gap="4" align="flex-start" wrap="wrap">
            <Box minW="0">
              <Text fontWeight="800" fontSize="17px">{record.title}</Text>
              {record.subtitle ? <Text mt="1" color="#746d77" fontSize="13px">{record.subtitle}</Text> : null}
            </Box>
            {record.badge ? <Badge bg="#f8edf2" color="#a61c4f" borderRadius="999px" px="3" py="1" textTransform="none">{record.badge}</Badge> : null}
          </Flex>
          {record.details?.length ? (
            <Flex mt="4" pt="4" borderTop="1px solid #f0ecef" gap="6" wrap="wrap">
              {record.details.map((detail) => (
                <Box key={`${record.id}-${detail.label}`} minW="120px">
                  <Text fontSize="10px" color="#9b929f" fontWeight="800" textTransform="uppercase" letterSpacing=".08em">{detail.label}</Text>
                  <Text mt="1" fontSize="13px" fontWeight="700">{detail.value}</Text>
                </Box>
              ))}
            </Flex>
          ) : null}
        </Box>
      ))}
    </Stack>
  )
}
