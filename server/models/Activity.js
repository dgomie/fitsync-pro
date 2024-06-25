const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const activitySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  },
  activityType: {
    type: String,
    required: true, 
    enum: ['running', 'cycling', 'swimming'], 
  },
  duration: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true, 
  toJSON: { getters: true }, 
});

// Custom getter for createdAt to format the date
activitySchema.path('createdAt').get(function (value) {
  return dateFormat(value);
});

const Activity = model("Activity", activitySchema);

module.exports = Activity;