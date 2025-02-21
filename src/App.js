import React, { useState } from 'react';
import './App.css';
import { Web3Provider } from './contexts/Web3Context';
import Header from './components/Header';
import UploadMeme from './components/UploadMeme';

function App() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <Web3Provider>
      <div className="App">
        <Header />
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
              <button className="cta-button secondary">
                Explore Marketplace
              </button>
            </div>
          </section>
        </main>
        
        {showUpload && (
          <UploadMeme onClose={() => setShowUpload(false)} />
        )}
      </div>
    </Web3Provider>
  );
}

export default App;