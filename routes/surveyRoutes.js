const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const requireCredits = require("../middleware/requireCredits");
const Survey = mongoose.model("surveys");
module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {});
  app.post(
    "/api/surveys",
    requireLogin,
    requireCredits,
    async (req, res) => {}
  );
  app.post("/api/surveys/webhooks", async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    survey = await new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      // User model is is available via mongoose already
      _user: req.user.id,
      dateSent: Date.now(),
    });


    await survey.save();
    req.user.credits--;
    await req.user.save();
  });
};
