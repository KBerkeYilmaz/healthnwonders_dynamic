const mongoose = require("mongoose");
const TranslationSchema = require("./translation");

const blogSchema = new mongoose.Schema(
  {
    image: { type: String, required: false },
    name: TranslationSchema, 
    thumbnailDescription: TranslationSchema, 
    description: [TranslationSchema], 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
