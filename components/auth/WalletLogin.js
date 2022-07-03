import axios from "axios";
import jwt from "jsonwebtoken";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import providerOptions from "../../lib/providerOptions";

export default function WalletLogin() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
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
      setSuccess(true);
      handleOpen();
      setMessage("Log in Success ");
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
      setSuccess(false);
      handleOpen();
      setMessage(
        "No account exists with that address: Register to create account "
      );
    }
  };
  return (
    <div>
      <Button
        variant="outlined"
        color="inherit"
        sx={{ m: 1 }}
        onClick={loginWithWallet}
      >
        Log in with Wallet
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
