require("@nomiclabs/hardhat-waffle");
const projectId = '3a8353efa3b348f8a791fd6140f0e67b'
const fs = require('fs')
const keyData = fs.readFileSync('./p-key.txt', {
  encoding:'utf8', flag:'r'
})

module.exports = {
  defaultNetwork: 'hardhat',
  networks:{
    hardhat:{
      chainId: 1337 // config standard 
    },
    mumbai:{
      url:`https://polygon-mumbai.infura.io/v3/3a8353efa3b348f8a791fd6140f0e67b`,
      accounts:['0xf136408CcE69044d8256F2Bc1CB6192C5130e8EC']
    },
    mainnet: {
      url:`https://mainnet.infura.io/v3/3a8353efa3b348f8a791fd6140f0e67b`,
      accounts:['0xf136408CcE69044d8256F2Bc1CB6192C5130e8EC']
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
