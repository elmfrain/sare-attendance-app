const { Admin, Attendance, Meeting, Member } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {

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
    }
  }
};

module.exports = resolvers;