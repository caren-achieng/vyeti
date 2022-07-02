import axios from "axios";
import jwt from "jsonwebtoken";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Button from "@mui/material/Button";
import providerOptions from "../../lib/providerOptions";

export default function WalletLogin() {
  const [error, setError] = useState("");
  const router = useRouter();

  const loginWithWallet = async () => {
    try {
      const web3Modal = new Web3Modal({ providerOptions });
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const address = await (await signer.getAddress()).toString();
      console.log(address);
      const credentials = {
        wallet: address,
      };
      const res = await axios.post("/api/auth/login", credentials);
      const token = res.data.token;
      const account = jwt.decode(token);
      console.log(account);
      if (account.type === "provider") {
        router.push("/dashboard/provider");
      }
      if (account.type === "employer") {
        router.push("/dashboard/employer");
      }
      if (account.type === "earner") {
        router.push("/dashboard/earner");
      }
    } catch (err) {
      console.log(err);
      setError(
        "No account exists with that address: Register to create account "
      );
    }
  };
  return (
    <Button
      variant="outlined"
      color="inherit"
      sx={{ m: 1 }}
      onClick={loginWithWallet}
    >
      Log in with Wallet
    </Button>
  );
}
