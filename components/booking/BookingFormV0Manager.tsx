import React from 'react';
import { Button, Drawer, Portal, createOverlay } from "@chakra-ui/react"

interface DialogProps {
  title: string
  description?: string
  content?: React.ReactNode
  placement?: Drawer.RootProps["placement"]
}

function BookingFormV0Manager() {
  const drawer = createOverlay<DialogProps>((props) => {
  const { title, description, content, ...rest } = props
    return (
        <Drawer.Root {...rest}>
        <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
            <Drawer.Content>
                {title && (
                <Drawer.Header>
                    <Drawer.Title>{title}</Drawer.Title>
                </Drawer.Header>
                )}
                <Drawer.Body spaceY="4">
                {description && (
                    <Drawer.Description>{description}</Drawer.Description>
                )}
                {content}
                </Drawer.Body>
            </Drawer.Content>
            </Drawer.Positioner>
        </Portal>
        </Drawer.Root>
    )
    });
  return (
    <div>BookingFormV0Manager</div>
  )
}

export default BookingFormV0Manager