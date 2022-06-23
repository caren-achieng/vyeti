import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";

export default function CreateProgramme() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createProgramme = async (e) => {
    e.preventDefault();
    try {
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
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          New Programme
        </Button>
      </Tooltip>

      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle> Create New Programme</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Programme name"
            fullWidth
            variant="filled"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.name?.message}
          </Typography>
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.headline?.message}
          </Typography>
          <Box sx={{ m: 2 }} />
          <TextField
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={4}
            fullWidth
            variant="filled"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.description?.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createProgramme}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
