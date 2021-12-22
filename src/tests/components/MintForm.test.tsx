import React from 'react';
import MintForm from 'components/MintForm';

import { render, act, fireEvent, waitFor } from '../testUtils';

describe('<MintForm />', () => {
  it('renders the mint form correctly', () => {
    const handleMint = jest.fn();
    const { getByText, getByTestId } = render(
      <MintForm limit={2} onMint={handleMint} />,
    );

    expect(getByText(/mint/i)).toBeInTheDocument();
    expect(getByText(/select the number of token/i)).toBeInTheDocument();
    expect(getByTestId('token-amount')).toBeInTheDocument();
  });

  it('renders mint button as disabled if limit = 0', () => {
    const handleMint = jest.fn();
    const { getByText } = render(<MintForm limit={0} onMint={handleMint} />);

    expect(getByText(/mint/i)).toHaveAttribute('disabled');
  });

  it('should work with mint callback if everything is good to go', async () => {
    const handleMint = jest.fn();
    const { getByText, getByTestId } = render(
      <MintForm limit={2} onMint={handleMint} />,
    );

    act(() => {
      fireEvent.input(getByTestId('token-amount'), {
        target: {
          value: '1',
        },
      });

      fireEvent.click(getByText(/mint/i));
    });

    await waitFor(() => expect(handleMint).toHaveBeenCalledWith(1));
  });
});
