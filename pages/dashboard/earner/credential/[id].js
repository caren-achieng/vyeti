import Head from "next/head";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Credential from "../../../../components/credential/Credential";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

import { credentialsRegistryAddress } from "../../../../config";
import CredentialRegistry from "../../../../lib/CredentialsRegistry.json";
import Navbar from "../../../../components/layout/Navbar";
import ShareButton from "../../../../components/util/ShareButton";
import DashboardButton from "../../../../components/util/DashboardButton";
import ClaimCredential from "../../../../components/credential/ClaimCredential";

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
      <Navbar />
      <Box sx={{ m: 2 }}>
        <Box sx={{ position: "fixed" }}>
          <ShareButton link={`https://vyeti.com/credentials/${tokenId}`} />
        </Box>
        <Box sx={{ mt: 10, position: "fixed" }}>
          <DashboardButton link={"/dashboard/earner"} />
        </Box>
      </Box>
      <Container maxWidth="lg">
        {credentials &&
          credentials.map((credential, index) => (
            <Box key={index}>
              <Credential credential={credential} data={data} key={index} />
              {!credential.claimed ? (
                <Grid container>
                  <Grid item xs={12} sm={3} md={3} />
                  <Grid item xs={12} sm={8} md={8}>
                    <Box sx={{ ml: 5 }}>
                      <Typography variant="caption">
                        You are yet to claim this credential
                      </Typography>
                      <Box sx={{ m: 1 }} />
                      <Box sx={{ maxWidth: 200 }}>
                        <ClaimCredential credentialId={credential.tokenId} />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              ) : null}
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
  const res = await axios.get(
    `http://localhost:3000/api/credentials/${params.id}`
  );
  return {
    props: {
      tokenId: params.id,
      data: res.data.credential,
    },
  };
};
