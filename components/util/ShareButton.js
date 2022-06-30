import { useState } from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/material";

export default function ShareButton(props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCopied(false);
  };

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(
      "http://localhost:3000/dashboard/earner/credential/1"
    );
    setCopied(true);
  };

  return (
    <div>
      <Tooltip title="share">
        <Fab
          onClick={handleClickOpen}
          aria-label="share"
          color="primary"
          sx={{ m: 2 }}
        >
          <ShareIcon />
        </Fab>
      </Tooltip>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Share </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ m: 0.5 }}>
              <Tooltip title="whatsapp">
                <WhatsappShareButton
                  url={"http://localhost:3000/dashboard/earner/credential/1"}
                >
                  <WhatsappIcon size={50} round={true} />
                </WhatsappShareButton>
              </Tooltip>
            </Box>
            <Box sx={{ m: 0.5 }}>
              <Tooltip title="facebook">
                <FacebookShareButton
                  url={"http://localhost:3000/dashboard/earner/credential/1"}
                >
                  <FacebookIcon size={50} round={true} />
                </FacebookShareButton>
              </Tooltip>
            </Box>
            <Box sx={{ m: 0.5 }}>
              <Tooltip title="twitter">
                <TwitterShareButton
                  url={"http://localhost:3000/dashboard/earner/credential/1"}
                >
                  <TwitterIcon size={50} round={true} />
                </TwitterShareButton>
              </Tooltip>
            </Box>
            <Box sx={{ m: 0.5 }}>
              <Tooltip title="linkedin">
                <LinkedinShareButton
                  url={"http://localhost:3000/dashboard/earner/credential/1"}
                >
                  <LinkedinIcon size={50} round={true} />
                </LinkedinShareButton>
              </Tooltip>
            </Box>
            <Box sx={{ m: 0.5 }}>
              <Tooltip title="reddit">
                <RedditShareButton
                  url={"http://localhost:3000/dashboard/earner/credential/1"}
                >
                  <RedditIcon size={50} round={true} />
                </RedditShareButton>
              </Tooltip>
            </Box>
            <Box sx={{ m: 0.5 }}>
              <Tooltip title="telegram">
                <TelegramShareButton
                  url={"http://localhost:3000/dashboard/earner/credential/1"}
                >
                  <TelegramIcon size={50} round={true} />
                </TelegramShareButton>
              </Tooltip>
            </Box>
            <Box sx={{ m: 0.5 }}>
              <Tooltip title="email">
                <EmailShareButton
                  url={"http://localhost:3000/dashboard/earner/credential/1"}
                >
                  <EmailIcon size={50} round={true} />
                </EmailShareButton>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ display: "flex", m: 1, mt: 2 }}>
            <Box
              sx={{
                p: 2,
                bgcolor: "#e0f2f1",
                borderRadius: 2,
                maxWidth: "80%",
              }}
            >
              <Typography noWrap id="url" variant="body2">
                {"http://localhost:3000/dashboard/earner/credential/1"}
              </Typography>
            </Box>
            <Box sx={{ m: 1 }}>
              <Tooltip title="copy url">
                <IconButton
                  onClick={copyToClipboard}
                  aria-label="copy"
                  color="primary"
                >
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
              {copied ? (
                <Typography variant="caption">copied!</Typography>
              ) : null}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
