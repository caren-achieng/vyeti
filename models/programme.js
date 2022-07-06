const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const programmeSchema = new mongoose.Schema(
  {
    programme_name: {
      type: String,
      required: [true, "Please provide the name of the programme"],
      maxlength: [70, "Name should not exceed 70 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description of the programme"],
      maxlength: [500, "Description should not exceed 500 characters"],
    },
    is_accredited: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: ObjectId,
      ref: "Provider",
    },
    duration: {
      quantity: {
        type: Number,
        required: [true, "Programme duration is required"],
      },
      measure: {
        type: String,
        required: [true, "Programme duration is required"],
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Programme ||
  mongoose.model("Programme", programmeSchema);
