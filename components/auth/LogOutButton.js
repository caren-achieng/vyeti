import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import PopUpAlert from "../util/PopUpAlert";
import Cookies from "js-cookie";

export default function LogOutButton() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const logOut = async () => {
    try {
      await axios.post("/api/auth/logout");
      setSuccess(true);
      setOpen(true);
      Cookies.remove("authenticated");
      setMessage("Logging out... ");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="inherit" sx={{ m: 1 }} onClick={logOut}>
        Log Out
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
