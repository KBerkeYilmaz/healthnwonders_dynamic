const mongoose = require("mongoose");
const TranslationSchema = require("./translation");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: TranslationSchema, // Updated to use TranslationSchema
    location: { type: String, required: true },
    bio: TranslationSchema, // Updated to use TranslationSchema
    interests: [{ title: TranslationSchema }], // Updated to use TranslationSchema
    education: [
      { title: TranslationSchema }, // Updated to use TranslationSchema
    ],
    experiences: [
      {
        title: TranslationSchema, // Updated to use TranslationSchema
        startDate: Number,
        endDate: Number,
        description: TranslationSchema, // Assuming you also want this to be multilanguage
      },
    ],
    profilePic: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);
