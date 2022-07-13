import React from "react";
import Alert from "@mui/material/Alert";

export default function ErrorDisplay({ errors }) {
  return (
    <div>
      {errors && errors.length > 0
        ? errors.map((error, index) => (
            <Alert key={index} severity="error" sx={{ m: 1, width: "100%" }}>
              {error.message}
            </Alert>
          ))
        : null}
    </div>
  );
}
