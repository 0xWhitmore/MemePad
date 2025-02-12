import React from 'react';
import './Header.css';

const Header = () => {
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
        <button className="connect-wallet-btn">Connect Wallet</button>
      </div>
    </header>
  );
};

export default Header;