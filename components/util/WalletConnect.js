import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Button from "@mui/material/Button";

export default function WalletConnect(props) {
  const providerOptions = {
    torus: {
      package: Torus, // required
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: process.env.PROJECT_ID, // Required
      },
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "Vyeti", // Required
        infuraId: process.env.PROJECT_ID, // Required
      },
    },
  };

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
