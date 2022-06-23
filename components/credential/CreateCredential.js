import Head from "next/head";
import { useEffect, useState, forwardRef } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Web3Modal from "web3modal";
import ImageUpload from "../../components/util/ImageUpload";
import CredentialForm from "../../components/credential/CredentialForm";
import Steps from "../../components/layout/Steps";
import AddSignature from "../../components/util/AddSignature";
import NextButton from "../../components/util/NextButton";
import FinishButton from "../../components/util/FinishButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { credentialsRegistryAddress } from "../../config";
import CredentialRegistry from "../../artifacts/contracts/CredentialsRegistry.sol/CredentialsRegistry.json";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateCredential() {
  const [open, setOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [signatures, setSignatures] = useState([]);
  const [noOfsignatures, setNoOfsignatures] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [next, setNext] = useState(false);
  const [finish, setFinish] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!title || !fullname || !email || !description || !fileUrl) {
      setNext(false);
    } else {
      setNext(true);
    }
  }, [title, fullname, email, description]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
  };

  const handleBack = () => {
    const nextStep = activeStep - 1;
    setActiveStep(nextStep);
    setFinish(false);
  };

  const getSignature = (signature) => {
    setSignatures([...signatures, signature]);
  };

  const removeSignature = (signature) => {
    const currentIndex = signatures.findIndex((x) => x.signature === signature);
    let newSignatures = [...signatures];
    newSignatures.splice(currentIndex, 1);
    setSignatures(newSignatures);
  };

  const addField = () => {
    const fields = noOfsignatures + 1;
    setNoOfsignatures(fields);
  };

  const removeField = () => {
    const fields = noOfsignatures - 1;
    setNoOfsignatures(fields);
  };

  async function uploadToIPFS() {
    const data = JSON.stringify({
      title: title,
      awarded_to: fullname,
      description: description,
      image: fileUrl,
      signatures: signatures,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function CreateCredential() {
    const url = await uploadToIPFS();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      credentialsRegistryAddress,
      CredentialRegistry.abi,
      signer
    );

    let transaction = await contract.createCredentialToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];

    console.log("Success", event);
  }

  return (
    <div>
      <Tooltip title="Issue Credential">
        <Fab
          onClick={handleClickOpen}
          aria-label="Issue"
          color="primary"
          sx={{ m: 2 }}
        >
          <NoteAddIcon />
        </Fab>
      </Tooltip>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogContent>
          <DialogActions>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
          <Container maxWidth="sm">
            <Grid align="center">
              <Typography variant="h6" sx={{ m: 1 }}>
                {" "}
                Issue Credential
              </Typography>
            </Grid>
            <Steps
              activeStep={activeStep}
              steps={["Enter Details", "Sign Credential", "Finish"]}
            />
            <Box sx={{ m: 4 }} />
            {activeStep === 0 ? (
              <Container>
                <ImageUpload setFileUrl={setFileUrl} fileUrl={fileUrl} />
                <CredentialForm
                  title={title}
                  fullname={fullname}
                  email={email}
                  description={description}
                  setTitle={setTitle}
                  setFullName={setFullName}
                  setEmail={setEmail}
                  setDescription={setDescription}
                />
                <NextButton next={next} handleNext={handleNext} />
              </Container>
            ) : (
              <Container>
                {(function (rows, i, len) {
                  while (++i <= len) {
                    rows.push(
                      <AddSignature
                        getSignature={getSignature}
                        removeSignature={removeSignature}
                        addField={addField}
                        removeField={removeField}
                        setFinish={setFinish}
                        handleNext={handleNext}
                        instances={noOfsignatures}
                        key={i}
                      />
                    );
                  }
                  return rows;
                })([], 0, noOfsignatures)}

                <Box sx={{ display: "flex" }}>
                  <Button
                    sx={{ m: 1 }}
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <FinishButton
                    finish={finish}
                    handleFinish={CreateCredential}
                  />
                </Box>
              </Container>
            )}
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}
