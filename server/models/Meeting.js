const dayjs = require('dayjs');
const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 256,
    required: true,
    default: "Meeting",
    trim: true
  },
  at: {
    type: String,
    maxLength: 128,
    required: false,
    trim: true
  },
  date: {
    type: Date,
    get: (timestamp) => dayjs(timestamp).format('YYYY-MM-DD'),
    required: true
  },
  type: {
    type: String,
    enum: ['on-site', 'remote'],
    required: true
  },
  fromTime: {
    type: String,
    validate: [/^([01]\d|2[0-3]):([0-5]\d)$/, "Wrong time format"],
    required: true
  },
  toTime: {
    type: String,
    validate: [/^([01]\d|2[0-3]):([0-5]\d)$/, "Wrong time format"],
    required: true
  },
  teams: {
    type: [String],
    required: true,
    default: ["All teams"],
    validate: [(val) => val.length <= 16, "Max number of teams exceeded"]
  }
});

const Meeting = mongoose.model("Meeting", meetingSchema);
module.exports = Meeting;