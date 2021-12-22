import React from 'react';
import Navbar from 'layouts/Navbar';

import { useWeb3React } from '@web3-react/core';

import { render } from '../testUtils';
import { CHAINS } from 'constants/web3';

jest.mock('@web3-react/core');

describe('<Navbar />', () => {
  it('should render the component correctly', () => {
    (useWeb3React as jest.Mock).mockReturnValueOnce({
      account: '0x0d844a351B7E90F42a1313c8782B110Cac26fb6e',
      chainId: 4,
      activate: jest.fn(),
    });

    const { getByText } = render(<Navbar />);

    expect(getByText(/SVS minting dApp/i)).toBeInTheDocument();
    expect(getByText(CHAINS[4])).toBeInTheDocument();
    expect(getByText(/0x0d8...fb6e/i)).toBeInTheDocument();
  });
});
