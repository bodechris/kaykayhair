"use client"

import {
  Box,
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react"
import { FiAlertCircle, FiCheck, FiInfo, FiX } from "react-icons/fi"

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
})

function ToastStatusIcon({ type }: { type?: string }) {
  const isError = type === "error"
  const isSuccess = type === "success"
  const isInfo = type === "info"

  const color = isError
    ? "var(--kh-color-danger)"
    : isSuccess
      ? "var(--kh-color-primary)"
      : isInfo
        ? "var(--kh-color-secondary)"
        : "var(--kh-color-black-2)"

  const background = isError
    ? "var(--kh-color-pink-50)"
    : isSuccess
      ? "var(--kh-color-pink-50)"
      : isInfo
        ? "var(--kh-color-blue-50)"
        : "var(--kh-bg-soft)"

  return (
    <Box
      flex="0 0 auto"
      width="38px"
      height="38px"
      borderRadius="999px"
      background={background}
      color={color}
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop="1px"
    >
      {isError ? (
        <FiAlertCircle size={18} strokeWidth={1.8} />
      ) : isSuccess ? (
        <FiCheck size={18} strokeWidth={1.9} />
      ) : (
        <FiInfo size={18} strokeWidth={1.8} />
      )}
    </Box>
  )
}

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster
        toaster={toaster}
        insetInline={{ base: "16px", md: "24px" }}
        insetBlockEnd={{ base: "16px", md: "24px" }}
      >
        {(toast) => {
          const isError = toast.type === "error"

          return (
            <Toast.Root
              width={{ base: "calc(100vw - 32px)", sm: "400px" }}
              maxWidth="420px"
              minHeight="unset"
              padding="16px 18px"
              gap="14px"
              alignItems="flex-start"
              background="#ffffff"
              color="var(--kh-color-black-2)"
              borderRadius="24px"
              border={isError
                ? "1px solid rgba(220, 53, 95, 0.16)"
                : "1px solid rgba(0, 0, 0, 0.08)"}
              boxShadow="0 18px 50px rgba(0, 0, 0, 0.12), 0 3px 12px rgba(0, 0, 0, 0.05)"
              overflow="hidden"
            >
              {toast.type === "loading" ? (
                <Box
                  flex="0 0 auto"
                  width="38px"
                  height="38px"
                  borderRadius="999px"
                  background="var(--kh-bg-soft)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Spinner size="sm" color="var(--kh-color-primary)" />
                </Box>
              ) : (
                <ToastStatusIcon type={toast.type} />
              )}

              <Stack gap="3px" flex="1" minWidth="0" paddingTop="1px">
                {toast.title && (
                  <Toast.Title
                    fontFamily="var(--kh-font-family-ui)"
                    fontSize="14px"
                    lineHeight="1.35"
                    fontWeight="700"
                    letterSpacing="-0.01em"
                    color={isError ? "var(--kh-color-danger)" : "var(--kh-color-black-1)"}
                  >
                    {toast.title}
                  </Toast.Title>
                )}

                {toast.description && (
                  <Toast.Description
                    fontFamily="var(--kh-font-family-body)"
                    fontSize="13px"
                    lineHeight="1.5"
                    fontWeight="500"
                    color={isError ? "var(--kh-color-pink-700)" : "var(--kh-color-grey-4)"}
                  >
                    {toast.description}
                  </Toast.Description>
                )}
              </Stack>

              {toast.action && (
                <Toast.ActionTrigger
                  alignSelf="center"
                  paddingInline="12px"
                  height="36px"
                  borderRadius="999px"
                  fontWeight="700"
                  color="var(--kh-color-primary)"
                  _hover={{ background: "var(--kh-color-pink-50)" }}
                >
                  {toast.action.label}
                </Toast.ActionTrigger>
              )}

              {toast.closable && (
                <Toast.CloseTrigger
                  top="10px"
                  right="10px"
                  width="30px"
                  height="30px"
                  borderRadius="999px"
                  color="var(--kh-color-grey-3)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="var(--kh-transition-fast)"
                  _hover={{
                    background: "var(--kh-bg-soft)",
                    color: "var(--kh-color-black-1)",
                  }}
                  aria-label="Close notification"
                >
                  <FiX size={15} />
                </Toast.CloseTrigger>
              )}
            </Toast.Root>
          )
        }}
      </ChakraToaster>
    </Portal>
  )
}
