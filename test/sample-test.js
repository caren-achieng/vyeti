const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Credentials Registry", function () {
  it("Should create and issue credentials", async function () {
    const RegistryContract = await ethers.getContractFactory(
      "CredentialsRegistry"
    );
    const registryContract = await RegistryContract.deploy();
    await registryContract.deployed();
    const registryContractAddress = registryContract.address;

    const CredentialContract = await ethers.getContractFactory("Credential");
    const credentialContract = await CredentialContract.deploy(
      registryContractAddress
    );
    await credentialContract.deployed();
    const credentialContractAddress = credentialContract.address;

    await credentialContract.createToken(
      "https://www.credential-location1.com"
    );
    await credentialContract.createToken(
      "https://www.credential-location2.com"
    );
    await credentialContract.createToken(
      "https://www.credential-location3.com"
    );
    await credentialContract.createToken(
      "https://www.credential-location4.com"
    );
    await credentialContract.createToken(
      "https://www.credential-location5.com"
    );
    await credentialContract.createToken(
      "https://www.credential-location6.com"
    );

    await registryContract.createCredential(credentialContractAddress, 1);
    await registryContract.createCredential(credentialContractAddress, 2);
    await registryContract.createCredential(credentialContractAddress, 3);
    await registryContract.createCredential(credentialContractAddress, 4);
    await registryContract.createCredential(credentialContractAddress, 5);
    await registryContract.createCredential(credentialContractAddress, 6);

    const [_, firstReceiverAddress] = await ethers.getSigners();

    await registryContract
      .connect(firstReceiverAddress)
      .claimCredential(credentialContractAddress, 1);

    let allcredentials = await registryContract.fetchAllCredentials();

    let unclaimedcredentials =
      await registryContract.fetchUnclaimedCredentials();

    allcredentials = await Promise.all(
      allcredentials.map(async (i) => {
        const tokenUri = await credentialContract.tokenURI(i.tokenId);
        let credential = {
          tokenId: i.tokenId.toString(),
          credentialId: i.credentialId.toString(),
          issuer: i.issuer,
          owner: i.owner,
          tokenUri,
        };

        return credential;
      })
    );

    unclaimedcredentials = await Promise.all(
      unclaimedcredentials.map(async (i) => {
        const tokenUri = await credentialContract.tokenURI(i.tokenId);
        let credential = {
          tokenId: i.tokenId.toString(),
          credentialId: i.credentialId.toString(),
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
        const tokenUri = await credentialContract.tokenURI(i.tokenId);
        let credential = {
          tokenId: i.tokenId.toString(),
          credentialId: i.credentialId.toString(),
          issuer: i.issuer,
          owner: i.owner,
          tokenUri,
        };

        return credential;
      })
    );

    addressCredentials = await Promise.all(
      addressCredentials.map(async (i) => {
        const tokenUri = await credentialContract.tokenURI(i.tokenId);
        let credential = {
          tokenId: i.tokenId.toString(),
          credentialId: i.credentialId.toString(),
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
