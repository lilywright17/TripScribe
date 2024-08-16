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
        await new Promise((resolve, reject) => {
            db.beginTransaction((err) => {
                if (err) {
                    console.error('Transaction Error:', err);
                    return reject(res.status(500).json({ error: 'Failed to start transaction' }));
                }
                resolve();
            });
        });

        // Insert the trip data
        const tripResult = await new Promise((resolve, reject) => {
            const tripQuery = `
                INSERT INTO Trips 
                (userID, city, country, description, date_from, date_to) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.query(tripQuery, [userID, city, country, description, date_from, date_to], (err, result) => {
                if (err) {
                    console.error('Failed to insert trip:', err);
                    return db.rollback(() => {
                        reject(res.status(500).json({ error: 'Failed to save trip. Please try again later.' }));
                    });
                }
                resolve(result);
            });
        });

        const tripID = tripResult.insertId;
        let photosSaved = false;

        // Insert the photos if any
        if (Array.isArray(imgUrls) && imgUrls.length > 0) {
            photosSaved = true;
            const photoPromises = imgUrls.map((secure_url) => {
                return new Promise((resolve, reject) => {
                    const photoQuery = `
                        INSERT INTO Photos (tripID, userID, secure_url, alt_text)
                        VALUES (?, ?, ?, ?)
                    `;
                    db.query(photoQuery, [tripID, userID, secure_url, null], (err, result) => {
                        if (err) {
                            console.error('Failed to insert photos:', err);
                            return db.rollback(() => {
                                reject(res.status(500).json({ error: 'Failed to save photos. Please try again later.' }));
                            });
                        }
                        resolve(result);
                    });
                });
            });

            await Promise.all(photoPromises);
        }

        // Commit the transaction
        await new Promise((resolve, reject) => {
            db.commit((err) => {
                if (err) {
                    console.error('Commit Error:', err);
                    return db.rollback(() => {
                        reject(res.status(500).json({ error: 'Failed to save trip. Please try again later.' }));
                    });
                }
                resolve();
            });
        });

        // Send a success message
        const successMessage = photosSaved
            ? 'Trip and photos saved successfully!'
            : 'Trip saved successfully!';
        res.status(200).json({ message: successMessage, tripID });

    } catch (error) {
        console.error('Error adding trip:', error);
        res.status(500).send({ error: 'Failed to add trip' });
    }
};

module.exports = { addNewTrip };