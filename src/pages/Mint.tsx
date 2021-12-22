import React, { FC, useEffect, useMemo, useState } from 'react';
import MintForm from 'components/MintForm';
import Container from 'components/Container';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Flex, Text } from '@chakra-ui/react';
import {
  getPresaleInfo,
  getPublicSaleInfo,
  getSVSMax,
  getTotalSupply,
  isUserInPresale,
  getPresalePurchasedCount,
  getPresalePurchaseLimit,
  getMaxPerTransaction,
  mintPresale,
  mint,
} from 'contracts/SVS';

const Mint: FC = () => {
  const { chainId, library, account } = useWeb3React<Web3Provider>();
  const [maxNumberOfTokens, setMaxNumberOfTokens] = useState<number>();
  const [totalSupply, setTotalSupply] = useState<number>();
  const [isPresale, setPresale] = useState<boolean>(false);
  const [isPublicSale, setPublicSale] = useState<boolean>(false);
  const [isInPresale, setInPresale] = useState<boolean>(false);
  const [presaleMints, setPresaleMints] = useState<number>(0);
  const [presaleLimit, setPresaleLimit] = useState<number>(0);
  const [maxPerTransaction, setMaxPerTransaction] = useState<number>(1);

  useEffect(() => {
    if (library && chainId) {
      getSVSMax(library, chainId).then(setMaxNumberOfTokens);
      getTotalSupply(library, chainId).then(setTotalSupply);
      getPresaleInfo(library, chainId).then(setPresale);
      getPublicSaleInfo(library, chainId).then(setPublicSale);
      getPresalePurchaseLimit(library, chainId).then(setPresaleLimit);
      getMaxPerTransaction(library, chainId).then(setMaxPerTransaction);
    }
  }, [chainId, library]);

  useEffect(() => {
    if (library && chainId && account) {
      isUserInPresale(library, chainId, account).then(setInPresale);
      getPresalePurchasedCount(library, chainId, account).then(setPresaleMints);
    }
  }, [chainId, library, account]);

  const saleStatus = useMemo(() => {
    if (isPresale) {
      return 'Presale is live!';
    }
    if (isPublicSale) {
      return 'Public sale is live!';
    }
    return 'Marketing window';
  }, [isPresale, isPublicSale]);

  const maxLimit = useMemo(() => {
    if (isPresale && isInPresale) {
      return Math.max(presaleLimit - presaleMints, 0);
    }
    if (isPublicSale) {
      return Math.max(maxPerTransaction, 1);
    }
    return 0;
  }, [
    isPresale,
    isInPresale,
    isPublicSale,
    maxPerTransaction,
    presaleLimit,
    presaleMints,
  ]);

  const handleMint = (amount: number) => {
    if (!library || !chainId) {
      return;
    }
    if (isPresale && isInPresale) {
      mintPresale(amount, library, chainId);
    } else if (isPublicSale) {
      mint(amount, library, chainId);
    }
  };

  return (
    <Container height="full" display="flex">
      <Flex
        direction="column"
        boxShadow="base"
        p={8}
        bg="white"
        borderRadius="md"
        minW="xl"
      >
        <Text fontSize={20} mb={4}>
          {saleStatus}
        </Text>
        {isPresale &&
          (isInPresale ? (
            <Text fontSize={20} mb={4} data-testid="presale-amounts">
              Presale users can mint up to {presaleLimit} NFTs (
              {presaleLimit - presaleMints}) left
            </Text>
          ) : (
            <Text fontSize={18} mb={4}>
              You are not whitelisted in Presale
            </Text>
          ))}
        {isPublicSale && (
          <>
            <Text fontSize={20} mb={4}>
              You can mint up to {maxPerTransaction} NFTs per transaction
            </Text>
            <Text fontSize={20} mb={4}>
              {totalSupply}/{maxNumberOfTokens} minted
            </Text>
          </>
        )}
        <MintForm limit={maxLimit} onMint={handleMint} />
      </Flex>
    </Container>
  );
};

export default Mint;
