//  Middleware function to verify the JWT token before allowing access to protected routes
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.js'); 

const jwtAthentication = (req, res, next) => {

  const jwtToken = req.header("Authorization");

  try {
    if (!jwtToken) {
      return res.status(401).json({
        message: "Unauthorized, token is missing",
      });
    }

    jwt.verify(jwtToken.split(" ")[1], jwtConfig.secret, (err, user) => {
      // Checking of invalid or expired jwt token
      if (err) {
        return res.status(403).json({ error: "Forbidden,  invalid or expired token" });
      }

      req.user = user;
      next(); //contunie to the next route
    });
  } catch (error) {
    console.error("Error during JWT authentication:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = jwtAthentication;