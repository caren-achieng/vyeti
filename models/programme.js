const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const programmeSchema = new mongoose.Schema(
  {
    programme_name: {
      type: String,
      required: [true, "Please provide the name of the programme"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description of the programme"],
    },
    is_accredited: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: ObjectId,
      ref: "Provider",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Programme ||
  mongoose.model("Programme", programmeSchema);
