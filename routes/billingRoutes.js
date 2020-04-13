const keys = require("../config/keys");
const stripe = require("stripe")(keys.STRIPE_API_SECRET_KEY);
const requireLogin = require("../middleware/requireLogin");
module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id,
      description: "$5 USD for 5 credit for 5 email survey campaigns credits",
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
