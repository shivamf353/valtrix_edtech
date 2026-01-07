const razorpay = require("razorpay")

exports.instance = new Razorpay({
  key_id: process.env.razorpay_id,
  key_secret: process.env.razorpay_secret,
});
