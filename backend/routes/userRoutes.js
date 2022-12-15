const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getSingleUserDetails,
  updateRoleUserProfile,
  deleteUserByAdmin
} = require("../controllers/userController");
const { isAuthenticatedUser, authorisedRoles } = require("../middleware/auth");
// register touter
router.route("/register").post(registerUser);

// login router
router.route("/login").post(loginUser);

// forgot password router
router.route("/forgotpassword").post(forgotPassword);

// reset password router
router.route("/password/reset/:token").put(resetPassword);

// logout router
router.route("/logout").get(logout);

// user details router
router.route("/me").get(isAuthenticatedUser, getUserDetails);

// update user password details router
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);

// update user profile
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);

// admin routes---------------------------------------------
// get all users
router.route("/admin/users").get(isAuthenticatedUser,authorisedRoles("admin"), getAllUsers);

// get user details and delete user
router.route("/admin/user/:id").get(isAuthenticatedUser,authorisedRoles("admin"), getSingleUserDetails)
.put(isAuthenticatedUser,authorisedRoles("admin"),updateRoleUserProfile)
.delete(isAuthenticatedUser,authorisedRoles("admin"),deleteUserByAdmin);

module.exports = router;
