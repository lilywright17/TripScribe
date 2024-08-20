//  JWT secret key config file
const jwtConfig = {
    secret: process.env.JWT_SECRET, 
    expiresIn: '1min'
};

module.exports = jwtConfig;