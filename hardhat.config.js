require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "y9Hwv9sPpVTdg653ZwbBEJQTiwHTmCQw";
const GOERLI_PRIVATE_KEY = "aed18517b02566597ac057394f9ab24468c5f31215030ac25df06448db7d909e";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
