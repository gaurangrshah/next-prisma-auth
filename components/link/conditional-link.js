import React from 'react';
import NextLink from 'next/link';
import {Box, Link as CHLink} from "@chakra-ui/react"
import {external} from "./utils"

export const ConditionalLink = ({ nextAs, href, children, ...rest }) => {
  if (!nextAs && external(href)) {
    return (
      // if link is external render a chakra link
      <Box as={CHLink} href={href} isExternal {...rest}>
        {children}
      </Box>
    );
  }

  return (
    // render as internal link using next for routing and chakra for styling
    <NextLink href={href} passHref as={nextAs}>
      <Box as={CHLink} {...rest}>
        {children}
      </Box>
    </NextLink>
  );
};
