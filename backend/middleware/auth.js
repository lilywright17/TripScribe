//  Middleware function to verify the JWT token before allowing access to protected routes
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

    jwt.verify(jwtToken.split(" ")[1], jwtConfig.secret, (err, user) => {
      // Checking if the JWT token is invalid or expired
      if (err) {
        return res.status(403).json({ error: "Forbidden, invalid or expired token" });
      }

      // Ensure that the decoded user information has an ID or essential property
      if (!user || !user.id) {
        return res.status(401).json({ error: "Unauthorized, invalid token payload" });
      }

      req.user = user;
      next(); // Continue to the next route
    });
  } catch (error) {
    console.error("Error during JWT authentication:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = jwtAuthentication;