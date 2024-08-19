//  Middleware function to verify the JWT token before allowing access to protected routes
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
                return res.status(401).json({ error: "Token expired, please log in again" });
            }
            return res.status(403).json({ error: "Forbidden, invalid token" });
        }
        
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