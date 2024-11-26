const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  feePackage: String,
  diet: String,
  supplement: String,
  notifications: [String],
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
