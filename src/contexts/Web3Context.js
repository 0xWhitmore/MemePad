import React, { createContext, useContext, useState, useEffect } from 'react';
import { connectWallet, getAccount, checkConnection } from '../utils/web3';

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      const connected = await checkConnection();
      if (connected) {
        const currentAccount = getAccount();
        setAccount(currentAccount);
        setIsConnected(true);
      }
    };

    checkWalletConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setAccount(null);
          setIsConnected(false);
        } else {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    try {
      const result = await connectWallet();
      if (result.success) {
        setAccount(result.account);
        setIsConnected(true);
      } else {
        console.error('Connection failed:', result.error);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setIsConnected(false);
  };

  const value = {
    account,
    isConnected,
    isConnecting,
    connect,
    disconnect,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};