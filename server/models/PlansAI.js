const { text } = require('express');
const { Schema, model } = require('mongoose');

const AIplanSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    plan: { 
      type: String, 
      required: true, 
    },
  },
  { timestamps: true }
);

AIplanSchema.pre('save', function(next) {
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const year = currentDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  // Append the current date to the title
  this.title = `${this.title} - ${formattedDate}`;

  next();
});

const AIplan = model("AIplan", AIplanSchema);

module.exports = AIplan;
