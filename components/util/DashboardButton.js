import React from "react";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function DashboardButton({ link }) {
  return (
    <Tooltip title="back to dashboard">
      <Fab
        href={link}
        aria-label="dashboard"
        sx={{ bgcolor: "#fff", color: "#009688", m: 2 }}
      >
        <DashboardIcon />
      </Fab>
    </Tooltip>
  );
}
