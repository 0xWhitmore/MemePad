import React from 'react';
import './App.css';
import { Web3Provider } from './contexts/Web3Context';
import Header from './components/Header';

function App() {
  return (
    <Web3Provider>
      <div className="App">
        <Header />
        <main className="main-content">
          <section className="hero">
            <h1>Create, Mint & Trade Meme NFTs</h1>
            <p>The ultimate platform for meme creators and collectors</p>
          </section>
        </main>
      </div>
    </Web3Provider>
  );
}

export default App;