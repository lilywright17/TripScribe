const db = require('../config/db');

// Controller New Trip 
const addNewTrip = async (req, res) => {
    try {
        // Ensure the user is authenticated
        if (!req.user || !req.user.userID) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const userID = req.user.userID;

        const { city, country, description, date_from, date_to, imgUrls = [] } = req.body;

        // Validate date fields
        if (!date_from || !date_to) {
            return res.status(400).json({ error: "Date fields cannot be null" });
        }

        connection = await db.getConnection();

        await connection.beginTransaction();

        const tripQuery = `
            INSERT INTO Trips 
            (userID, city, country, description, date_from, date_to) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [tripResult] = await connection.query(tripQuery, [userID, city, country, description, date_from, date_to]);

        const tripID = tripResult.insertId;
        
        let photosSaved = false;

        // Insert the photos if any
        if (Array.isArray(imgUrls) && imgUrls.length > 0) {
            photosSaved = true;
            const photoQuery = `
                INSERT INTO Photos (tripID, userID, secure_url, alt_text)
                VALUES (?, ?, ?, ?)
            `;

            const photoPromises = imgUrls.map((url) => {
                const secure_url = url; 
                return connection.query(photoQuery, [tripID, userID, secure_url, null]);
            });

            await Promise.all(photoPromises);
        }

        await connection.commit();

        const successMessage = photosSaved
            ? 'Trip and photos saved successfully!'
            : 'Trip saved successfully!';
        res.status(200).json({ message: successMessage, tripID });

    } catch (error) {
        if (connection) await connection.rollback();  
        console.error('Error adding trip:', error);
        res.status(500).json({ error: 'Failed to add trip' });
    } finally {
        if (connection) connection.release();  
    }
};

module.exports = { addNewTrip };