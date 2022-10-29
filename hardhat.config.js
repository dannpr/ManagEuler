require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const ALCHEMY_API_KEY = "y9Hwv9sPpVTdg653ZwbBEJQTiwHTmCQw";
const GOERLI_PRIVATE_KEY = "aed18517b02566597ac057394f9ab24468c5f31215030ac25df06448db7d909e";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: "./artifacts",
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: '7F9FANI79KMS5W817Z41IXA12NIT1UWPKE',
  },
};
