const db = require('../config/db');

// Controller User Profile
const getUserById = async (userID) => {
  const query = `
    SELECT userID, fullname, username, email 
    FROM Users 
    WHERE userID = ?
  `;
  const [rows] = await db.query(query, [userID]);
  return rows[0];
};

const getUserProfile = async (req, res) => {
  const userID = req.params.userID;

  try {
    const user = await getUserById(userID);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {getUserProfile};