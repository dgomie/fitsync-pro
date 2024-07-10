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


const AIplan = model("AIplan", AIplanSchema);

module.exports = AIplan;
