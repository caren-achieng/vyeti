import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FileUpload from "../util/FileUpload";

export default function Accredit({ providerId }) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getFileDetails = (fileDetails) => {
    setFiles([...files, fileDetails]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(files);
    try {
      const details = {
        is_accredited: true,
        documents: files,
      };
      await axios.put(`/api/providers/${providerId}`, details);
      router.replace(router.asPath);
      setOpen(false);
    } catch (err) {
      console.log(err);
      setErrors(err);
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
        <DialogTitle>Upload Accreditation Documents</DialogTitle>
        <DialogContent>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            *For Tertiary institutions, a Charter or Letter of Interim Authority
            is Required
          </Typography>
          <Box>
            <FileUpload getFileDetails={getFileDetails} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
