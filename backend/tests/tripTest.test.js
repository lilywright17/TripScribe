const { getTrips, getTripByID } = require('../controllers/tripController');
const db = require('../config/db'); 

jest.mock('../config/db'); 

describe('Trip Controller Unit Tests', () => {
  const mockTrips = [
    {
      tripID: 1,
      city: 'Paris',
      country: 'France',
      description: 'My trip to Paris',
      startDate: '2021-04-20',
      endDate: '2021-04-25',
      photos: [
        { photoID: 1, url: 'https://res.cloudinary.com/danpcw54r/image/upload/v1723910803/pexels-lichtberlin-19166326_wl2ltx.jpg', alt_text: null },
      ],
    },
  ];

  const mockNoTrips = [];

  const req = {
    user: { userID: 1 },
    params: { tripID: 1 },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    end: jest.fn(),
};

  // Mocking console.log and console.error to suppress output during tests
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTrips', () => {
    it('Returning all the trips for the user', async () => {
      db.query.mockResolvedValueOnce([mockTrips]);

      await getTrips(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTrips);
    });

    it('Return 204 - user has no trips', async () => {
        db.query.mockResolvedValueOnce([mockNoTrips]);
    
        await getTrips(req, res);
    
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).not.toHaveBeenCalled(); 
        expect(res.end).toHaveBeenCalled(); 
    });

    it('Return 500 - server error occurs', async () => {
      db.query.mockRejectedValueOnce(new Error('Database error'));

      await getTrips(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while fetching trips' });
    });
  });

  describe('getTripByID', () => {
    it('Returns the specified trip by tripID', async () => {
      db.query.mockResolvedValueOnce([mockTrips]);

      await getTripByID(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTrips[0]);
    });

    it('Return 404 when the trip does not exist', async () => {
        db.query.mockResolvedValueOnce([[]]); 
      
        await getTripByID(req, res);
      
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Trip was not found!' });
    });

    it('Return 500 when an error occurs', async () => {
      db.query.mockRejectedValueOnce(new Error('Database error'));

      await getTripByID(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while fetching trips' });
    });
  });
});

