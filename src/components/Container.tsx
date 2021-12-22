import { Box, StyleProps } from '@chakra-ui/react';
import React, { FC } from 'react';

const Container: FC<StyleProps> = ({ children, ...props }) => {
  return (
    <Box p={8} {...props}>
      <Box maxW="7xl" mx="auto">
        {children}
      </Box>
    </Box>
  );
};

export default Container;
