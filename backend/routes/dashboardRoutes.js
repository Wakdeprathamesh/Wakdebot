const express = require("express");
const { getDashboardData } = require("../controllers/dashboardController"); // Ensure correct import

const router = express.Router();

// ✅ Ensure `getDashboardData` is a function
// router.get("/:userId", getDashboardData);

module.exports = router;