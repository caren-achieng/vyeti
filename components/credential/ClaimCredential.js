import React from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Button from "@mui/material/Button";
import { credentialsRegistryAddress } from "../../config";
import CredentialRegistry from "../../lib/CredentialsRegistry.json";

export default function ClaimCredential({ credentialId }) {
  async function handleClaim() {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      let contract = new ethers.Contract(
        credentialsRegistryAddress,
        CredentialRegistry.abi,
        signer
      );

      let transaction = await contract.claimCredential(credentialId);

      let tx = await transaction.wait();

      let event = tx.events[0];

      console.log("Success", event);
    } catch (error) {
      console.log("An error occured", error);
    }
  }
  return (
    <Button fullWidth variant="contained" onClick={handleClaim}>
      Claim
    </Button>
  );
}
