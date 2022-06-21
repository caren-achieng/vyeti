const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Credentials Registry", function () {
  it("Should create and issue credentials", async function () {
    const RegistryContract = await ethers.getContractFactory(
      "CredentialsRegistry"
    );
    const registryContract = await RegistryContract.deploy();
    await registryContract.deployed();

    await registryContract.createCredentialToken(
      "https://www.credential-location4.com"
    );
    await registryContract.createCredentialToken(
      "https://www.credential-location4.com"
    );
    await registryContract.createCredentialToken(
      "https://www.credential-location4.com"
    );
    await registryContract.createCredentialToken(
      "https://www.credential-location4.com"
    );
    await registryContract.createCredentialToken(
      "https://www.credential-location4.com"
    );
    await registryContract.createCredentialToken(
      "https://www.credential-location4.com"
    );

    const [_, firstReceiverAddress] = await ethers.getSigners();

    await registryContract.connect(firstReceiverAddress).claimCredential(1);

    let allcredentials = await registryContract.fetchAllCredentials();

    let unclaimedcredentials =
      await registryContract.fetchUnclaimedCredentials();

    allcredentials = await Promise.all(
      allcredentials.map(async (i) => {
        const tokenUri = await registryContract.tokenURI(i.tokenId);
        let credential = {
          tokenId: i.tokenId.toString(),
          issuer: i.issuer,
          owner: i.owner,
          tokenUri,
        };

        return credential;
      })
    );

    unclaimedcredentials = await Promise.all(
      unclaimedcredentials.map(async (i) => {
        const tokenUri = await registryContract.tokenURI(i.tokenId);
        let credential = {
          tokenId: i.tokenId.toString(),
          issuer: i.issuer,
          owner: i.owner,
          tokenUri,
        };

        return credential;
      })
    );

    let fetchedCredential = await registryContract.fetchCredentialById(1);
    let addressCredentials = await registryContract.fetchCredentialsByOwner(
      firstReceiverAddress.address
    );

    fetchedCredential = await Promise.all(
      fetchedCredential.map(async (i) => {
        const tokenUri = await registryContract.tokenURI(i.tokenId);
        let credential = {
          tokenId: i.tokenId.toString(),
          issuer: i.issuer,
          owner: i.owner,
          tokenUri,
        };

        return credential;
      })
    );

    addressCredentials = await Promise.all(
      addressCredentials.map(async (i) => {
        const tokenUri = await registryContract.tokenURI(i.tokenId);
        let credential = {
          tokenId: i.tokenId.toString(),
          issuer: i.issuer,
          owner: i.owner,
          tokenUri,
        };

        return credential;
      })
    );

    console.log("all credentials : ", allcredentials);
    console.log("unclaimed credentials : ", unclaimedcredentials);
    console.log("fetched credential : ", fetchedCredential);
    console.log("credentials owned by adress : ", addressCredentials);
  });
});
