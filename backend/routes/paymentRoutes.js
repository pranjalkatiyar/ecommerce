const router=require('express').Router();
const { isAuthenticatedUser} = require("../middleware/auth");
const {processPayment,sendStripApi}=require('../controllers/paymentController');

router.route('/payment/process').post(isAuthenticatedUser,processPayment);
router.route('/stripeapi').get(isAuthenticatedUser,sendStripApi);
module.exports=router;