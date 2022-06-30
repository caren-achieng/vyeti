import React from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchCredential() {
  return (
    <div>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <TextField
          id="input-with-icon-textfield"
          label="Search for Individual's Credential"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
        />
      </Box>
    </div>
  );
}
