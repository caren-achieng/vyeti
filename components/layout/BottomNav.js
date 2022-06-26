import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function BottomNav() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: "#4D776D"}}>
            <Button sx={{ flexGrow:1, color: "#fff" }}>Dashboard</Button>
            <Button sx={{ flexGrow:1, color: "#fff" }}>settings</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
