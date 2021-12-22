import React from 'react';

import { useWeb3React } from '@web3-react/core';
import Mint from 'pages/Mint';
import {
  getPresaleInfo,
  getPublicSaleInfo,
  getSVSMax,
  getTotalSupply,
  isUserInPresale,
  getPresalePurchasedCount,
  getPresalePurchaseLimit,
  getMaxPerTransaction,
} from 'contracts/SVS';

import { render, waitFor } from '../testUtils';

jest.mock('@web3-react/core');
jest.mock('contracts/SVS');

describe('Mint page', () => {
  beforeEach(() => {
    (useWeb3React as jest.Mock).mockReturnValue({
      account: '0x0d844a351B7E90F42a1313c8782B110Cac26fb6e',
      chainId: 4,
      library: 'test-provider',
    });
    (getSVSMax as jest.Mock).mockReturnValueOnce(
      new Promise((resolve) => resolve(100)),
    );
    (getTotalSupply as jest.Mock).mockReturnValueOnce(
      new Promise((resolve) => resolve(10)),
    );
    (getPublicSaleInfo as jest.Mock).mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(false);
      }),
    );
    (getPresalePurchaseLimit as jest.Mock).mockReturnValueOnce(
      new Promise((resolve) => resolve(5)),
    );
    (getMaxPerTransaction as jest.Mock).mockReturnValueOnce(
      new Promise((resolve) => resolve(5)),
    );
    (getPresalePurchasedCount as jest.Mock).mockReturnValueOnce(
      new Promise((resolve) => resolve(2)),
    );
  });

  it('should render page correctly', () => {
    (getPresaleInfo as jest.Mock).mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(false);
      }),
    );
    (isUserInPresale as jest.Mock).mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(false);
      }),
    );
    const { getByText } = render(<Mint />);

    expect(getByText(/marketing window/i)).toBeInTheDocument();
  });

  describe('should show different UI if presale is open', () => {
    beforeEach(() => {
      (getPresaleInfo as jest.Mock).mockReturnValueOnce(
        new Promise((resolve) => {
          resolve(true);
        }),
      );
    });

    it('should show not whitelisted if the user is not in the presale list', async () => {
      (isUserInPresale as jest.Mock).mockReturnValueOnce(
        new Promise((resolve) => {
          resolve(false);
        }),
      );
      const { getByText } = render(<Mint />);

      await waitFor(() =>
        expect(getByText(/presale is live!/i)).toBeInTheDocument(),
      );
      await waitFor(() =>
        expect(
          getByText(/you are not whitelisted in presale/i),
        ).toBeInTheDocument(),
      );
    });

    it('should show mintable amounts if the user is in the presale list', async () => {
      (isUserInPresale as jest.Mock).mockReturnValueOnce(
        new Promise((resolve) => {
          resolve(true);
        }),
      );
      const { getByText, getByTestId } = render(<Mint />);

      await waitFor(() =>
        expect(getByText(/presale is live!/i)).toBeInTheDocument(),
      );
      await waitFor(() =>
        expect(getByTestId('presale-amounts')).toBeInTheDocument(),
      );
      expect(getByTestId('presale-amounts')).toHaveTextContent(
        '5 NFTs (3) left',
      );
    });
  });
});
