const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const credentialSchema = new mongoose.Schema(
  {
    tokenId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    programme: {
      type: ObjectId,
      ref: "Programme",
    },
    institution: {
      type: ObjectId,
      ref: "Provider",
    },
    registrant: {
      type: ObjectId,
      ref: "Registrant",
    },
    issued_to: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Credential ||
  mongoose.model("Credential", credentialSchema);
