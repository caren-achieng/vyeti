const hre = require("hardhat");

async function main() {
  const CredentialsRegistry = await hre.ethers.getContractFactory(
    "CredentialsRegistry"
  );
  const registry = await CredentialsRegistry.deploy();
  await registry.deployed();
  console.log("Credentials registry deployed to:", registry.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
