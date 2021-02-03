import { Flex, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export const AddIconButton = ({...rest}) => (
  <Flex
    bg='#fff'
    w='4em'
    h='4em'
    mx='auto'
    boxShadow='inner'
    border='1px'
    borderColor='cool-gray.200'
    borderRadius='sm'
    justify="center"
    align="center"
  >
    <IconButton
      colorScheme='teal'
      aria-label='Add New Section'
      icon={<AddIcon {...rest}/>}
      boxShadow='md'

    />
  </Flex>
);
