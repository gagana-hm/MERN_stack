const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../configs/dbconfig");

const authenticate = (req, res, next) => {
  // Authentication middleware logic
  try {
    const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        status: "fail",
        message: "Unauthorized Request",
      });
    }
    const token = authHeader.substring(7); // Remove "Bearer " prefix
    const verified = jwt.verify(token, jwtSecretKey);
    if (!verified) {
      res.status(401).json({
        status: "fail",
        message: "Unauthorized Request",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized Request",
    });
  }
};

module.exports = { authenticate };
