const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Faq", faqSchema);
