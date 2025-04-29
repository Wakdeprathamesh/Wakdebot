const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser); // Add login route

module.exports = router;
