import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function TopNav() {
  return (
    <Box sx={{ flexGrow: 1, height:40 }}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: "#F4FFFD"}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize:20, color:"black", mt:-2}}>
            VYETI
          </Typography>
            <Typography fontSize={17} fontWeight={400} sx={{ color: "black", mt:-2 }}>Welcome, Baranaba</Typography>
            <Typography sx={{ color: "#fff" }}>Log in</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
