const mongoose = require('mongoose');

const customizationSchema = new mongoose.Schema({
  item: { type: String, required: true },
  weight: { type: String, required: true },
  specifications: { type: String, required: true },
  options: { type: String, required: true }, // Veg or Non-Veg
  name: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

const Customization = mongoose.model('Customization', customizationSchema);

module.exports = Customization;