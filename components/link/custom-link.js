import React, { useState } from 'react';
import Link from "next/link"
import { Box, Button, Input, Link as ChLink } from '@chakra-ui/react';
// import { Link } from '@/chakra/components/link/next-link';

const CustomLink = () => {
  const [linkState, setLinkState] = useState({
    link: '',
    isSubmitted: false,
    showInput: false
  });

  const toggleInput = () =>
    setLinkState((prevState) => ({ ...prevState, showInput: !prevState.showInput }));

  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    const { value } = e.target.querySelector('input');
    setLinkState((prevState) => ({
      ...prevState,
      isSubmitted: true,
      showInput: false,
      link: value
    }));
  };

  const { showInput, isSubmitted, link } = linkState;

  if (!showInput && !isSubmitted) {
    return (
      <Button p={2} variant="outline" cursor="pointer" onClick={toggleInput} color="inherit">
        🔗
      </Button>
    );
  }

  if (!isSubmitted && showInput) {
    return (
      <Box as="form" onSubmit={handleSubmit}>
        <Input type="text" onBlur={toggleInput} placeholder="/<any-path>" />
      </Box>
    );
  }
  if (isSubmitted) {
    return (
      <Link href={`/${link}`}>
        <ChLink textTransform="capitalize" cursor="pointer">
          {link}
        </ChLink>
      </Link>
    );
  }
};

export default CustomLink;
