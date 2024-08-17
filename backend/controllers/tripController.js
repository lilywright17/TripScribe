const db = require('../config/db');

// the trip related functions that interact with the database goes here
const getTrips = async (req, res) => {
    // get the UserID from the JWT token
    const userID = req.user.userID; 

    console.log(`UserID is: ${userID}`);

    try {
        // the URL to be added in the database tables, trhen will update the SQL query
        const [result] = await db.query(
            `
            SELECT t.tripID, t.city, t.country, t.description, t.date_from, t.date_to
            FROM Trips t
            WHERE t.userID = ?
            `,
            [userID]
        );

        if (result.length === 0) {
            return res.status(204).json({ message: 'No trips were found!' });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ error: 'An error occurred while fetching trips' });
    }
};

module.exports = { getTrips };