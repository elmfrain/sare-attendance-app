const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

require('dotenv').config()
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED'
    }
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if(req.headers.authorization)
      token = token.split(' ').pop().trim();

    if(!token)
      return req;

    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET, { maxAge: expiration });
      req.admin = data;
    } catch {
      console.log('Invalid Token')
    }

    return req;
  },
  signToken: function({username,  _id}) {
    const payload = { username, _id };
    return jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: expiration });
  }
}