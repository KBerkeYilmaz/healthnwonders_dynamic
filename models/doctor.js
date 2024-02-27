const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    location: { type: String, required: true },
    bio: String,
    interests: [{ title: String }],
    education: [
      { title: String }, // E.g., "Medical School"
    ],
    experiences: [
      {
        title: String, // E.g., "Residency"
        startDate: String,
        endDate: String,
        description: String, // Optional: additional details about the experience
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);
