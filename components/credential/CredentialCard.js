import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";

export default function CredentialCard() {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card elevation={2} sx={{ backgroundColor: "#fafafa" }}>
        <Box sx={{ display: "flex" }}>
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 90, height: 90, m: 2 }}
            variant="rounded"
            src="http://localhost:3000/image.png"
          />
          <Box sx={{ mt: 3, mr: 2 }}>
            <Box sx={{ height: 50, overflow: "hidden" }}>
              <Typography variant="body1">
                Bsc.Informatics and Computer Informatics and Computer Science
              </Typography>
            </Box>
            <Typography variant="caption">Strathmore University</Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}
