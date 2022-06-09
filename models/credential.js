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
  },
  { timestamps: true }
);

export default mongoose.models.Credential ||
  mongoose.model("Credential", credentialSchema);
