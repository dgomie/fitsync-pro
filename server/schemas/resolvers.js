const { User, Workout, PlansAI} = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },

    user: async (parent, { userId }) => {
      return await User.findById(userId);
    },
    
    aiPlans: async (parent, { userId }) => {
      return await PlansAI.find({ userId: userId });
    },
    
  },

  Mutation: {
    addUser: async (parent, { userData }) => {
      const newUser = await User.create({
        username: userData.username,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
        activityLevel: userData.activityLevel,
      });
      const token = signToken(newUser);
      return { token, user: newUser };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

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
    createAIplan: async (_, { userId, plan }) => {
      const newAIplan = new PlansAI({ userId, plan });
      await newAIplan.save();
      return newAIplan;
    },
    deleteAIplan: async (_, { id }) => {
      await PlansAI.findByIdAndDelete(id);
      return `AIplan with ID ${id} was deleted successfully.`;
    },
  }
}
module.exports = resolvers;
