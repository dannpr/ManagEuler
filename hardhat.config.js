require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: "./artifacts",
  },
  networks: {
    goerli: {
      url: process.env.ALCHEMY_API_KEY,
      accounts: [`0x${process.env.GOERLI_PRIVATE_KEY}`],
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
