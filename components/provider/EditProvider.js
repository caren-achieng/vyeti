import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

import EditIcon from "@mui/icons-material/Edit";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";

import ImageUpload from "../util/ImageUpload";

export default function EditProvider({ provider }) {
  const [open, setOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState(provider.profile_img);
  const [name, setName] = useState(provider.institution_name);
  const [headline, setHeadline] = useState(provider.headline);
  const [description, setDescription] = useState(provider.description);
  const [linkedInLink, setLinkedInLink] = useState(provider.links?.linkedIn);
  const [facebookLink, setFacebookLink] = useState(provider.links?.facebook);
  const [twitterLink, setTwitterLink] = useState(provider.links?.twitter);
  const [instagramLink, setInstagramLink] = useState(provider.links?.instagram);
  const [websiteLink, setWebsiteLink] = useState(provider.links?.webUrl);
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveDetails = async (e) => {
    e.preventDefault();
    const providerId = provider._id;
    try {
      const details = {
        profile_img: fileUrl,
        institution_name: name,
        headline: headline,
        description: description,
        links: {
          linkedIn: linkedInLink,
          facebook: facebookLink,
          twitter: twitterLink,
          instagram: instagramLink,
          webUrl: websiteLink,
        },
      };
      await axios.put(`/api/providers/${providerId}`, details);
      router.replace(router.asPath);
      setOpen(false);
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.errors);
    }
  };
  return (
    <div>
      <Tooltip title="Create new Programme">
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={handleClickOpen}
        >
          Edit Profile Details
        </Button>
      </Tooltip>

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle> Edit Institution Profile</DialogTitle>
        <DialogContent>
          <ImageUpload setFileUrl={setFileUrl} fileUrl={fileUrl} />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Institution name"
            fullWidth
            variant="filled"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.institution_name?.message}
          </Typography>

          <Box sx={{ m: 2 }} />
          <TextField
            autoFocus
            margin="dense"
            id="headline"
            label="headline"
            fullWidth
            variant="filled"
            placeholder="An interesting one-liner: 100 characters max"
            required
            onChange={(e) => setHeadline(e.target.value)}
            value={headline}
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.headline?.message}
          </Typography>

          <Box sx={{ m: 2 }} />
          <TextField
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={6}
            fullWidth
            variant="filled"
            placeholder="An more detailed description: 500 characters max"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.description?.message}
          </Typography>
          <Typography variant="h6" sx={{ m: 1 }}>
            Social Links
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                id="input-with-icon-textfield"
                fullWidth
                label="LinkedIn"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedInIcon />
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                onChange={(e) => setLinkedInLink(e.target.value)}
                value={linkedInLink}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                id="input-with-icon-textfield"
                fullWidth
                label="Facebook"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FacebookIcon />
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                onChange={(e) => setFacebookLink(e.target.value)}
                value={facebookLink}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                id="input-with-icon-textfield"
                fullWidth
                label="Twitter"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TwitterIcon />
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                onChange={(e) => setTwitterLink(e.target.value)}
                value={twitterLink}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                id="input-with-icon-textfield"
                fullWidth
                label="Instagram"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InstagramIcon />
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                onChange={(e) => setInstagramLink(e.target.value)}
                value={instagramLink}
              />
            </Grid>
          </Grid>
          <Box sx={{ m: 2 }} />
          <TextField
            id="input-with-icon-textfield"
            fullWidth
            label="Website"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon />
                </InputAdornment>
              ),
            }}
            variant="filled"
            onChange={(e) => setWebsiteLink(e.target.value)}
            value={websiteLink}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveDetails}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
