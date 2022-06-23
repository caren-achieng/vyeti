import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Credential({ credential }) {
  const signatures = credential.signatures;
  return (
    <Grid container sx={{ m: 4 }}>
      <Grid item xs={12} sm={3} md={3}>
        <Avatar
          variant="rounded"
          src={credential.image}
          sx={{ m: 2, width: 280, height: 280 }}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
        <Box sx={{ m: 2 }}>
          <Typography variant="h4" sx={{ m: 1 }}>
            {credential.title}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body1" sx={{ fontWeight: 600, m: 1 }}>
              Issued by
            </Typography>
            <Typography variant="body1" sx={{ m: 1, ml: 0 }}>
              {credential.issuer}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body1" sx={{ fontWeight: 600, m: 1 }}>
              Issued to
            </Typography>
            <Typography variant="body1" sx={{ m: 1, ml: 0 }}>
              {credential.awarded_to}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ m: 1 }}>
            {credential.description}
          </Typography>
          <Box sx={{ m: 10 }} />
          <Grid container spacing={2} sx={{ m: 1 }}>
            {signatures &&
              signatures.map((signature) => (
                <Grid item xs={12} sm={4} md={4}>
                  <Box sx={{ height: 80, m: 2 }}>
                    <img src={signature.signature} alt="signature" />
                  </Box>
                  <Box sx={{ mr: 4 }}>
                    <hr />
                  </Box>
                  <Typography variant="body1" sx={{ m: 1 }}>
                    {signature.name}
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
