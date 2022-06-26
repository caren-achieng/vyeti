import React from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Button from "@mui/material/Button";
import providerOptions from "../../lib/providerOptions";

export default function WalletConnect(props) {
  const connectWallet = async () => {
    const web3Modal = new Web3Modal({ providerOptions });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    props.setWalletAddress(address);
  };
  return (
    <Button variant="outlined" fullWidth sx={{ m: 1 }} onClick={connectWallet}>
      Connect Wallet
    </Button>
  );
}
