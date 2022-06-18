const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const credentialSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    programme: {
      type: ObjectId,
      ref: "Programme",
    },
    sent_to: {
      type: String,
      required: [true, "Recepient email is Required"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Credential ||
  mongoose.model("Credential", credentialSchema);
