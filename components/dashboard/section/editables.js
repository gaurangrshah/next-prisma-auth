import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

export const Editables = ({ children, ...rest }) => {
  return (
    <Box as='span'>
      <Editable
        colorScheme='blackAlpha'
        borderBottom='1px solid lightgray'
        {...rest}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
      {children}
    </Box>
  );
};
