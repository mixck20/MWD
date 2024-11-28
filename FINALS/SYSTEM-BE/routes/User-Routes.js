const express = require("express");
// Express routing component
const router = express.Router();
const userController = require("../controllers/User-Controller.js");
const { verify } = require("../auth.js");


// User Registration
router.post("/register", userController.registerUser);

// User Login 
router.post("/login", userController.loginUser);

// Check if email exists
router.post("/check-email", userController.checkEmail);

// Get user profile
router.post("/details", userController.getProfile);

// Get user 
router.post("/enroll", verify, userController.enroll);

module.exports = router;
  