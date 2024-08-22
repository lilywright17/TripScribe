const db = require('../config/db');

// Function to fetch user by userID
const getUserById = async (userID) => {
  const query = `
    SELECT userID, fullname, username, email 
    FROM Users 
    WHERE userID = ?
  `;
  const [rows] = await db.query(query, [userID]);
  return rows[0];
};

// Controller to get user by userID, where teh userID is passed in the url
const getUserProfile = async (req, res) => {
  const userID = req.params.userID;

  try {
    const user = await getUserById(userID);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Excluding hashed password from the response
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {getUserProfile};