import React from 'react';
import './MemeCard.css';

const MemeCard = ({ meme }) => {
  return (
    <div className="meme-card">
      <div className="meme-image">
        <img src={meme.imageUrl} alt={meme.name} />
      </div>
      <div className="meme-info">
        <h3>{meme.name}</h3>
        <p className="meme-creator">by {meme.creator}</p>
        <div className="meme-price">
          <span>{meme.price} ETH</span>
        </div>
        <button className="buy-btn">Buy Now</button>
      </div>
    </div>
  );
};

export default MemeCard;