require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt'); 
const jwtAuthentication = require('../middleware/auth');

describe('JWT Authentication Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            header: jest.fn(),
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should return 401 if no token is provided', () => {
        req.header.mockReturnValue(null);

        jwtAuthentication(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized, token is missing" });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if the token is expired', () => {
        const expiredToken = jwt.sign({ userID: 1, email: 'test@example.com' }, jwtConfig.secret, { expiresIn: '-1s' });
        req.header.mockReturnValue(`Bearer ${expiredToken}`);

        jwtAuthentication(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: "Token expired, please log in again" });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if the token is invalid', () => {
        req.header.mockReturnValue('Bearer invalidToken');
    
        jwtAuthentication(req, res, next);
    
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: "Forbidden, invalid token" });
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next if the token is valid', () => {
        const validToken = jwt.sign({ userID: 1, email: 'test@example.com' }, jwtConfig.secret, { expiresIn: '1h' });
        req.header.mockReturnValue(`Bearer ${validToken}`);

        jwtAuthentication(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});