const { User, Workout } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },

    user: async (parent, { userId }) => {
      return await User.findById(userId);
    },
  },

  Mutation: {
    addUser: async (parent, { userData }) => {
      const newUser = new User({
        username: userData.username,
        password: userData.password,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
        activityLevel: userData.activityLevel,
      });
      const token = signToken(newUser);
      return { token, newUser };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);

      return { token, user };
    },

    removeUser: async (parent, { userId }) => {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error("User not found.");
      }
      return deletedUser;
    },

    updateUser: async (_, { userId, updateData }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        updateData,
        { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
