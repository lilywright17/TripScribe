const db = require('../config/db');

// Controller My Trip page 
const getTrips = async (req, res) => {
    const userID = req.user.userID; 

    try {
        const [result] = await db.query(
            `
            SELECT 
                t.tripID, t.city, t.country, t.description, t.date_from AS startDate, t.date_to AS endDate,
                JSON_ARRAYAGG(JSON_OBJECT('photoID', p.photoID, 'url', p.secure_url, 'alt_text', p.alt_text)) AS photos,
                l.latitude, l.longitude
            FROM 
                Trips t
            LEFT JOIN 
                Photos p ON t.tripID = p.tripID
            LEFT JOIN
                 Trip_Location tl ON t.tripID = tl.tripID
            LEFT JOIN
                Locations l ON tl.locationID = l.locationID
            WHERE 
                t.userID = ?
            GROUP BY 
                t.tripID, l.latitude, l.longitude

            `,
            [userID]
        );

        if (result.length === 0) {
            return res.status(204).end(); 
        }
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ error: 'An error occurred while fetching trips' });
    }
};

// Controller Trip Details
const getTripByID = async(req, res) => {
    const { tripID } = req.params;
    const userID = req.user.userID;
    try {
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
                t.tripID = ? AND t.userID = ?
            GROUP BY 
                t.tripID
            `,
            [tripID, userID]
        );

        if (result.length === 0) {
            return res.status(404).json({ message: 'Trip was not found!' });
        }
        
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ error: 'An error occurred while fetching trips' });
    }
}

module.exports = { getTrips, getTripByID };


