import React from 'react'
import { Icon } from '@chakra-ui/react'

export const Burger = ({ ...props }) => {
  return (
    <Icon
      fill={`green.200`}
      width="20px"
      viewBox="0 0 20 20"
      cursor="pointer"
      display={['inline-block', null, null, 'none']}
      _hover={{
        transform: `scale(1.2)`,
      }}
      {...props}
    >
      {/* <title>Menu</title> */}
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </Icon>
  )
}
