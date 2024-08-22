const deleteTrip = require('../controllers/deleteTripController');
const db = require('../config/db');

// Mocking the database queries
jest.mock('../config/db', () => ({
    query: jest.fn()
}));

describe('deleteTrip Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {},
            user: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    
        // Spying on the console.error
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    
    afterEach(() => {
        jest.restoreAllMocks();
    });
    // Simulating no tripID was provided
    it('Return 400 when no tripID is provided', async () => {
        req.params.tripID = null;

        await deleteTrip(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Trip ID is needed!' });
    });
    // Simulating no trip found
    it('Return 404 when the trip does not exist or no permissions are given', async () => {
        req.params.tripID = 1;
        req.user.userID = 1;

        db.query.mockResolvedValueOnce([[]]); 

        await deleteTrip(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Trip not found or you do not have permission to delete it' });
    });
    // Simulating that the trip exists,which will delete Photos,Trip_Location and then Trip entries
    it('Return 200 when the trip is successfully deleted', async () => {
        req.params.tripID = 1;
        req.user.userID = 1;

        // Simulating that the trip is found, then deleting Photos,Trip_Location and then Trip
        db.query.mockResolvedValueOnce([[{ tripID: 1 }]]); 
        db.query.mockResolvedValueOnce();
        db.query.mockResolvedValueOnce();
        db.query.mockResolvedValueOnce(); 

        await deleteTrip(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Successfully deleted Trip and Photos!' });
    });
    // Simulating an error during the deletion process to check for res.status(500)
    it('Return 500 when an error occurs during deletion', async () => {
        req.params.tripID = 1;
        req.user.userID = 1;
    
        db.query.mockResolvedValueOnce([[{ tripID: 1 }]]); 

        db.query.mockRejectedValueOnce(new Error('Database error')); 
    
        await deleteTrip(req, res);
    
        expect(db.query).toHaveBeenCalledWith('ROLLBACK');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while deleting the trip' });
        expect(console.error).toHaveBeenCalledWith('Error deleting trip:', expect.any(Error));
    });
});