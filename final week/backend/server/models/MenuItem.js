// backend/server/models/MenuItem.js
const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  weight: String,
  type: String,
});

MenuItemSchema.pre('update', function(next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  next();
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);