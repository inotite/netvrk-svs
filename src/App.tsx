import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from 'utils/web3';
import { ChakraProvider } from '@chakra-ui/react';
import DefaultLayout from 'layouts/Default';
import { useEagerConnect } from 'hooks/useEagerConnect';
import { useInactiveListener } from 'hooks/useInactiveListener';
import Mint from 'pages/Mint';

const App: React.FC = () => {
  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager);

  return (
    <DefaultLayout>
      <Mint />
    </DefaultLayout>
  );
};

export default function () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider resetCSS>
        <App />
      </ChakraProvider>
    </Web3ReactProvider>
  );
}
