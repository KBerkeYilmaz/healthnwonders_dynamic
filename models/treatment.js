const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subTitle: { type: String, required: true },
    abstract: { type: String, required: true },
    description: [{ title: String }],
    youtubeLink: { type: String},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Treatment", treatmentSchema);
