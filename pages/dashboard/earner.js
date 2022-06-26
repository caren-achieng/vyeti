import Head from "next/head";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Credential from "../../components/credential/Credential";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

import { credentialsRegistryAddress } from "../../config";
import CredentialRegistry from "../../artifacts/contracts/CredentialsRegistry.sol/CredentialsRegistry.json";
import CredentialCard from "../../components/credential/CredentialCard";
import Navbar from "../../components/layout/Navbar";

export default function Earner() {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCredentials();
    console.log(credentials);
  }, []);
  async function loadCredentials() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(
      credentialsRegistryAddress,
      CredentialRegistry.abi,
      provider
    );
    const data = await contract.fetchAllCredentials();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let item = {
          tokenId: i.tokenId.toString(),
          issuer: i.issuer,
          owner: i.owner,
          tokenUri,
          title: meta.data.title,
          awarded_to: meta.data.awarded_to,
          description: meta.data.description,
          image: meta.data.image,
          signatures: meta.data.signatures,
        };
        return item;
      })
    );

    setCredentials(items);
    setLoading(false);
  }
  return (
    <div>
      <Head>
        <title>Earner Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {credentials &&
        credentials.map((credential, index) => (
          <Credential credential={credential} key={index} />
        ))}
      {loading ? <p>loading...</p> : null}
      <Container maxWidth="lg">
        <Grid sx={{ m: 4 }}>
          <Grid container spacing={2}>
            <CredentialCard />
            <CredentialCard />
            <CredentialCard />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
