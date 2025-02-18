const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying MemePadNFT contract...");

  const MemePadNFT = await ethers.getContractFactory("MemePadNFT");
  const memePadNFT = await MemePadNFT.deploy();

  await memePadNFT.deployed();

  console.log("MemePadNFT deployed to:", memePadNFT.address);

  console.log("Contract deployed successfully!");
  console.log("Contract address:", memePadNFT.address);
  console.log("Network:", network.name);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });