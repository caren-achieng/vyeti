import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function ProviderForm(props) {
  return (
    <div>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.category}
          label="Category"
          onChange={(e) => props.setCategory(e.target.value)}
        >
          <MenuItem value={"Higher-Education"}>Higher Education</MenuItem>
          <MenuItem value={"Professional-Assosiation"}>
            Professinal Association
          </MenuItem>
          <MenuItem value={"Training-Provider"}>Training Provider</MenuItem>
          <MenuItem value={"Bootcamp"}>Bootcamp</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="institutionname"
        label="Institution name"
        variant="outlined"
        fullWidth
        sx={{ m: 1 }}
        value={props.institutionname}
        onChange={(e) => props.setInstitutionName(e.target.value)}
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
    </div>
  );
}
