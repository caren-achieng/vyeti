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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import AddIcon from "@mui/icons-material/Add";

export default function CreateProgramme({ providerId }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [value, setValue] = useState(4);
  const [measure, setMeasure] = useState("years");

  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createProgramme = async (e) => {
    e.preventDefault();
    const provider_id = providerId;
    try {
      const newProgramme = {
        provider: provider_id,
        programme_name: name,
        description: description,
        duration: {
          quantity: value,
          measure: measure,
        },
      };
      const res = await axios.post(`/api/programmes`, newProgramme);
      const programme = res.data;
      setOpen(false);
      router.replace(router.asPath);
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
            id="programme name"
            label="Programme name"
            fullWidth
            variant="filled"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.programme_name?.message}
          </Typography>

          <Box sx={{ m: 2 }} />
          <TextField
            id="description"
            label="Description"
            multiline
            rows={8}
            fullWidth
            variant="filled"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.description?.message}
          </Typography>

          <Box sx={{ m: 2 }} />
          <TextField
            id="time-quantity"
            label="Duration"
            variant="filled"
            required
            onChange={(e) => setValue(e.target.value)}
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.duration?.message}
          </Typography>
          <FormControl variant="filled" sx={{ ml: 1 }}>
            <InputLabel id="measure-label">measure</InputLabel>
            <Select
              labelId="measure-label"
              id="measure"
              value={measure}
              label="measure"
              onChange={(e) => setMeasure(e.target.value)}
            >
              <MenuItem value={"days"}>days</MenuItem>
              <MenuItem value={"months"}>months</MenuItem>
              <MenuItem value={"years"}>Years</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createProgramme}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
