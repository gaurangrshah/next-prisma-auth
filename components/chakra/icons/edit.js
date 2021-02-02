import { Box } from '@chakra-ui/react';

export const EditIcon = ({...rest}) => {
  return (
    <Box
      as='svg'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 19 19'
      width='19'
      height='19'
      fill='none'
      color="inherit"
      {...rest}
    >
      <path
        d='M15.988 0.0121212L18.9882 3.01243L16.7013 5.29917L13.7011 2.29886L15.988 0.0121212Z'
        fill='currentColor'
      />
      <path
        d='M5 14H8L15.287 6.713L12.287 3.713L5 11V14Z'
        fill='currentColor'
      />
      <path
        d='M16 17H5.158C5.132 17 5.105 17.01 5.079 17.01C5.046 17.01 5.013 17.001 4.979 17H2V3H8.847L10.847 1H2C0.897 1 0 1.896 0 3V17C0 18.104 0.897 19 2 19H16C17.104 19 18 18.104 18 17V8.332L16 10.332V17Z'
        fill='currentColor'
      />
    </Box>
  );
}

