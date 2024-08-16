const db = require('../config/db');

const addNewTrip = async (req, res) => {
    try {
        // Ensure the user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const userID = req.user.id;
        const { city, country, description, date_from, date_to, imgUrls } = req.body;

        // Start a transaction
        await db.beginTransaction();

        // Insert the trip data
        const tripQuery = `
            INSERT INTO Trips 
            (userID, city, country, description, date_from, date_to) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [tripResult] = await db.query(tripQuery, [userID, city, country, description, date_from, date_to]);

        const tripID = tripResult.insertId;
        let photosSaved = false;

        // Insert the photos if any
        if (Array.isArray(imgUrls) && imgUrls.length > 0) {
            photosSaved = true;
            const photoQuery = `
                INSERT INTO Photos (tripID, userID, secure_url, alt_text)
                VALUES (?, ?, ?, ?)
            `;

            const photoPromises = imgUrls.map((secure_url) =>
                db.query(photoQuery, [tripID, userID, secure_url, null])
            );

            await Promise.all(photoPromises);
        }

        // Commit the transaction
        await db.commit();

        // Send a success message
        const successMessage = photosSaved
            ? 'Trip and photos saved successfully!'
            : 'Trip saved successfully!';
        res.status(200).json({ message: successMessage, tripID });

    } catch (error) {
        await db.rollback();  // Ensure rollback on error
        console.error('Error adding trip:', error);
        
        //console.log('Before res.json call'); // Debug log
        res.status(500).json({ error: 'Failed to add trip' });
    }
};

module.exports = { addNewTrip };