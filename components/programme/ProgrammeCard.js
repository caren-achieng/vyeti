import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function ProgrammeCard({ programme }) {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardActionArea href={`/dashboard/provider/programmes/1`}>
          <Box sx={{ backgroundColor: "#4D776D", height: 30 }} />
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ height: 64, overflow: "hidden" }}>
              <Typography variant="h6" sx={{ color: "#004d40" }}>
                {programme.name}
              </Typography>
            </Box>

            <Typography
              noWrap
              gutterBottom
              variant="subtitle2"
              component="div"
              color="text.secondary"
            >
              {programme.description}
            </Typography>

            <Box sx={{ m: 1 }} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
