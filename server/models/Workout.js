const { Schema, model } = require('mongoose');

// const exerciseSchema = new Schema({
//   name: { 
//     type: String, 
//     required: true 
//   },
//   sets: { 
//     type: Number, 
//     required: true, 
//     min: 1 
//   },
//   reps: { 
//     type: Number, 
//     required: true, 
//     min: 1 
//   },
//   weight: { 
//     type: Number, 
//     required: false, 
//     min: 0 
//   },
// });

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
    // exercises: [exerciseSchema],
    duration: { 
      type: Number, 
      required: true, 
      min: 1 
    },
    caloriesBurned: { 
      type: Number, 
      required: true, 
      min: 0 
    },
  },
  { timestamps: true }
);

// workoutSchema.virtual("totalWeight").get(function () {
//   return this.exercises.reduce(
//     (total, exercise) =>
//       total + exercise.weight * exercise.reps * exercise.sets,
//     0
//   );
// });

// workoutSchema.methods.addExercise = function (exercise) {
//   this.exercises.push(exercise);
//   return this.save();
// };

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
