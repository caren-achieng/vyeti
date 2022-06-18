import React from "react";
import Button from "@mui/material/Button";

export default function NextButton({ next, handleNext }) {
  return (
    <div>
      {next ? (
        <Button variant="contained" sx={{ m: 1 }} onClick={handleNext}>
          Next
        </Button>
      ) : (
        <Button variant="contained" disabled sx={{ m: 1 }}>
          Next
        </Button>
      )}
    </div>
  );
}
