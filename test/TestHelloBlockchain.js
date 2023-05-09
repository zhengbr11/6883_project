const NFTMarketplace = artifacts.require("NFTMarketplace");
// const Web3 = require('web3');
// const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
contract("NFTMarketplace", accounts => {
  let nftMarketplace;
  const tokenId = 1;
  const name = "Test NFT";
  const description = "This is a test NFT";
  const tokenURI = "https://example.com/nft/1";
  const salePrice = "1000000000000000000";

  beforeEach(async () => {
    nftMarketplace = await NFTMarketplace.new();
  });

  it("should create a new NFT", async () => {
    await nftMarketplace.createNFT(tokenId, name, description, tokenURI, { from: accounts[0] });

    const nft = await nftMarketplace.getNFT(tokenId);
    assert.equal(nft.name, name, "NFT name does not match");
    assert.equal(nft.description, description, "NFT description does not match");
    assert.equal(nft.owner, accounts[0], "NFT owner does not match");
  });

  it("should transfer ownership of an NFT", async () => {
    // ... (similar to the previous test)
    await nftMarketplace.createNFT(tokenId, name, description, tokenURI, { from: accounts[0] });

    await nftMarketplace.transferNFT(tokenId, accounts[1], { from: accounts[0] });

    const updatedNFT = await nftMarketplace.getNFT(tokenId);
    assert.equal(updatedNFT.owner, accounts[1], "NFT owner was not transferred");
  });

  // ... (continue with the other test cases, adapting the assertions as needed)
  it("should list an NFT for sale", async () => {
    await nftMarketplace.createNFT(tokenId, name, description, tokenURI, { from: accounts[0] });

    await nftMarketplace.listNFTForSale(tokenId, salePrice, { from: accounts[0] });

    const nft = await nftMarketplace.getNFT(tokenId);
    assert.equal(nft.salePrice.toString(), salePrice, "NFT sale price does not match");
  });

  it("should remove an NFT from sale", async () => {
    await nftMarketplace.createNFT(tokenId, name, description, tokenURI, { from: accounts[0] });
    await nftMarketplace.listNFTForSale(tokenId, salePrice, { from: accounts[0] });

    await nftMarketplace.removeNFTFromSale(tokenId, { from: accounts[0] });

    const nft = await nftMarketplace.getNFT(tokenId);
    assert.equal(nft.salePrice.toString(), '0', "NFT sale price was not removed");
  });

  it("should execute a successful NFT purchase", async () => {
    await nftMarketplace.createNFT(tokenId, name, description, tokenURI, { from: accounts[0] });
    await nftMarketplace.listNFTForSale(tokenId, salePrice, { from: accounts[0] });

    const purchaseAmount = web3.utils.toWei("1", "ether");
    await nftMarketplace.purchaseNFT(tokenId, { from: accounts[1], value: purchaseAmount });

    const updatedNFT = await nftMarketplace.getNFT(tokenId);
    assert.equal(updatedNFT.owner, accounts[1], "NFT owner was not updated");
  });

  it("should not execute an unsuccessful NFT purchase", async () => {
    await nftMarketplace.createNFT(tokenId, name, description, tokenURI, { from: accounts[0] });
    await nftMarketplace.listNFTForSale(tokenId, salePrice, { from: accounts[0] });

    const incorrectAmount = web3.utils.toWei("0.5", "ether");
    try {
      await nftMarketplace.purchaseNFT(tokenId, { from: accounts[1], value: incorrectAmount });
    } catch (error) {
      assert(error.message.includes("revert"), "NFT purchase did not revert");
    }

    const nft = await nftMarketplace.getNFT(tokenId);
    assert.equal(nft.owner, accounts[0], "NFT owner was changed");
  });
});