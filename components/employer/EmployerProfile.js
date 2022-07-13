import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function EmployerProfile({ employer }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 3 }}>
        <Box sx={{ m: 1 }}>
          <Box sx={{ display: "flex", m: 1 }}>
            {employer.profile_img ? (
              <img src={employer.profile_img} style={{ width: 150 }} />
            ) : (
              <Avatar variant="rounded" sx={{ width: 110, height: 110 }} />
            )}
          </Box>
          <Typography variant="h4" sx={{ m: 1 }}>
            {employer.organization_name}
          </Typography>
        </Box>

        <Paper sx={{ backgroundColor: "#eeeeee", m: 2, p: 2 }}>
          <Typography variant="h5" sx={{ m: 2 }}>
            About
          </Typography>

          {employer.description ? (
            <Box sx={{ textAlign: "justify" }}>
              <Typography variant="body1" sx={{ m: 2 }}>
                {employer.description}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ m: 2 }}>
              Select EDIT DETAILS to add description
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
