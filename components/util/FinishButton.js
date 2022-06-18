import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function FinishButton({ finish, handleFinish }) {
  return (
    <Box>
      {finish ? (
        <Button
          variant="contained"
          fullWidth
          sx={{ m: 1 }}
          onClick={handleFinish}
        >
          Finish
        </Button>
      ) : null}
    </Box>
  );
}
