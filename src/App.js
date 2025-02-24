import React, { useState } from 'react';
import './App.css';
import { Web3Provider } from './contexts/Web3Context';
import Header from './components/Header';
import UploadMeme from './components/UploadMeme';
import Marketplace from './components/Marketplace';

function App() {
  const [showUpload, setShowUpload] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    if (currentPage === 'marketplace') {
      return <Marketplace />;
    }
    
    return (
      <main className="main-content">
        <section className="hero">
          <h1>Create, Mint & Trade Meme NFTs</h1>
          <p>The ultimate platform for meme creators and collectors</p>
          <div className="hero-actions">
            <button 
              className="cta-button primary"
              onClick={() => setShowUpload(true)}
            >
              Create Meme NFT
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => setCurrentPage('marketplace')}
            >
              Explore Marketplace
            </button>
          </div>
        </section>
      </main>
    );
  };

  return (
    <Web3Provider>
      <div className="App">
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        {renderPage()}
        
        {showUpload && (
          <UploadMeme onClose={() => setShowUpload(false)} />
        )}
      </div>
    </Web3Provider>
  );
}

export default App;