//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721('NFTMarketplace', 'NFTM') {
        contractAddress = marketplaceAddress;
    }

    function mintToken(string memory tokenURI) public returns(uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    function transferNFT(uint256 tokenId, address to) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");
        require(to != address(0), "Invalid recipient address");
        safeTransferFrom(msg.sender, to, tokenId);
    }

    function listNFTForSale(uint256 tokenId, uint256 salePrice) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");
        require(salePrice > 0, "Sale price must be greater than 0");
        // implementation for listing NFTs for sale
    }

    function removeNFTFromSale(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");
        // implementation for removing NFTs from sale
    }

    function purchaseNFT(uint256 tokenId) public payable {
        // implementation for purchasing NFTs
    }

    function getNFT(uint256 tokenId) public view returns (NFT memory) {
        // implementation for getting NFTs
    }
}
