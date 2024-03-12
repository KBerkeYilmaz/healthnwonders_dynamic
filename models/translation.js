const mongoose = require("mongoose");


const translationSchema = new mongoose.Schema({
    en: { type: String, required: true }, // English version
    tr: { type: String, required: true }, // Turkish version
    fr: { type: String, required: true }, // French version
    de: { type: String, required: true }, // German version
  }, { _id: false }); // Disable _id for subdocuments
  

  module.exports = translationSchema;
