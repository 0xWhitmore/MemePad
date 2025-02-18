// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MemePadNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    struct MemeData {
        string name;
        string description;
        address creator;
        uint256 price;
        bool isForSale;
        uint256 royaltyPercentage;
    }
    
    mapping(uint256 => MemeData) public memes;
    mapping(address => uint256[]) public creatorMemes;
    
    event MemeMinted(uint256 indexed tokenId, address indexed creator, string name, uint256 price);
    event MemeListedForSale(uint256 indexed tokenId, uint256 price);
    event MemeSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);
    
    constructor() ERC721("MemePad NFT", "MEME") {}
    
    function mintMeme(
        string memory _name,
        string memory _description,
        string memory _tokenURI,
        uint256 _price,
        uint256 _royaltyPercentage
    ) public returns (uint256) {
        require(_royaltyPercentage <= 10, "Royalty cannot exceed 10%");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        
        memes[newTokenId] = MemeData({
            name: _name,
            description: _description,
            creator: msg.sender,
            price: _price,
            isForSale: _price > 0,
            royaltyPercentage: _royaltyPercentage
        });
        
        creatorMemes[msg.sender].push(newTokenId);
        
        emit MemeMinted(newTokenId, msg.sender, _name, _price);
        
        if (_price > 0) {
            emit MemeListedForSale(newTokenId, _price);
        }
        
        return newTokenId;
    }
    
    function listForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender, "You don't own this meme");
        require(_price > 0, "Price must be greater than 0");
        
        memes[_tokenId].price = _price;
        memes[_tokenId].isForSale = true;
        
        emit MemeListedForSale(_tokenId, _price);
    }
    
    function removeFromSale(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "You don't own this meme");
        
        memes[_tokenId].isForSale = false;
        
    }
    
    function buyMeme(uint256 _tokenId) public payable {
        require(memes[_tokenId].isForSale, "This meme is not for sale");
        require(msg.value >= memes[_tokenId].price, "Insufficient payment");
        
        address seller = ownerOf(_tokenId);
        require(seller != msg.sender, "Cannot buy your own meme");
        
        uint256 price = memes[_tokenId].price;
        uint256 royaltyAmount = (price * memes[_tokenId].royaltyPercentage) / 100;
        uint256 sellerAmount = price - royaltyAmount;
        
        memes[_tokenId].isForSale = false;
        
        _transfer(seller, msg.sender, _tokenId);
        
        if (royaltyAmount > 0) {
            payable(memes[_tokenId].creator).transfer(royaltyAmount);
        }
        
        payable(seller).transfer(sellerAmount);
        
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
        
        emit MemeSold(_tokenId, seller, msg.sender, price);
    }
    
    function getMemeData(uint256 _tokenId) public view returns (MemeData memory) {
        return memes[_tokenId];
    }
    
    function getCreatorMemes(address _creator) public view returns (uint256[] memory) {
        return creatorMemes[_creator];
    }
    
    function getTotalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}