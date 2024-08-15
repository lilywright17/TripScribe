const db = require('../config/db');

//Controller for get userID needed in the addTrip page flow
const getUserID = (req, res) => {
    try {
        // Assuming the userID is stored in req.session.userID
        const userID = req.session.userID;

        if (!userID) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Return the userID
        res.status(200).json({ userID });
    } catch (error) {
        console.error('Error retrieving user ID:', error);
        res.status(500).json({ error: 'Failed to retrieve user ID' });
    }
    
    console.log('Session UserID:', req.session.userID);
};

module.exports = { getUserID };