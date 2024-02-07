const mongoose = require('mongoose');

// Schema for the Users collection

const userSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// Schema for the Spoilers collection

const spoilerSchema = new mongoose.Schema({
  activity: { type: String, required: true },
  consequences: { type: String, required: true },
  spoilRate: { type: Number, required: true }
});

const User = mongoose.model('users', userSchema);
const Spoiler = mongoose.model('spoilers', spoilerSchema);

module.exports = { User, Spoiler };