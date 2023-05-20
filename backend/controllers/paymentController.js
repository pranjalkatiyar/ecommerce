const catchAsyncErrors = require("../middleware/catchAsyncError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommmerce",
    },
  });
console.log("entered,",myPayment);
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});


// Send stripe API Key   =>   /api/v1/stripeapi

exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
  console.log(process.env.STRIPE_API_KEY);
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY,
    });
    }
);