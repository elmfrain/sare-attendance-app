const { GraphQLError } = require('graphql');
const { Admin, Attendance, Meeting, Member, EmergencyContact } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

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
    }
  }
};

module.exports = resolvers;