require('dotenv').config({ path: '../.env' });
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = process.env.SESSION_SECRET;
const expiration = '48h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ email, username, _id, age, activityLevel}) {
    const payload = { email, username, _id, age, activityLevel};
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
