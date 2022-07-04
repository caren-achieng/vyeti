import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EditEarner from "./EditEarner";

export default function EarnerProfile({ earner }) {
  return (
    <Container maxWidth="lg">
      <Box>
        <Box sx={{ m: 1 }}>
          <Box sx={{ display: "flex", ml: 4, mb: -13 }}>
            {earner.profile_img ? (
              <Avatar
                src={earner.profile_img}
                sx={{ width: 160, height: 160 }}
              />
            ) : (
              <Avatar sx={{ width: 160, height: 160 }} />
            )}
          </Box>
        </Box>

        <Paper sx={{ backgroundColor: "#fafafa", m: 2, p: 2 }}>
          <Box sx={{ m: 11 }} />
          <Grid container>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h4" sx={{ ml: 2 }}>
                {`${earner.first_name} ${earner.last_name}`}
              </Typography>
            </Grid>
            <Grid align="right" item xs={12} sm={12} md={6}>
              <Box sx={{ mr: 2 }}>
                <EditEarner earner={earner} />
              </Box>
            </Grid>
          </Grid>

          {earner.bio ? (
            <Typography variant="body1" sx={{ m: 2 }}>
              {earner.bio}
            </Typography>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ m: 2 }}>
              Select EDIT PROFILE to add bio
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
