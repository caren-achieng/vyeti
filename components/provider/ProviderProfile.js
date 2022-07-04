import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";

import VerifiedIcon from "@mui/icons-material/Verified";
import EditProvider from "./EditProvider";

export default function ProviderProfile({ provider }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 3 }}>
        <Box sx={{ m: 1 }}>
          <Box sx={{ display: "flex", m: 2 }}>
            {provider.profile_img ? (
              <img src={provider.profile_img} style={{ width: 150 }} />
            ) : (
              <Avatar variant="rounded" sx={{ width: 110, height: 110 }} />
            )}
          </Box>
          <Typography variant="h4" sx={{ m: 1 }}>
            {provider.institution_name}
          </Typography>
          {provider.headline ? (
            <Typography variant="body1" sx={{ m: 1 }}>
              {provider.headline}
            </Typography>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ m: 1 }}>
              Organization Headline: Select EDIT DETAILS to add headline
            </Typography>
          )}
          <Box sx={{ m: 1 }}>
            <EditProvider provider={provider} />
          </Box>
          <Box sx={{ display: "flex", m: 1 }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mr: 2 }}
            >
              30 programmes
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mr: 2 }}
            >
              378900 credentials issued
            </Typography>
          </Box>
        </Box>
        {provider.is_accredited ? (
          <Box sx={{ display: "flex", ml: 1 }}>
            <VerifiedIcon sx={{ color: "#26c6da", m: 1 }} />

            <Typography variant="body1" sx={{ m: 1, ml: 0 }}>
              Is accredited
            </Typography>
          </Box>
        ) : null}

        <Paper sx={{ backgroundColor: "#eeeeee", m: 2, p: 2 }}>
          <Typography variant="h5" sx={{ m: 2 }}>
            About
          </Typography>

          {provider.description ? (
            <Box sx={{ textAlign: "justify" }}>
              <Typography variant="body1" sx={{ m: 2 }}>
                {provider.description}
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
