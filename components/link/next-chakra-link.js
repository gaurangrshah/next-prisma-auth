import {
  Button,
  chakra,
  Link as ChakraLink,
  shouldForwardProp,
} from "@chakra-ui/react";
import Link from 'next/link'

const NextLink = chakra(Link, {
  shouldForwardProp: (prop) => {
    // don't forward Chakra's props
    const isChakraProp = !shouldForwardProp(prop);
    if (isChakraProp) return false;

    // else, only forward `sample` prop
    return ["href", 'passHref', 'children'].includes(prop);
  },
});

export const SimpleNextLink = ({ href, children, ...rest }) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink
        {...rest}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}

export const SimpleNextButtonLink = ({
  href,
  children,
  ...rest
}) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink
        as={Button}
        _hover={{
          textDecoration: 'none',
        }}
        {...rest}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}
