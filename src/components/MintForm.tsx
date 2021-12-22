import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';

type Props = {
  limit: number;
  onMint: (amount: number) => void;
};

const MintForm: FC<Props> = ({ limit, onMint }) => {
  const [amount, setAmount] = useState<number>(1);

  const handleMintAmount = (_: string, value: number) => {
    setAmount(value);
  };

  const handleMint = () => {
    onMint(amount);
  };

  return (
    <Flex direction="column">
      <FormControl>
        <FormLabel htmlFor="tokenAmount">Select the number of tokens</FormLabel>
        <NumberInput
          isDisabled={limit === 0}
          id="tokenAmount"
          value={amount}
          min={1}
          max={limit}
          onChange={handleMintAmount}
          mb={4}
        >
          <NumberInputField data-testid="token-amount" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <Button isDisabled={limit === 0} onClick={handleMint}>
        Mint
      </Button>
    </Flex>
  );
};

export default MintForm;
