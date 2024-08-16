require('dotenv').config();
const { addNewTrip } = require('../controllers/newTripController');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

describe('addNewTrip Controller', () => {
    let req, res;
    const jwtSecret = process.env.JWT_SECRET || 'testsecret';

    beforeEach(() => {
        const token = jwt.sign({ id: '12345' }, jwtSecret, { expiresIn: '1h' });

        req = {
            headers: {
                authorization: `Bearer ${token}`,
            },
            header: jest.fn().mockImplementation((name) => req.headers[name.toLowerCase()]),
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
        db.beginTransaction = jest.fn().mockResolvedValue();
        db.commit = jest.fn().mockResolvedValue();
        db.rollback = jest.fn().mockResolvedValue();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockDBInsertTrip = () => {
        db.query.mockResolvedValueOnce([{ insertId: 1 }]); // Mock trip ID return
    };

    const mockDBInsertTripAndPhotos = () => {
        db.query.mockResolvedValueOnce([{ insertId: 1 }]) // Mock trip ID return
            .mockResolvedValueOnce({}) // Mock first photo insert
            .mockResolvedValueOnce({}); // Mock second photo insert
    };

    describe('Successful Scenarios', () => {
        test('should successfully add a new trip without photos', async () => {
            mockDBInsertTrip();

            await addNewTrip(req, res);

            expect(db.beginTransaction).toHaveBeenCalled();
            expect(db.query).toHaveBeenCalledTimes(1); // Only the Trips table should be queried
            expect(db.commit).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Trip saved successfully!', tripID: 1 });
        });

        test('should successfully add a new trip with photos', async () => {
            req.body.imgUrls = ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'];
            mockDBInsertTripAndPhotos();

            await addNewTrip(req, res);

            expect(db.beginTransaction).toHaveBeenCalled();
            expect(db.query).toHaveBeenCalledTimes(3); // 1 for Trips, 2 for Photos
            expect(db.commit).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Trip and photos saved successfully!', tripID: 1 });
        });
    });

    describe('Error Handling Scenarios', () => {
        test('should handle database error when adding a new trip', async () => {
            // Mock the db.query to reject with an error
            db.query.mockRejectedValueOnce(new Error('Database error'));
        
            // Spy on console.error to prevent actual logging during tests
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
            // Execute the function under test
            await addNewTrip(req, res);
        
            // Assert that db.rollback was called due to the error
            expect(db.rollback).toHaveBeenCalled();
        
            // Assert that the correct status and error response were sent
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to add trip' });
        
            // Restore the original console.error implementation
            consoleSpy.mockRestore();
        });

        test('should return 401 if user is not authenticated', async () => {
            req.user = null; // Simulate no user being authenticated

            await addNewTrip(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not authenticated' });
        });
    });
});