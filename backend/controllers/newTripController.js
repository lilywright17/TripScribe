const db = require('../config/db');

const addNewTrip = async (req, res) => {
    try {
        // Ensure the user is authenticated
        if (!req.user || !req.user.userID) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const userID = req.user.userID;
        //console.log("User ID from req.user:", req.user.userID); // Debugging log for userID

        // Destructure the request body and ensure imgUrls is always an array
        const { city, country, description, date_from, date_to, imgUrls = [] } = req.body;

        //console.log("Date From:", date_from); // Debugging log
        //console.log("Date To:", date_to); // Debugging log
        //console.log("imgUrls:", imgUrls);  // Debugging log

        // Validate date fields
        if (!date_from || !date_to) {
            return res.status(400).json({ error: "Date fields cannot be null" });
        }

        // Get a connection from the pool
        connection = await db.getConnection();

        // Start a transaction
        await connection.beginTransaction();

        // Insert the trip data
        const tripQuery = `
            INSERT INTO Trips 
            (userID, city, country, description, date_from, date_to) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        //console.log("Executing Trip Query:", tripQuery);  // Debugging log for tripQuery
        const [tripResult] = await connection.query(tripQuery, [userID, city, country, description, date_from, date_to]);

        const tripID = tripResult.insertId;
        //console.log("Trip ID:", tripID);  // Debugging log for tripID
        
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
                //console.log("Inserting photo with secure_url:", secure_url); // Debugging log for each photo
                return connection.query(photoQuery, [tripID, userID, secure_url, null]);
            });

            await Promise.all(photoPromises);
        }

        // Commit the transaction
        await connection.commit();

        // Send a success message
        const successMessage = photosSaved
            ? 'Trip and photos saved successfully!'
            : 'Trip saved successfully!';
        res.status(200).json({ message: successMessage, tripID });

    } catch (error) {
        if (connection) await connection.rollback();  // Ensure rollback on error
        console.error('Error adding trip:', error);
        res.status(500).json({ error: 'Failed to add trip' });
    } finally {
        if (connection) connection.release();  // Release the connection back to the pool
    }
};

module.exports = { addNewTrip };