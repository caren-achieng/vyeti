import React from "react";
import Grid from "@mui/material/Grid";
import ProgrammeCard from "./ProgrammeCard";

export default function ProgrammeList({ programmes }) {
  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {programmes &&
        programmes.map((programme) => (
          <ProgrammeCard key={programme._id} programme={programme} />
        ))}
    </Grid>
  );
}
