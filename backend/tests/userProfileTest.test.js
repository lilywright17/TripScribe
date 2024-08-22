const { getUserProfile } = require('../controllers/userProfileController');
const db = require('../config/db');

// Mocking the db query
jest.mock('../config/db', () => ({
  query: jest.fn(),
}));

// Mocking the helper function getUserById
const { getUserById } = require('../controllers/userProfileController');

describe('getUserProfile', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { userID: 1 },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // Test when the user is found successfully, making sure that the controller did return a '404'
  it('should return user data when user is found', async () => {
    const mockUser = { userID: 1, fullname: 'Ada Lovelace', username: 'adalovelace', email: 'ada.lovelace@gmail.com' };
    
    db.query.mockResolvedValueOnce([[mockUser]]);
    
    await getUserProfile(req, res);
    
    expect(res.status).not.toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  // Testing when the user is not found
  it('should return 404 when user is not found', async () => {
    db.query.mockResolvedValueOnce([[]]);

    await getUserProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  // Testing when a server error occurs
  it('should return 500 when there is a server error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    db.query.mockRejectedValueOnce(new Error('Database error')); 
  
    await getUserProfile(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
  
    consoleSpy.mockRestore();
  });
});