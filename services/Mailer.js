const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(),
    });
    const response = this.sgApi.API(request);
    return response;
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => new helper.Email(email));
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.SENDGRID_API_KEY);
    this.recipients = this.formatAddresses(recipients);
    this.from_email = new helper.Email("noreply@emaily.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
    this.send();
  }
}

module.exports = Mailer;
