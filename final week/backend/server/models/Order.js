const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
  address: String,
  paymentMethod: String,
  cardNumber: String,
  expirationDate: String,
  cvv: String,
  cartItems: [
    {
      title: String,
      price: Number,
      count: Number,
    },
  ],
});

module.exports = mongoose.model('Order', OrderSchema);