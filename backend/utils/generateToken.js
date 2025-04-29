const jwt = require("jsonwebtoken");

const generateToken = (id, email, name) => {
  return jwt.sign({ id, email, name }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  
};

module.exports = generateToken;