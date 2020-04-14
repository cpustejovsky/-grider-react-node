const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");
const SurveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  dateSent: Date,
  lastResponded: Date,
  //every survey is going to belong to a specific User
  //the "_" is a convention for relationships between models
  _user: { type: Schema.Types.ObjectId, ref: "User" },

});

mongoose.model("surveys", SurveySchema);
