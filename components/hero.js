import { Box } from '@chakra-ui/react';

export const Hero = ({bgimg, children, ...rest}) => {
  return (
    <Box
      className='hero-next'
      bgImage={`url(${bgimg})`}
      children={children}
      // {...heroStyles}
      layerStyle="heroContainer"
      {...rest}
    />
  );
}
