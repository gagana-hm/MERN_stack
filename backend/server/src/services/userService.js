const jwt = require("jsonwebtoken");
const { db, port } = require("../configs/dbconfig"); // Adjust the path

function generateAccessToken(user) {
  // Generate token logic
  try {
    const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
    return jwt.sign(user, jwtSecretKey);
  } catch (error) {
    console.error("Failed to generate access token:", error);
    return null;
  }
}

module.exports = { generateAccessToken };

