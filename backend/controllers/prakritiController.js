const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const updatePrakriti = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { constitution, doshas, recommendations } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.prakriti = {
      constitution,
      doshas,
      recommendations,
      lastUpdated: new Date()
    };

    const updatedUser = await user.save();

    res.json({
      message: "Prakriti updated successfully",
      prakriti: updatedUser.prakriti
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error updating prakriti: " + error.message);
  }
});

const getPrakriti = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json({
      prakriti: user.prakriti || null
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching prakriti: " + error.message);
  }
});

module.exports = { updatePrakriti, getPrakriti };