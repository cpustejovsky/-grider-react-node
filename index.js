const express = require("express");
require("./services/passport");

const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("you hit the home page!");
});

app.listen(PORT, console.log(`listening on port ${PORT}`));
