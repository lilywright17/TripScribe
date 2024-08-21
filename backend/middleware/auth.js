const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.js');

const jwtAuthentication = (req, res, next) => {
  // Get token from Authorization header
  const jwtToken = req.header("Authorization");

  try {
    if (!jwtToken) {
      return res.status(401).json({
        message: "Unauthorized, token is missing",
      });
    }

    // Remove 'Bearer ' prefix
    const token = jwtToken.split(" ")[1];

    // Verify and decode the token
    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          // Handle token expiration specifically
          return res.status(401).json({ error: "Token expired, please log in again" });
        } else {
          // Handle other token verification errors
          return res.status(403).json({ error: "Forbidden, invalid token" });
        }
      }

      // Log token expiration time in GMT
      const expirationTime = new Date(decoded.exp * 1000).toGMTString();
      console.log(`Token expires at (GMT): ${expirationTime}`);

      // Assign the decoded token to req.user
      req.user = decoded;
      next(); // Continue to the next route
    });
  } catch (error) {
    console.error("Error during JWT authentication:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = jwtAuthentication;