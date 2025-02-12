import React from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <section className="hero">
          <h1>Create, Mint & Trade Meme NFTs</h1>
          <p>The ultimate platform for meme creators and collectors</p>
        </section>
      </main>
    </div>
  );
}

export default App;