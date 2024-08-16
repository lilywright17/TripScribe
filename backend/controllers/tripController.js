const db = require('../config/db');

// the trip related functions that interact with the database goes here
const getTrips = async (req, res) => {
    // get the UserID from the JWT token
    const userID = req.user.userID; 

    console.log(`UserID is: ${userID}`);

    try {
        // JSON_OBJECT to combine photoID, secure_url, and alt_text into a JSON object for each photo
        // JSON_ARRAYAGG used to combine the objects into a single JSON array(all the photos will be associated with a particular trip.)
        const [result] = await db.query(
            `
            SELECT 
                t.tripID, t.city, t.country, t.description, t.date_from AS startDate, t.date_to AS endDate,
                JSON_ARRAYAGG(JSON_OBJECT('photoID', p.photoID, 'url', p.secure_url, 'alt_text', p.alt_text)) AS photos
            FROM 
                Trips t
            LEFT JOIN 
                Photos p ON t.tripID = p.tripID
            WHERE 
                t.userID = ?
            GROUP BY 
                t.tripID
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