const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 512,
    trim: true
  },
  relationship: {
    type: String,
    maxLength: 128,
    validate: [/^(?:[a-zA-Z ])*[\/\\\-]?(?:[a-zA-Z ])*$/, "Invalid relationship format"],
    trim: true
  },
  phone: {
    type: String,
    maxLength: 64,
    validate: [/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Invalid phone number"],
    required: true,
    trim: true
  }
});

const EmergencyContact = mongoose.model("EmergencyContact", emergencyContactSchema);
module.exports = EmergencyContact