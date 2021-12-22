# SVS NFT minting dApp on Rinkeby Testnet

## Technical stack

- Smart contract is deployed to `Rinkeby` testnet (written in `Solidity`).
- Front end minting dApp is written in `React.js`, `Typescript`, `ethers.js`, `@web3-react`, and tests are written in `Jest` and `React Testing Library`.
- Project bundling and build is done using `webpack`.
- Code formatting using `eslint` and `prettier`.

## How to setup the project on local

- You should run `yarn` or `yarn install` in the root folder.
- `yarn start` to start the dApp and check `http://localhost:8080` (webpack default).
- `yarn build` to build the project.
- `yarn test` to run the unit testing.

## Minimal instruction

Project is designed to be running on `Rinkeby` testnet and the dApp simply shows the contract status and let the user `mint` NFTs.

There are 3 states in the smart contract:

- Marketing window (Users cannot mint NFT at this point).
- Presale window (You should toggle presale in the smart contract on [SVS contract](`https://rinkeby.etherscan.io/address/0x5844Bd08322754bDFd28C8aa6Fc51BCea07A39ca`)). Users can mint if they are whitelisted (you can ask me whitelisting if you want) in the presale.
- Public window (Anyone can mint)

You can connect your wallet using the `Connect` button at the top right corner.
