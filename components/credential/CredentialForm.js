import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function CredentialForm(props) {
  return (
    <div>
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        fullWidth
        sx={{ m: 1 }}
        value={props.title}
        onChange={(e) => props.setTitle(e.target.value)}
      />
      <Typography variant="body2" color="text.secondary" sx={{ ml: 1, mt: 1 }}>
        Awarded to
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="full-name"
            label="Full name"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            value={props.fullname}
            onChange={(e) => props.setFullName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
          />
        </Grid>
      </Grid>

      <TextField
        id="description"
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        sx={{ m: 1 }}
        value={props.description}
        onChange={(e) => props.setDescription(e.target.value)}
      />
    </div>
  );
}
