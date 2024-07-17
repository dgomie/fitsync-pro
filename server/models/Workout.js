const { Schema, model } = require('mongoose');


const workoutSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    workoutTitle: {
      type: String,
      required: true,
    },
    dateOfWorkout: {
      type: String,
      required: true,
    },
    duration: { 
      type: Number, 
      required: false, 
      min: 1 
    },
    caloriesBurned: { 
      type: Number, 
      required: false, 
      min: 0 
    },
  },
  { timestamps: true }
);


const Workout = model("Workout", workoutSchema);

module.exports = Workout; 
