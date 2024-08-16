require('dotenv').config(); 
const { addNewTrip } = require('../controllers/newTripController');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

describe('addNewTrip', () => {
    let req, res;
    const jwtSecret = process.env.JWT_SECRET || 'testsecret'; 

    beforeEach(() => {
        // Generate a real token for testing
        const token = jwt.sign({ id: '12345' }, jwtSecret, { expiresIn: '1h' });
    
        // Mock request and response objects
        req = {
            headers: {
                authorization: `Bearer ${token}`
            },
            header: jest.fn().mockImplementation((name) => {
                return req.headers[name.toLowerCase()];
            }),
            body: {
                city: 'Paris',
                country: 'France',
                description: 'A lovely trip to Paris.',
                date_from: '2024-09-01',
                date_to: '2024-09-10',
                imgUrls: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg']
            },
            user: {} // This will be populated by the jwtAuthentication middleware
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    
        // Mock db methods
        db.query = jest.fn();
        db.beginTransaction = jest.fn().mockImplementation(callback => callback(null));
        db.commit = jest.fn().mockImplementation(callback => callback(null));
        db.rollback = jest.fn().mockImplementation(callback => callback());
    });

    afterEach(() => {
        jest.clearAllMocks(); // Resets all mock states after each test
    });

    test('should successfully add a new trip', async () => {
        // Mock DB query to insert a new trip
        db.query.mockImplementation((query, values, callback) => {
            console.log('DB Query Called:', query);  // Debug log
            if (query.includes('INSERT INTO Trips')) {
                callback(null, { insertId: 1 }); // Mock tripID returned from DB
            } else if (query.includes('INSERT INTO Photos')) {
                callback(null, {}); // Mock successful photo insertion
            }
        });

        // Call the middleware to simulate JWT verification and user extraction
        const jwtAuthentication = require('../middleware/auth');
        jwtAuthentication(req, res, () => {
            req.user = { id: '12345' }; // Simulate the user being set by the middleware
        });

        await addNewTrip(req, res);

        console.log('DB Begin Transaction Called:', db.beginTransaction.mock.calls.length);
        console.log('DB Query Calls:', db.query.mock.calls.length);
        console.log('DB Commit Called:', db.commit.mock.calls.length);

        expect(db.beginTransaction).toHaveBeenCalled();
        expect(db.query).toHaveBeenCalledTimes(3); // 1 for trip, 2 for photos
        expect(db.commit).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Trip and photos saved successfully!', tripID: 1 });
    });

    test('should handle database error when adding a new trip', async () => {
        // Mock DB query to fail
        db.query.mockImplementation((query, values, callback) => {
            console.log('DB Query Failed:', query);  // Debug log
            if (query.includes('INSERT INTO Trips')) {
                callback(new Error('Database error'), null);
            }
        });

        // Mock console.error to suppress error messages in test output
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Call the middleware to simulate JWT verification and user extraction
        const jwtAuthentication = require('../middleware/auth');
        jwtAuthentication(req, res, () => {
            req.user = { id: '12345' }; // Simulate the user being set by the middleware
        });

        await addNewTrip(req, res);

        expect(db.rollback).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to save trip. Please try again later.' });

        // Restore console.error after the test
        consoleSpy.mockRestore();
    });

    test('should return 401 if user is not authenticated', async () => {
        // Simulate an empty userID
        req.user = null;

        await addNewTrip(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not authenticated' });
    });
});



