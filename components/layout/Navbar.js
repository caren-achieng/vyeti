import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: "#4D776D"}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize:30}}>
            VYETI
          </Typography>
            <Button sx={{ color: "#fff" }}>Log in with wallet</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
