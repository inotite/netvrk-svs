import SVS from './SVS.json';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

export const getContract = (
  provider: Web3Provider,
  chainId: number,
): Contract => {
  if (!chainId || chainId !== 4) {
    throw 'Invalid network';
  }

  const { abi, networks } = SVS;

  const { address } = networks[chainId];
  const contract = new Contract(address, abi, provider);
  return contract;
};

export const getSVSMax = async (provider: Web3Provider, chainId: number) => {
  try {
    const contract = getContract(provider, chainId);
    const maxSVS = await contract.SVS_MAX();
    return maxSVS.toNumber();
  } catch (e) {
    throw e;
  }
};

export const getMaxPerTransaction = async (
  provider: Web3Provider,
  chainId: number,
) => {
  try {
    const contract = getContract(provider, chainId);
    const maxSVS = await contract.SVS_PER_MINT();
    return maxSVS.toNumber();
  } catch (e) {
    throw e;
  }
};

export const getTotalSupply = async (
  provider: Web3Provider,
  chainId: number,
) => {
  try {
    const contract = getContract(provider, chainId);
    const totalSupply = await contract.totalSupply();
    return totalSupply.toNumber();
  } catch (e) {
    throw e;
  }
};

export const getPresaleInfo = async (
  provider: Web3Provider,
  chainId: number,
) => {
  try {
    const contract = getContract(provider, chainId);
    return contract.presaleLive();
  } catch (e) {
    throw e;
  }
};

export const getPublicSaleInfo = async (
  provider: Web3Provider,
  chainId: number,
) => {
  try {
    const contract = getContract(provider, chainId);
    return contract.saleLive();
  } catch (e) {
    throw e;
  }
};

export const isUserInPresale = async (
  provider: Web3Provider,
  chainId: number,
  account?: string,
) => {
  try {
    const contract = getContract(provider, chainId);
    return contract.isPresaler(account);
  } catch (e) {
    throw e;
  }
};

export const getPresalePurchasedCount = async (
  provider: Web3Provider,
  chainId: number,
  account?: string,
) => {
  try {
    const contract = getContract(provider, chainId);
    const count = await contract.presalePurchasedCount(account);
    return count.toNumber();
  } catch (e) {
    throw e;
  }
};

export const getPresalePurchaseLimit = async (
  provider: Web3Provider,
  chainId: number,
) => {
  try {
    const contract = getContract(provider, chainId);
    const count = await contract.presalePurchaseLimit();
    return count.toNumber();
  } catch (e) {
    throw e;
  }
};

export const mintPresale = async (
  amount: number,
  provider: Web3Provider,
  chainId: number,
) => {
  try {
    const contract = getContract(provider, chainId);
    const price = await contract.SVS_PRICE();
    const withSigner = contract.connect(provider.getSigner());
    const { wait } = await withSigner.presaleBuy(amount, {
      value: price.mul(amount),
    });
    const { events } = await wait();
    return events;
  } catch (e) {
    throw e;
  }
};

export const mint = async (
  amount: number,
  provider: Web3Provider,
  chainId: number,
) => {
  try {
    const contract = getContract(provider, chainId);
    const price = await contract.SVS_PRICE();
    const withSigner = contract.connect(provider.getSigner());
    const { wait } = await withSigner.buy(amount, {
      value: price.mul(amount),
    });
    const { events } = await wait();
    return events;
  } catch (e) {
    throw e;
  }
};
