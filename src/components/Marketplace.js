import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import MemeCard from './MemeCard';
import './Marketplace.css';

const Marketplace = () => {
  const { isConnected } = useWeb3();
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const mockMemes = [
    {
      id: 1,
      name: "Doge To The Moon",
      creator: "0x1234...5678",
      price: "0.5",
      imageUrl: "https://via.placeholder.com/300x200?text=Doge",
      isForSale: true
    },
    {
      id: 2,
      name: "Pepe Rare",
      creator: "0xabcd...efgh",
      price: "1.2",
      imageUrl: "https://via.placeholder.com/300x200?text=Pepe",
      isForSale: true
    },
    {
      id: 3,
      name: "Wojak Feels",
      creator: "0x9876...4321",
      price: "0.3",
      imageUrl: "https://via.placeholder.com/300x200?text=Wojak",
      isForSale: true
    },
    {
      id: 4,
      name: "Chad Yes",
      creator: "0xfedc...ba98",
      price: "0.8",
      imageUrl: "https://via.placeholder.com/300x200?text=Chad",
      isForSale: true
    },
    {
      id: 5,
      name: "Stonks Guy",
      creator: "0x5555...6666",
      price: "2.1",
      imageUrl: "https://via.placeholder.com/300x200?text=Stonks",
      isForSale: true
    },
    {
      id: 6,
      name: "Distracted Boyfriend",
      creator: "0x7777...8888",
      price: "1.5",
      imageUrl: "https://via.placeholder.com/300x200?text=Distracted",
      isForSale: true
    }
  ];

  useEffect(() => {
    const loadMemes = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setMemes(mockMemes);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading memes:', error);
        setLoading(false);
      }
    };

    loadMemes();
  }, []);

  const filteredAndSortedMemes = () => {
    let filtered = [...memes];
    
    if (filter !== 'all') {
      if (filter === 'low-price') {
        filtered = filtered.filter(meme => parseFloat(meme.price) < 1);
      } else if (filter === 'high-price') {
        filtered = filtered.filter(meme => parseFloat(meme.price) >= 1);
      }
    }

    filtered.sort((a, b) => {
      if (sortBy === 'price-low') {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortBy === 'price-high') {
        return parseFloat(b.price) - parseFloat(a.price);
      }
      return 0;
    });

    return filtered;
  };

  if (loading) {
    return (
      <div className="marketplace">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading awesome memes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="marketplace">
      <div className="marketplace-header">
        <h1>🎭 Meme Marketplace</h1>
        <p>Discover and collect unique meme NFTs</p>
      </div>

      <div className="marketplace-controls">
        <div className="filters">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Memes</option>
            <option value="low-price">Under 1 ETH</option>
            <option value="high-price">1 ETH & Above</option>
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="stats">
          <span>{filteredAndSortedMemes().length} memes available</span>
        </div>
      </div>

      {!isConnected && (
        <div className="connect-notice">
          <p>🔗 Connect your wallet to purchase memes</p>
        </div>
      )}

      <div className="memes-grid">
        {filteredAndSortedMemes().map(meme => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>

      {filteredAndSortedMemes().length === 0 && (
        <div className="no-memes">
          <h3>No memes found</h3>
          <p>Try adjusting your filters or check back later for new content!</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;