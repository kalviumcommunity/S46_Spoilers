const mongoose = require('mongoose');

// Schema for the Users collection

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.methods.comparePassword = function(password) {
  return this.password === password;
};

// Schema for the Spoilers collection

const spoilerSchema = new mongoose.Schema({
  activity: { type: String, required: true },
  consequences: { type: String, required: true },
  spoilRate: { type: Number, required: true }
});

const User = mongoose.model('users', userSchema);
const Spoiler = mongoose.model('spoilers', spoilerSchema);

module.exports = { User, Spoiler };