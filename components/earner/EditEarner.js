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

import EditIcon from "@mui/icons-material/Edit";
import ImageUpload from "../util/ImageUpload";

export default function EditEarner({ earner }) {
  const [open, setOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState(earner.profile_img);
  const [firstname, setFirstName] = useState(earner.first_name);
  const [lastname, setLastName] = useState(earner.last_name);
  const [bio, setBio] = useState(earner.bio);
  const router = useRouter();
  const [errors, setErrors] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveDetails = async (e) => {
    e.preventDefault();
    const earnerId = earner._id;
    try {
      const details = {
        profile_img: fileUrl,
        first_name: firstname,
        last_name: lastname,
        bio: bio,
      };
      await axios.put(`/api/earners/${earnerId}`, details);
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
          Edit Profile
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
            label="First name"
            fullWidth
            variant="filled"
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstname}
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.first_name?.message}
          </Typography>

          <Box sx={{ m: 2 }} />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last name"
            fullWidth
            variant="filled"
            required
            onChange={(e) => setLastName(e.target.value)}
            value={lastname}
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.last_name?.message}
          </Typography>

          <Box sx={{ m: 2 }} />
          <TextField
            id="filled-multiline-static"
            label="Bio"
            multiline
            rows={6}
            fullWidth
            variant="filled"
            placeholder="An interesting description of yourself and what you do"
            required
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.bio?.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveDetails}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
