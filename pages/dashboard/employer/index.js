import Head from "next/head";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ApartmentIcon from "@mui/icons-material/Apartment";
import ClassIcon from "@mui/icons-material/Class";
import ArchiveIcon from "@mui/icons-material/Archive";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import EmployerProfile from "../../../components/employer/EmployerProfile";
import DataTable from "../../../components/registry/DataTable";

import jwt from "jsonwebtoken";
import {
  AppBar,
  Drawer,
  DrawerHeader,
} from "../../../components/util/NavDrawerOptions";

const buttonsinfo = [
  { text: "Company Profile", link: "/campaigns", value: 0 },
  { text: "Credentials Registry", link: "/contacts", value: 1 },
  { text: "Archived Items", link: "/messages", value: 2 },
];

export default function EmloyerDashboard({ employer, credentials }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {buttonsinfo.map((info, index) => (
              <ListItem
                button
                onClick={(e) => handleChangeValue(e, info.value)}
                key={index}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <ApartmentIcon
                      color={index === value ? "primary" : "inherit"}
                    />
                  ) : index === 1 ? (
                    <AppRegistrationIcon
                      color={index === value ? "primary" : "inherit"}
                    />
                  ) : index === 2 ? (
                    <ArchiveIcon
                      color={index === value ? "primary" : "inherit"}
                    />
                  ) : (
                    <ClassIcon
                      color={index === value ? "primary" : "inherit"}
                    />
                  )}
                </ListItemIcon>
                <ListItemText primary={info.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <div hidden={value !== 0}>
            {" "}
            <EmployerProfile employer={employer} />
          </div>
          <div hidden={value !== 1}>
            <DataTable credentials={credentials} />
          </div>
          <div hidden={value !== 2}>Archived Items</div>
        </Box>
      </Box>
    </div>
  );
}

export const getServerSideProps = async ({ req }) => {
  const { cookies } = req;
  const token = cookies.vyeti_jwt;
  const decoded_token = jwt.decode(token);
  const account_id = decoded_token.id;
  const verified = decoded_token.verified;

  if (!verified) {
    return {
      redirect: {
        destination: "/verifyaccount",
        permanent: false,
      },
    };
  }

  if (decoded_token.type === "provider") {
    return {
      redirect: {
        destination: "/dashboard/provider",
        permanent: false,
      },
    };
  } else if (decoded_token.type === "earner") {
    return {
      redirect: {
        destination: "/dashboard/earner",
        permanent: false,
      },
    };
  } else {
    const account = await axios.get(
      `https://vyeti.com/api/accounts/employers/${account_id}`
    );
    const employerId = account.data.employer._id;

    const res = await axios.get(
      `https://vyeti.com/api/employers/${employerId}`
    );
    const credentials = await axios.get(`https://vyeti.com/api/credentials`);

    return {
      props: {
        employer: res.data.employer,
        credentials: credentials.data.credentials,
      },
    };
  }
};
