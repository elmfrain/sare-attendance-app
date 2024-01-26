const dayjs = require('dayjs');
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxLength: 256,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    maxLength: 256,
    required: true,
    trim: true
  },
  joinDate: {
    type: Date,
    get: (timestamp) => dayjs(timestamp).format('YYYY-MM-DD'),
    required: true,
    default: Date.now(),
  },
  sareID: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    maxLength: 256,
    required: true,
    validate: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Invalid email"],
    unique: true
  },
  phone: {
    type: String,
    maxLength: 64,
    validate: [/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Invalid phone number"]
  },
  rank: {
    type: String,
    enum: ['president', 'executive', 'active-member', 'member', 'unknown'],
    required: true
  },
  role: {
    type: String,
    maxLength: 128,
    trim: true
  },
  emergencyContact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmergencyContact"
  }
});

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;