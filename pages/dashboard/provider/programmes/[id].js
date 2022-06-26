import Head from "next/head";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ProgrammeDetails from "../../../../components/programme/ProgrammeDetails";
import CreateCredential from "../../../../components/credential/CreateCredential";
import Navbar from "../../../../components/layout/Navbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";

export default function Employer() {
  return (
    <div>
      <Head>
        <title>Program Title</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Box sx={{ m: 2 }}>
        <Box sx={{ position: "fixed" }}>
          <CreateCredential />
        </Box>

        <Box sx={{ mt: 10, position: "fixed" }}>
          <Tooltip title="archive programme">
            <Fab
              href="/dashboard"
              aria-label="dashboard"
              sx={{ bgcolor: "#fff", color: "#009688", m: 2 }}
            >
              <ArchiveIcon />
            </Fab>
          </Tooltip>
        </Box>
        <Box sx={{ mt: 20, position: "fixed" }}>
          <Tooltip title="back to dashboard">
            <Fab
              href="/dashboard/provider"
              aria-label="dashboard"
              sx={{ bgcolor: "#fff", color: "#009688", m: 2 }}
            >
              <DashboardIcon />
            </Fab>
          </Tooltip>
        </Box>
      </Box>
      <ProgrammeDetails />
      <Container maxWidth="md">
        <Button variant="outlined" sx={{ m: 2 }}>
          {" "}
          Edit Details
        </Button>
      </Container>
    </div>
  );
}