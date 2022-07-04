import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";

export default function EditProgramme({ programme }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(programme.programme_name);
  const [description, setDescription] = useState(programme.description);
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createProgramme = async (e) => {
    e.preventDefault();
    const programmeId = programme._id;
    try {
      const details = {
        programme_name: name,
        description: description,
      };
      await axios.put(`/api/programmes/${programmeId}`, details);
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
          sx={{ ml: 2 }}
        >
          Edit Programme Details
        </Button>
      </Tooltip>

      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle> Edit Programme Details</DialogTitle>
        <DialogContent>
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
            {errors?.programme_name?.message}
          </Typography>

          <Box sx={{ m: 2 }} />
          <TextField
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={8}
            fullWidth
            variant="filled"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.description?.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createProgramme}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
