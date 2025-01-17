import Head from "next/head";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import Credential from "../../components/credential/Credential";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { credentialsRegistryAddress } from "../../config";
<<<<<<< HEAD:pages/dashboard/earner.js
import CredentialRegistry from "../../artifacts/contracts/CredentialsRegistry.sol/CredentialsRegistry.json";
import CredentialCard from "../../components/credential/CredentialCard";
import TopNav from "../../components/layout/TopNav";
import BottomNav from "../../components/layout/BottomNav";
=======
import CredentialRegistry from "../../lib/CredentialsRegistry.json";
import Navbar from "../../components/layout/Navbar";
import VerifyCredential from "../../components/credential/VerifyCredential";
>>>>>>> upstream/main:pages/credentials/[id].js

export default function CredentialPage({ tokenId, data }) {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCredentials();
    console.log(credentials);
  }, []);
  async function loadCredentials() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.maticvigil.com"
    );
    const contract = new ethers.Contract(
      credentialsRegistryAddress,
      CredentialRegistry.abi,
      provider
    );
    const data = await contract.fetchCredentialById(tokenId);

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
          claimed: i.claimed,
        };
        console.log(item);
        return item;
      })
    );

    setCredentials(items);
    setLoading(false);
  }
  return (
    <div>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
<<<<<<< HEAD:pages/dashboard/earner.js
      <TopNav />
        <   BottomNav />

        {credentials &&
        credentials.map((credential, index) => (
          <Credential credential={credential} key={index} />
        ))}
      {loading ? <p>loading...</p> : null}
=======
      <Navbar />

>>>>>>> upstream/main:pages/credentials/[id].js
      <Container maxWidth="lg">
        {credentials &&
          credentials.map((credential, index) => (
            <Box key={index}>
              <Credential credential={credential} data={data} key={index} />
              <Grid container>
                <Grid item xs={12} sm={3} md={3} />
                <Grid item xs={12} sm={8} md={8}>
                  <Box sx={{ ml: 5, mt: 1 }}>
                    <VerifyCredential credential={credential} data={data} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        {loading ? (
          <Grid align="center" sx={{ m: 6 }}>
            <LinearProgress />
          </Grid>
        ) : null}
      </Container>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`https://vyeti.com/api/credentials/${params.id}`);
  return {
    props: {
      tokenId: params.id,
      data: res.data.credential,
    },
  };
};
