import { Button, Flex, StyleProps, Text } from '@chakra-ui/react';
import React, { FC, useCallback } from 'react';
import Container from 'components/Container';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { getChainString, getReducedAddress, injected } from 'utils/web3';

const Navbar: FC<StyleProps> = (props) => {
  const { activate, account, chainId } = useWeb3React<Web3Provider>();

  const handleConnect = useCallback(() => {
    activate(injected);
  }, [activate]);

  return (
    <Container p="0" bg="white" boxShadow="base" {...props}>
      <Flex p={2} alignItems="center" justifyContent="space-between">
        <Text as="h1" fontWeight="bold">
          SVS minting dApp
        </Text>
        <Flex alignItems="center">
          <Text mr={2} fontWeight="semibold">
            {getChainString(chainId)}
          </Text>
          <Button colorScheme="blue" onClick={handleConnect}>
            {getReducedAddress(account) ?? 'Connect'}
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
