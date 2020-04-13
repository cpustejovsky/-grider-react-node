const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  email: String,
  credits: {
    type: Number,
    default: 0
  }
});

mongoose.model("users", UserSchema);
