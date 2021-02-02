import React, { useRef } from 'react'
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react'

import { Burger } from './burger'

export const DrawerMenu = ({
  isOpen,
  onOpen,
  onClose,
  children,
  Logo,
  title,
  ...rest
}) => {
  // const color = useColor();
  const ref = useRef()
  return (
    <>
      <Button
        ref={ref}
        colorScheme="green"
        onClick={isOpen ? onClose : onOpen}
        display={['inline-block', null, null, 'none']}
        ml="auto"
      >
        <Burger />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        isFullHeight
        finalFocusRef={ref}
      >
        <DrawerOverlay zIndex={8} />
        <DrawerContent color={`lightgray`} zIndex={9}>
          <DrawerCloseButton />
          <DrawerHeader border="none" color="inherit">
            {Logo ? <Logo title={title} /> : title}
          </DrawerHeader>

          <DrawerBody color="inherit">{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
