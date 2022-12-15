const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  deleteReview,
  getProductReviews
} = require("../controllers/productController");
const { isAuthenticatedUser, authorisedRoles } = require("../middleware/auth");
const router = express.Router();

// products routes
router
  .route("/products")
  .get(isAuthenticatedUser, authorisedRoles("admin"), getAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser, createProduct);

// update delete and get product by admin
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

// get product details for all details
router.route("/product/:id").get(getProductDetails);

//review routes enter
router.route("/review").put(isAuthenticatedUser, createProductReview);

// get review
router.route("/reviews").get(getProductReviews)
.delete(isAuthenticatedUser, deleteReview);
module.exports = router;
