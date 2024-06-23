const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const workoutSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  exercises: [
    {
      name: {
        type: String,
      },
      sets: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      weight: {
        type: Number,
      },
    },
  ],
  duration: {
    type: Number,
  },
  caloriesBurned: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
