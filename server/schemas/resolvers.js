const { User, Workout } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },

    user: async (parent, { userId }) => {
      return await User.findById(userId);
    }
  },

  Mutation: {
    addUser: async (parent, { userData }) => {
      try {
        const newUser = new User({
          username: userData.username,
          password: userData.password,
          email: userData.email,
          dateOfBirth: userData.dateOfBirth,
          activityLevel: userData.activityLevel
        });
        await newUser.save();
        return newUser;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create user.');
      }
    },

    removeUser: async (parent, { userId }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
          throw new Error('User not found.');
        }
        return deletedUser;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete user.');
      }
    },

    updateUser: async (_, { userId, updateData }) => {
      const updatedUser = await User.findOneAndUpdate({ _id: userId }, updateData, { new: true });
      return updatedUser;
    },

  },
};


module.exports = resolvers;