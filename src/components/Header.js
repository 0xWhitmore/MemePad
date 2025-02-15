import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import './Header.css';

const Header = () => {
  const { account, isConnected, isConnecting, connect } = useWeb3();

  const formatAccount = (account) => {
    if (!account) return '';
    return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
  };

  return (
    <header className="header">
      <div className="logo">
        <h2>🎭 MemePad</h2>
      </div>
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#create">Create</a>
        <a href="#marketplace">Marketplace</a>
      </nav>
      <div className="wallet-section">
        {isConnected ? (
          <div className="wallet-info">
            <span className="account">{formatAccount(account)}</span>
          </div>
        ) : (
          <button 
            className="connect-wallet-btn" 
            onClick={connect}
            disabled={isConnecting}
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;