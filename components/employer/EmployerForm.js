import React from "react";
import TextField from "@mui/material/TextField";

export default function EmployerForm(props) {
  return (
    <div>
      <TextField
        id="organizationname"
        label="Organization name"
        variant="outlined"
        fullWidth
        sx={{ m: 1 }}
        value={props.organizationname}
        onChange={(e) => props.setOrganizationName(e.target.value)}
      />
      <TextField
        id="fullname"
        label="Your full name"
        variant="outlined"
        fullWidth
        sx={{ m: 1 }}
        value={props.fullname}
        onChange={(e) => props.setFullName(e.target.value)}
      />
      <TextField
        id="email"
        label="Organization email"
        variant="outlined"
        fullWidth
        sx={{ m: 1 }}
        value={props.email}
        onChange={(e) => props.setEmail(e.target.value)}
      />
      <TextField
        id="phone"
        label="Phone number"
        variant="outlined"
        fullWidth
        sx={{ m: 1 }}
        value={props.phonenumber}
        onChange={(e) => props.setPhoneNumber(e.target.value)}
      />
      <TextField
        id="physicalladdress"
        label="Physical Address"
        variant="outlined"
        fullWidth
        sx={{ m: 1 }}
        value={props.physicaladdress}
        onChange={(e) => props.setPhysicalAddress(e.target.value)}
      />
    </div>
  );
}
