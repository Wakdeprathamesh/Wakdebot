const mongoose = require('mongoose');

const HerbSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientific_name: String,
  family: String,
  common_names: [String],
  dosha_effects: {
    vata: String,
    pitta: String,
    kapha: String
  },
  rasa: String,
  guna: String,
  virya: String,
  vipaka: String,
  prabhava: String,
  uses: [String],
  parts_used: [String],
  preparations: [String],
  nutrients: {
    protein: String,
    fiber: String,
    vitamins: [String]
  },
  contraindications: [String],
  side_effects: [String],
  origin: String,
  cultivation: String,
  references: [String],
  images: [String],
  videos: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Herb', HerbSchema);