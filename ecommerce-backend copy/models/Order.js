const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  paymentId: String,
  user: String
});

module.exports = mongoose.model('Order', OrderSchema);
