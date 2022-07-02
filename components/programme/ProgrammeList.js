import React from "react";
import Grid from "@mui/material/Grid";
import ProgrammeCard from "./ProgrammeCard";

const programmeList = [
  {
    programme_name: "Bsc. Informatics ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    _id: "123348u0u9u0909098",
    color: "#1565c0",
  },
  {
    programme_name:
      "Bsc. Informatics and Computer Science and Computer Science and Computer Science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    _id: "123348u0u9u0238",
    color: "#0277bd",
  },
  {
    programme_name: "Bsc. Informatics and Computer Science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    _id: "123348u0u9u0923098",
    color: "#ff8f00",
  },
  {
    programme_name: "Bsc. Informatics and Computer Science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    _id: "123348u0u9u0923098",
    color: "#2e7d32",
  },
  {
    programme_name: "Bsc. Informatics and Computer Science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    _id: "123348u0u9u0923098",
    color: "#d500f9",
  },
  {
    programme_name: "Bsc. Informatics and Computer Science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    _id: "123348u0u9u0923098",
    color: "#ff1744",
  },
  {
    programme_name: "Bsc. Informatics and Computer Science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    _id: "123348u0u9u0923098",
    color: "#4527a0",
  },
];

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
