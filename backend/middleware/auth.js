const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.js');

const jwtAuthentication = (req, res, next) => {
  const jwtToken = req.header("Authorization");

  try {
    if (!jwtToken) {
      return res.status(401).json({
        message: "Unauthorized, token is missing",
      });
    }

    // Remove 'Bearer' prefix
    const token = jwtToken.split(" ")[1];

    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: "Token expired, please log in again" });
        } else {
          return res.status(403).json({ error: "Forbidden, invalid token" });
        }
      }

      req.user = decoded;
      next(); 
    });
  } catch (error) {
    console.error("Error during JWT authentication:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = jwtAuthentication;