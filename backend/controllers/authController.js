const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender, age, lifestyle } = req.body;

    if (!name || !email || !password || !gender || !age || !lifestyle) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already exists:", email);
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, gender, age, lifestyle });

    console.log("New user created:", newUser);

    await newUser.save();

    const createdUser = await User.findOne({ email });

    const token = generateToken(createdUser);
    
    res.status(201).json({ message: "User registered successfully",token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login User Function
const loginUser = async (req, res) => {
  try {
    console.log("Login request received");

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("User found:", user.email);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Login successful for:", user.email);

    res.json({
      message: "Login successful",
      token: generateToken(user._id,user.email,user.name),
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
