import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import './UploadMeme.css';

const UploadMeme = ({ onClose }) => {
  const { account, isConnected } = useWeb3();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    royalty: 5,
    image: null
  });
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToIPFS = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer YOUR_PINATA_JWT_TOKEN`
        },
        body: formData
      });

      const data = await response.json();
      return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!formData.image) {
      alert('Please select an image');
      return;
    }

    setUploading(true);

    try {
      const imageUrl = await uploadToIPFS(formData.image);
      
      if (!imageUrl) {
        alert('Failed to upload image to IPFS');
        return;
      }

      const metadata = {
        name: formData.name,
        description: formData.description,
        image: imageUrl,
        attributes: [
          {
            trait_type: "Creator",
            value: account
          },
          {
            trait_type: "Type",
            value: "Meme NFT"
          }
        ]
      };

      const metadataBlob = new Blob([JSON.stringify(metadata)], {
        type: 'application/json'
      });
      
      const metadataUrl = await uploadToIPFS(metadataBlob);
      
      if (!metadataUrl) {
        alert('Failed to upload metadata to IPFS');
        return;
      }

      alert('Meme uploaded successfully! (This would mint the NFT in a real implementation)');
      onClose();
      
    } catch (error) {
      console.error('Error creating meme:', error);
      alert('Failed to create meme');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-overlay">
      <div className="upload-modal">
        <div className="modal-header">
          <h2>Upload Your Meme</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="image-upload-section">
            <div className="image-preview">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" />
              ) : (
                <div className="placeholder">
                  <span>📸</span>
                  <p>Click to upload image</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="file-label">
              Choose Image
            </label>
          </div>

          <div className="form-fields">
            <div className="field-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter meme name"
                required
              />
            </div>

            <div className="field-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your meme..."
                rows={3}
              />
            </div>

            <div className="field-row">
              <div className="field-group">
                <label>Price (ETH)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.1"
                  step="0.001"
                  min="0"
                />
              </div>

              <div className="field-group">
                <label>Royalty (%)</label>
                <select
                  name="royalty"
                  value={formData.royalty}
                  onChange={handleInputChange}
                >
                  <option value="0">0%</option>
                  <option value="2.5">2.5%</option>
                  <option value="5">5%</option>
                  <option value="7.5">7.5%</option>
                  <option value="10">10%</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={uploading} className="submit-btn">
              {uploading ? 'Uploading...' : 'Create Meme NFT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadMeme;