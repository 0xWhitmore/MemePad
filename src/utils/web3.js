import Web3 from 'web3';

let web3;
let accounts = [];

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      web3 = new Web3(window.ethereum);
      accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      return {
        success: true,
        account: accounts[0],
      };
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  } else {
    return {
      success: false,
      error: 'MetaMask not installed',
    };
  }
};

const getAccount = () => {
  return accounts.length > 0 ? accounts[0] : null;
};

const getWeb3 = () => {
  return web3;
};

const checkConnection = async () => {
  if (window.ethereum && web3) {
    try {
      accounts = await web3.eth.getAccounts();
      return accounts.length > 0;
    } catch (error) {
      console.error('Failed to check connection:', error);
      return false;
    }
  }
  return false;
};

export {
  connectWallet,
  getAccount,
  getWeb3,
  checkConnection,
};