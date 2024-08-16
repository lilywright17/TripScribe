require('dotenv').config();
const { addNewTrip } = require('../controllers/newTripController');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

describe('addNewTrip', () => {
    let req, res;
    const jwtSecret = process.env.JWT_SECRET || 'testsecret';

    beforeEach(() => {
        // Generate a test token
        const token = jwt.sign({ id: '12345' }, jwtSecret, { expiresIn: '1h' });

        // Mock request and response objects
        req = {
            headers: {
                authorization: `Bearer ${token}`,
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
                imgUrls: [], // Start with no photos for the first test
            },
            user: { id: '12345' },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };

        // Mock database methods
        db.query = jest.fn();
        db.beginTransaction = jest.fn().mockImplementation((callback) => callback(null));
        db.commit = jest.fn().mockImplementation((callback) => callback(null));
        db.rollback = jest.fn().mockImplementation((callback) => callback());
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    // Scenario 1: Upload Only to the Trip Table
    test('should successfully add a new trip without photos', async () => {
        // Mock DB query to insert a new trip
        db.query.mockImplementation((query, values, callback) => {
            if (query.includes('INSERT INTO Trips')) {
                callback(null, { insertId: 1 }); // Mock trip ID return
            }
        });

        await addNewTrip(req, res);

        expect(db.beginTransaction).toHaveBeenCalled();
        expect(db.query).toHaveBeenCalledTimes(1); // Only the Trips table should be queried
        expect(db.commit).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Trip saved successfully!', tripID: 1 });
    });

    // Scenario 2: Upload to the Trip Table + Photos Table
    test('should successfully add a new trip with photos', async () => {
        // Modify the request to include photos
        req.body.imgUrls = ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'];

        db.query.mockImplementation((query, values, callback) => {
            if (query.includes('INSERT INTO Trips')) {
                callback(null, { insertId: 1 }); // Mock trip ID return
            } else if (query.includes('INSERT INTO Photos')) {
                callback(null, {}); // Mock successful photo insertions
            }
        });

        await addNewTrip(req, res);

        expect(db.beginTransaction).toHaveBeenCalled();
        expect(db.query).toHaveBeenCalledTimes(3); // 1 for Trips, 2 for Photos
        expect(db.commit).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Trip and photos saved successfully!', tripID: 1 });
    });

    // Error Handling Scenario: Database Error
    test('should handle database error when adding a new trip', async () => {
        // Mock DB query to fail
        db.query.mockImplementation((query, values, callback) => {
            if (query.includes('INSERT INTO Trips')) {
                callback(new Error('Database error'), null);
            }
        });

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await addNewTrip(req, res);

        expect(db.rollback).toHaveBeenCalled(); // Ensure rollback is called
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to save trip. Please try again later.' });

        // Restore console.error after the test
        consoleSpy.mockRestore();
    });

    // Authentication Handling Scenario
    test('should return 401 if user is not authenticated', async () => {
        req.user = null; // Simulate no user being authenticated

        await addNewTrip(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not authenticated' });
    });
});