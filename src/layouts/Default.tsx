import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import Navbar from './Navbar';

const DefaultLayout: FC = ({ children }) => {
  return (
    <Box minW="100vw" minH="100vh" bg="gray.50">
      <Navbar />
      {children}
    </Box>
  );
};

export default DefaultLayout;
