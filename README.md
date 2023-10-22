# erc20-token
This branch contains two contracts:
- GLDToken.sol which extends the ERC20Capped contract
- GLDTokenOwner.sol which extends the ERC20Capped and Ownable contracts.

1. Clone the repository
2. In the project root create a file .env and add:
   
    `PRIVATE_KEY="your_private_key"`
   
    `INFURA_SEPOLIA_ENDPOINT="your_infura_sepolia_api_key"`
4.  Install the project dependencies: `npm install`
5.  Compile the contracts: `npx hardhat compile`
6.  Test the contract GLDToken: `npx hardhat test test/GLDToken_test.ts --typecheck`
    Test the contract GLDTokeOwner: `npx hardhat test test/GLDTokenOwner_test.ts --typecheck`
    Test all the contracts: `npx hardhat test`
7.  Deploy the GLDToken contract: `npx hardhat run scripts/deployGLDToken.ts --network sepolia`
    Deploy the GLDTokenOwner contract: `npx hardhat run scripts/deployGLDTokenOwner.ts --network sepolia`
