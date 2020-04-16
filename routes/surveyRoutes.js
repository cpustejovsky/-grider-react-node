const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const requireCredits = require("../middleware/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
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
    // const error = {
    //   message: "Response error",
    //   response: {
    //     statusCode: 403,
    //     body: {
    //       errors: [
    //         {
    //           message:
    //             "The from address does not match a verified Sender Identity. Mail cannot be sent until this error is resolved. Visit https://sendgrid.com/docs/for-developers/sending-email/sender-identity/ to see the Sender Identity requirements",
    //           field: "from",
    //           help: null,
    //         },
    //       ],
    //     },
    //     headers: {
    //       server: "nginx",
    //       date: "Thu, 16 Apr 2020 21:32:05 GMT",
    //       "content-type": "application/json",
    //       "content-length": "281",
    //       connection: "close",
    //       "access-control-allow-origin": "https://sendgrid.api-docs.io",
    //       "access-control-allow-methods": "POST",
    //       "access-control-allow-headers":
    //         "Authorization, Content-Type, On-behalf-of, x-sg-elas-acl",
    //       "access-control-max-age": "600",
    //       "x-no-cors-reason":
    //         "https://sendgrid.com/docs/Classroom/Basics/API/cors.html",
    //     },
    //   },
    // };
  });
};
