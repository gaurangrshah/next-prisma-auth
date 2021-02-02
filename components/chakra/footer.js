import React from 'react'
import { Flex, Image, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex layerStyle='flexCenter' my="auto" border="1px solid red">
      <Link
        href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
        textAlign='center'
        mx='auto'
      >
        Powered by <Image src='/vercel.svg' alt='Vercel Logo' h='3' mx='auto' />
      </Link>
    </Flex>
  );
}

export default Footer
