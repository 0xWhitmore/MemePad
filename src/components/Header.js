import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import './Header.css';

const Header = ({ onNavigate, currentPage }) => {
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
        <button 
          className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
        >
          Home
        </button>
        <button 
          className={`nav-link ${currentPage === 'marketplace' ? 'active' : ''}`}
          onClick={() => onNavigate('marketplace')}
        >
          Marketplace
        </button>
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