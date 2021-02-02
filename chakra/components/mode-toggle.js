import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export const ModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const toggle = () => toggleColorMode()

  return (
    <IconButton
      size="lg"
      position="fixed"
      bottom="10em"
      right="4"
      onClick={toggle}
      color={`mode.${colorMode}.text`}
      border={`1px solid`}
      borderColor={`mode.${colorMode}.text`}
      aria-label="toggle dark mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      zIndex={10}
    />
  )
}
