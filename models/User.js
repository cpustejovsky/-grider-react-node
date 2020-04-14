const mongoose = require("mongoose");
const { Schema } = mongoose;
const SurveySchema = require("./Survey")
const UserSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  email: String,
  credits: {
    type: Number,
    default: 0
  },
  surveys: [SurveySchema]
});

mongoose.model("users", UserSchema);
