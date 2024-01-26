const { GraphQLError } = require('graphql');
const { Admin, Attendance, Meeting, Member, EmergencyContact } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const config = require('../config/default.json');

dayjs.extend(timezone);

const resolvers = {
  Query: {
    memberBySareID: async (parent, {sareID}, context) => {
      if(!context.admin)
        throw AuthenticationError;

      return Member.findOne({ sareID }).populate("emergencyContact");
    },

    memberByEmail: async(parent, {email}, context) => {
      if(!context.admin)
        throw AuthenticationError;

      return Member.findOne({email}).populate("emergencyContact");
    },

    members: async (parent, args, context) => {
      if(!context.admin)
        throw AuthenticationError;

      return Member.find();
    },

    meetings: async (parent, args, context) => {
      if(!context.admin)
        throw AuthenticationError;

      return Meeting.find();
    },

    latestMeeting: async (parent, args, context) => {
      if(!context.admin)
        throw AuthenticationError;

      return Meeting.findOne().sort({ date: -1 });
    },

    attendances: async (parent, args, context) => {
      if (!context.admin)
        throw AuthenticationError;

      const meeting = await Meeting.findById(args.meeting);
      if (!meeting)
        throw new Error("Meeting not found");

      const attendances = await Attendance.find({ meeting: args.meeting }).populate("member");

      return attendances;
    }
  },

  Mutation: {
    loginAdmin: async (parent, { username, password }) => {
      const admin = await Admin.findOne({ username });

      if(!admin)
        throw AuthenticationError;

      const correctPassword = await admin.isCorrectPassword(password);
      if(!correctPassword)
        throw AuthenticationError;

      const token = signToken(admin);
      return { token, admin }
    },

    createMeeting: async (parent, args, context) => {
      if (!context.admin)
        throw AuthenticationError;

      const execCount = await Member.countDocuments({ rank: { $in: ["executive", "president"] } });

      const newMeeting = await Meeting.create({ ...args, numExecs: execCount});

      return newMeeting;
    },

    createMember: async (parent, args, context) => {
      if(!context.admin)
        throw AuthenticationError;

      if(args.rank === "president") {
        const president = await Member.findOne({rank: "president"}).exec();

        if(president)
          throw new GraphQLError("There can only be one president");
      }

      const newMember = await Member.create({...args});

      return newMember.populate("emergencyContact");
    },

    createEmergencyContact: async (parent, args, context) => {
      if(!context.admin)
        throw AuthenticationError;

      const newEmergencyContact = await EmergencyContact.create({ ...args });

      return newEmergencyContact;
    },

    attend: async (parent, args, context) => {
      if (!context.admin)
        throw AuthenticationError;

      const meeting = await Meeting.findById(args.meeting);
      if (!meeting)
        throw new GraphQLError("Meeting not found");

      const member = await Member.findOne({ sareID: args.sareID });
      if (!member)
        throw new GraphQLError("Member not found");

      const existingAttendance = await Attendance.findOne({ meeting: args.meeting, member: member._id });
      if (existingAttendance)
        throw new GraphQLError("Member is already attending the meeting");

      const attendance = await Attendance.create({ meeting: args.meeting, member: member._id, joinTime: dayjs().tz(config.timezone).format("HH:mm") });

      if (member.rank === "president" || member.rank === "executive") 
        meeting.execsAttended++;
      else
        meeting.membersAttended++;

      const execCount = await Member.countDocuments({ rank: { $in: ["executive", "president"] } });
      meeting.numExecs = execCount;

      await meeting.save();

      return attendance;
    }
  }
};

module.exports = resolvers;