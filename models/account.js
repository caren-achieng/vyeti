const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    wallet: {
      type: String,
      required: [true, "Please connect your account with your wallet"],
      unique: true,
    },
    type: {
      type: String,
      required: [true, "Account type is required"],
      enum: {
        values: ["provider", "employer", "earner"],
        message: "Account type is not recognized",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Account ||
  mongoose.model("Account", accountSchema);
