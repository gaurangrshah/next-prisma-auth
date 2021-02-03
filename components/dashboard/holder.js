import {Box} from "@chakra-ui/react"

export const Holder = ({ listItem = false, children, ...rest }) => {
  return (
    // <Box
    //   as={listItem && 'li'}
    //   w='full'
    //   mx='auto'
    //   p={6}
    //   borderRadius='md'
    //   listStyleType='none'
    // >
      <Box
        p={3}
        py={4}
        my={0}
        bg='rgba(244, 244, 244, 0.7)'
        border='0.25px solid transparent'
        boxShadow='inset'
        borderRadius='md'
        cursor='pointer'
        transition='border 0.75s easeinout'
        // _hover={{
        //   border: "0.5px solid",
        //   borderColor: "teal.100",
        // }}
        _active={{
          // bg: "rgba(244, 244, 244, 0.4)",
          // border: "0.5px solid",
          // borderColor: "teal.500",
          cursor: "grab",
        }}
        {...rest}
      >
        {children}
      </Box>
    // </Box>
  );
};
