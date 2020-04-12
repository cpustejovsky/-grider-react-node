const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(
  `mongodb+srv://cpustejovsky:${keys.MONGODB_PASSWORD}@cluster0-rwgbh.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    keys: [keys.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<h1>Home Page!</h1><div><a href='/auth/google'>Login</a></div><div><a href='/logout'>Logout</a></div><div><a href='/api/current_user'>Check Current User</a></div>");
});

app.listen(PORT, console.log(`listening on port ${PORT} \n ${process.env.NODE_ENV}`));
