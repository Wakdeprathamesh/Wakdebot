const express = require("express");
const { updatePrakriti, getPrakriti } = require("../controllers/prakritiController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/:userId", protect, updatePrakriti);
router.get("/:userId", protect, getPrakriti);

module.exports = router;