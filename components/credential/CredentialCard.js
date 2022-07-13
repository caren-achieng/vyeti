import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

export default function CredentialCard({ credential }) {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card elevation={2} sx={{ backgroundColor: "#fafafa" }}>
        <CardActionArea
          href={`/dashboard/earner/credential/${credential.tokenId}`}
        >
          <Box sx={{ display: "flex" }}>
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 90, height: 90, m: 2 }}
              variant="rounded"
              src={credential.image}
            />
            <Box sx={{ mt: 3, mr: 2 }}>
              <Box sx={{ height: 50, overflow: "hidden" }}>
                <Typography variant="body1">{credential.title}</Typography>
              </Box>
              <Typography variant="caption">
                {credential.institution.institution_name}
              </Typography>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
