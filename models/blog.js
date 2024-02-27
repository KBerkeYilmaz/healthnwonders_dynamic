const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    image: { type: String, required: false },
    name: { type: String, required: true },
    thumbnailName: { type: String, required: true },
    thumbnailDescription: { type: String, required: true },
    description: [{ title: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
