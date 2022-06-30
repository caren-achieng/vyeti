import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import VerifiedIcon from "@mui/icons-material/Verified";

export default function ProgrammeDetails() {
  return (
    <div>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h3" sx={{ m: 2 }}>
            Bsc. Informatics and Computer Science
          </Typography>

          <Box sx={{ display: "flex", ml: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, m: 1 }}>
              Programme by
            </Typography>
            <Link href="/">
              <Typography
                variant="body1"
                color="primary"
                sx={{ fontWeight: 600, m: 1, ml: 0 }}
              >
                Strathmore University
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}
