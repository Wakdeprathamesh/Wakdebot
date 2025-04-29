const express = require("express");
const { addHerbs , getHerbByName } = require("../controllers/herbController");

const router = express.Router();

// POST /api/herbs - Add one or more herbs
router.post("/", addHerbs);
router.get("/:name", getHerbByName);

module.exports = router;