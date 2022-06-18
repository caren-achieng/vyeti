import React from "react";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { create as ipfsHttpClient } from "ipfs-http-client";
import EditIcon from "@mui/icons-material/Edit";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function ImageUpload({ setFileUrl }) {
  const [image, setImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  async function uploadImage(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setImage(url);
      setUploaded(true);
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  return (
    <div>
      {uploaded ? (
        <div>
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 78, height: 78, bgcolor: "#90a4ae", m: 1 }}
            variant="rounded"
            src={image}
          />
          <label htmlFor="fileInput">
            <Tooltip title="change image file" placement="top">
              <Fab
                size="small"
                color="primary"
                aria-label="clear"
                sx={{ mt: -7, ml: 7 }}
              >
                <EditIcon />
              </Fab>
            </Tooltip>
          </label>

          <input
            type="file"
            accept="image/*"
            id="fileInput"
            hidden
            onChange={uploadImage}
          />
        </div>
      ) : (
        <div>
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 78, height: 78, bgcolor: "#90a4ae", m: 1 }}
            variant="rounded"
          >
            <label htmlFor="fileInput">
              <Tooltip title="add image file" placement="top">
                <IconButton
                  aria-label="upload media"
                  size="large"
                  component="span"
                >
                  <CameraEnhanceIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>
            </label>
          </Avatar>
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            hidden
            onChange={uploadImage}
          />
        </div>
      )}
    </div>
  );
}