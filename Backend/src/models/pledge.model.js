const mongoose = require("mongoose");

const pledgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    pledge: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "select at least one",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Pledge",pledgeSchema)
