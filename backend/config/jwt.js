//  JWT secret key config file
const jwtConfig = {
    secret: process.env.JWT_SECRET, 
    expiresIn: '30min'
};

module.exports = jwtConfig;