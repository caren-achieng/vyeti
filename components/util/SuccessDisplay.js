import React from "react";
import Alert from "@mui/material/Alert";

export default function SuccessDisplay({ success, message }) {
  return (
    <div>
      {success ? (
        <Alert severity="success" sx={{ m: 1, width: "100%" }}>
          {message}
        </Alert>
      ) : null}
    </div>
  );
}
