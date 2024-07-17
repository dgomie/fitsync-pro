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
      return await PlansAI.find({ userId: userId }).sort({ createdAt: -1 });
    },

    workouts: async (parent, { userId }) => {
      return await Workout.find({ userId: userId }).sort({ createdAt: -1 });
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
        durationGoal: userData.durationGoal,
        workoutGoal: userData.workoutGoal
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
    createAIplan: async (_, { userId, title, plan }) => {
      try {
        const newAIplan = new PlansAI({ userId, title, plan });
        await newAIplan.save();
        return newAIplan;
      } catch (error) {
        console.error("Error creating AI plan:", error);
        throw new Error("Failed to create AI plan.");
      }
    },
    deleteAIplan: async (_, { id }) => {
      await PlansAI.findByIdAndDelete(id);
      return id;
    },
    createWorkout: async (_, { input }) => {
      try {
        const newWorkout = new Workout(input);
        const savedWorkout = await newWorkout.save();
        return savedWorkout;
      } catch (error) {
        throw new Error('Failed to create workout');
      }
    },

    deleteWorkout: async (_, { id }) => {
      await Workout.findByIdAndDelete(id);
      return id;
    },

    updateWorkout: async (_, { id, input }) => {
      try {
        const updatedWorkout = await Workout.findByIdAndUpdate(id, input, { new: true });
        if (!updatedWorkout) {
          throw new Error('Workout not found');
        }
        return updatedWorkout;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update workout');
      }
    },
  }
}
module.exports = resolvers;
