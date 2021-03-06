const mongoose = require("mongoose");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const requireLogin = require("../middleware/requireLogin");
const requireCredits = require("../middleware/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });
  app.get("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const userSurveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    res.send(userSurveys);
  });
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.post("/api/surveys/webhooks", (req, res) => {
    console.log("webhook route hit!");
    _.chain(req.body)
      .map(({ url, email }) => {
        const p = new Path("/api/surveys/:surveyId/:choice");
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice,
          };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ email, choice, surveyId }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, clicked: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.clicked": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();
    res.send({});
  });
};
