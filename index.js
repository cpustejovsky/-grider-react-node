const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/User")
require("./services/passport");

mongoose.connect(
  `mongodb+srv://cpustejovsky:${keys.MONGODB_PASSWORD}@cluster0-rwgbh.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("you hit the home page!");
});

app.listen(PORT, console.log(`listening on port ${PORT}`));
