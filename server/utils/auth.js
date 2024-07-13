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
  verifyJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Assuming Bearer token
      jwt.verify(token, process.env.SESSION_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401); // Unauthorized
    }
  },
  signToken: function ({ email, username, _id, age, activityLevel, avatarUrl }) {
    const payload = { email, username, _id, age, activityLevel, avatarUrl };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
