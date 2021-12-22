import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { CHAINS } from 'constants/web3';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4],
});

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

export const getReducedAddress = (
  address?: string | null,
): string | null | undefined => {
  if (!address) {
    return address;
  }

  return `${address.substring(0, 5)}...${address.substring(
    address.length - 4,
  )}`;
};

export const getChainString = (chainId?: number): string => {
  if (!chainId || (chainId !== 1 && chainId !== 4)) {
    return '';
  }
  return CHAINS[chainId];
};
