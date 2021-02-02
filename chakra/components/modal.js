import React from 'react'
import {
  Button,
  Modal as Mdl,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

export const CHModal = ({
  title = '',
  children,
  footer,
  isOpen,
  onOpen,
  onClose,
  hasSubmit,
  ...rest
}) => {
  return (
    <>
      <Mdl
        isOpen={isOpen}
        onClose={onClose}
        border="2px solid blue"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent position="absolute" top={'5%'} left={'30%'}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            {footer}
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {hasSubmit && (
              <Button type="submit" variant="ghost">
                Submit
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Mdl>
    </>
  )
}
