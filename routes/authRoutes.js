const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/auth/google/callback", passport.authenticate("google"), function (
    req,
    res
  ) {
    // Successful authentication, redirect home.
    console.log("it worked!");
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/logout", (req, res) => {
    console.log("logging out")
    req.logout();
    res.redirect("/");
  });
};
