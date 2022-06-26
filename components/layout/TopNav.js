import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function TopNav() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: "#F4FFFD"}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize:30, color:"black"}}>
            VYETI
          </Typography>
            <Typography fontSize={20} fontWeight={400} sx={{ color: "black" }}>Welcome, Baranaba</Typography>
            <Typography sx={{ color: "#fff" }}>Log in</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
