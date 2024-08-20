const db = require('../config/db');

// the trip related functions that interact with the database goes here
const getTrips = async (req, res) => {
    console.log('getTrips function called');
    // get the UserID from the JWT token
    const userID = req.user.userID; 

    console.log('Fetching trips for userID:', userID);

    try {
        // JSON_OBJECT to combine photoID, secure_url, and alt_text into a JSON object for each photo
        // JSON_ARRAYAGG used to combine the objects into a single JSON array(all the photos will be associated with a particular trip.)
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

        // To ensure that the result is an array
        if (Array.isArray(result) && result.length === 0) {
            return res.status(204).json({ message: 'No trips were found!' },[]);
        }
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ error: 'An error occurred while fetching trips' });
    }
};

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
        // In case no trips are found
        if (result.length === 0) {
            return res.status(404).json({ message: 'Trip was not found!' });
        }
        
        console.log("UserId is:", userID, "TripId is:",tripID)
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ error: 'An error occurred while fetching trips' });
    }

}

module.exports = { getTrips, getTripByID };


