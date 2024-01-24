const config = require('../config/default.json');

const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
const mongoose = require('mongoose');

dayjs.extend(utc);
dayjs.extend(timezone);

const attendanceSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  meeting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meeting",
    required: true
  },
  joinTime: {
    type: String,
    validate: [/^([01]\d|2[0-3]):([0-5]\d)$/, "Wrong time format"],
    default: dayjs().tz(config.timezone).format('HH:mm'),
    required: true
  },
  leaveTime: {
    type:String,
    validate: [/^([01]\d|2[0-3]):([0-5]\d)$/, "Wrong time format"]
  }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;