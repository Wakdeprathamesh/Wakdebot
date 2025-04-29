const Herb = require("../models/Herb");
const asyncHandler = require("express-async-handler");

// Add one or more herbs
const addHerbs = asyncHandler(async (req, res) => {
  const herbData = req.body; // Expecting an array of herbs or a single herb object

  try {
    // Check if the input is an array or a single object
    if (Array.isArray(herbData)) {
      // Insert multiple herbs
      const savedHerbs = await Herb.insertMany(herbData);
      res.status(201).json({
        message: "Herbs added successfully",
        herbs: savedHerbs
      });
    } else {
      // Insert a single herb
      const herb = new Herb(herbData);
      const savedHerb = await herb.save();
      res.status(201).json({
        message: "Herb added successfully",
        herb: savedHerb
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Error adding herbs: " + error.message);
  }
});

// Fetch herb details by name
const getHerbByName = asyncHandler(async (req, res) => {
    const herbName = req.params.name;
  
    try {
      const herb = await Herb.findOne({ name: herbName });
      if (!herb) {
        res.status(404);
        throw new Error("Herb not found");
      }
      res.status(200).json(herb);
    } catch (error) {
      res.status(500);
      throw new Error("Error fetching herb details: " + error.message);
    }
  });
  
  module.exports = { getHerbByName, addHerbs };