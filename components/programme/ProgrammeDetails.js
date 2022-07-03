import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import VerifiedIcon from "@mui/icons-material/Verified";

export default function ProgrammeDetails({ programme }) {
  return (
    <div>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h3" sx={{ m: 2 }}>
            {programme.programme_name}
          </Typography>

          <Box sx={{ display: "flex", ml: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, m: 1 }}>
              Programme by
            </Typography>
            <Link href={`/org/${programme.provider.slug}`}>
              <Typography
                variant="body1"
                color="primary"
                sx={{ fontWeight: 600, m: 1, ml: 0 }}
              >
                {programme.provider.institution_name}
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: "flex", ml: 1 }}>
            <VerifiedIcon sx={{ color: "#26c6da", m: 1 }} />
            <Typography variant="body1" sx={{ m: 1, ml: 0 }}>
              Is accredited
            </Typography>
          </Box>
          <Paper sx={{ backgroundColor: "#eeeeee", m: 2, p: 2 }}>
            <Typography variant="h5" sx={{ m: 2 }}>
              Description
            </Typography>
            <Typography variant="body1" sx={{ m: 2 }}>
              {programme.description}
            </Typography>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}
