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
        startDate: Number,
        endDate: Number,
        description: String, // Optional: additional details about the experience
      },
    ],
    profilePic: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);
