import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Button from "@mui/material/Button";
import providerOptions from "../../lib/providerOptions";
import PopUpAlert from "../util/PopUpAlert";
import Cookies from "js-cookie";

export default function WalletLogin() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
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
      Cookies.set("authenticated", true, { expires: 30 });
      setSuccess(true);
      setOpen(true);
      setMessage("Success! Logging you in... ");
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
      setOpen(true);
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
      <PopUpAlert
        open={open}
        success={success}
        message={message}
        setOpen={setOpen}
      />
    </div>
  );
}
