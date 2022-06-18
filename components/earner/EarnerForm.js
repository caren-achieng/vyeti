import React from "react";
import TextField from "@mui/material/TextField";

export default function EarnerForm(props) {
  return (
    <div>
      <TextField
        id="first-name"
        label="First name"
        variant="outlined"
        fullWidth
        sx={{ m: 1 }}
        value={props.firstname}
        onChange={(e) => props.setFirstName(e.target.value)}
      />
      <TextField
        id="last-name"
        label="Last name"
        variant="outlined"
        fullWidth
        sx={{ m: 1 }}
        value={props.lastname}
        onChange={(e) => props.setLastName(e.target.value)}
      />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        fullWidth
        sx={{ m: 1 }}
        value={props.email}
        onChange={(e) => props.setEmail(e.target.value)}
      />
    </div>
  );
}
