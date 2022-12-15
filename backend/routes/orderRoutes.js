const express = require("express");
 const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
  
} = require("../controllers/orderControllers");
const router = express.Router();
const { isAuthenticatedUser, authorisedRoles } = require("../middleware/auth");

// new order
router.route("/order/new").post(isAuthenticatedUser, newOrder);

// get single order
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

// my order
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

// all orders--admin
router.route("/admin/orders").get(isAuthenticatedUser,authorisedRoles("admin"), allOrders);

// update order --admin
router.route("/admin/order/:id").put(isAuthenticatedUser,authorisedRoles("admin"), updateOrder);

// delete order --admin
router.route("/admin/order/:id").delete(isAuthenticatedUser,authorisedRoles("admin"), deleteOrder);


module.exports=router;