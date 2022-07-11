import { useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function Accredit() {
  const [open, setOpen] = useState(false);
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
        is_accredited: true,
        documents: uploadedFiles,
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
      <Tooltip title="Upload Accreditation Documents">
        <IconButton
          onClick={handleClickOpen}
          aria-label="Award"
          color="primary"
          size="large"
        >
          <UploadFileIcon />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogContent>Upload Documents</DialogContent>
      </Dialog>
    </div>
  );
}
