import React from 'react'
import { Box, useDisclosure } from '@chakra-ui/react'
import { DrawerMenu } from './drawer-menu'

import { SimpleNextLink } from '@/components/link/next-chakra-link'
import { useNavState } from '../contexts/nav-context'

const getPageLink = (page) => `${
                page?.title?.toLowerCase() === 'home'
                  ? page.path
                  : page?.prefix
                  ? page.prefix + page.path
                  : page.path
              }`


const NavLink = ({ href = '#', title = '', idx = 0, children, ...rest }) => {
  return (
    <SimpleNextLink {...{ href }} className="nav-link" children={children || title} {...rest} />
  );
}

export const Nav = ({ title, Logo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { nav } = useNavState()
  const { pages, controls } = nav
  return (
    <>
      <Box as="nav" layerStyle={'header.desktop'}>
        {pages?.map((page, i) => {
          return <NavLink key={i} idx={i} href={getPageLink(page)} title={page.title} />
        })}
        {controls?.length &&
          controls.map((Component, i) => <Component key={i} />)}
      </Box>
      <DrawerMenu
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={title}
        {...{ Logo }}
      >
        <Box as="nav" layerStyle="header.mobile">
          {pages?.map((page, i) => {
            return (
              <NavLink
                key={i}
                idx={i}
                href={getPageLink(page)}
                title={page.title}
                onClick={onClose}
              />
            );
          })}
        </Box>
      </DrawerMenu>
    </>
  )
}
