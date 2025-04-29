// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  lifestyle: { type: String, required: true },
  prakriti: {
    constitution: String,
    doshas: {
      vata: Number,
      pitta: Number,
      kapha: Number
    },
    recommendations: {
      diet: [String],
      exercise: [String],
      lifestyle: [String]
    },
    lastUpdated: Date
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;