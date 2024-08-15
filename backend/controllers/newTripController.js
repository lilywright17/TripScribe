const db = require('../config/db');
const axios = require('axios');

const addNewTrip = async (req, res) => {
    try {
        // Make an internal API call to fetch the userID
        const response = await axios.get('http://localhost:5000/api/userID', {
            headers: {
                // Pass the user's session cookie or any required headers if needed
                'Cookie': req.headers.cookie
            }
        });

        const userID = response.data.userID;

        if (!userID) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const tripData = req.body;
        const { city, country, description, date_from, date_to, imgUrls } = tripData;

        db.beginTransaction(err => {
            if (err) {
                console.error('Transaction Error:', err);
                return res.status(500).json({ error: 'Failed to start transaction' });
            }

            const tripQuery = `
            INSERT INTO Trips 
            (userID, city, country, description, date_from, date_to) 
            VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.query(tripQuery, [userID, city, country, description, date_from, date_to], (err, result) => {
                if (err) {
                    console.error('Failed to insert trip:', err);
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Failed to save trip. Please try again later.' });
                    });
                }

                const tripID = result.insertId; // Get the newly inserted trip's ID

                if (Array.isArray(imgUrls) && imgUrls.length > 0) {
                    const photoQuery = `
                        INSERT INTO Photos (tripID, userID, secure_url, alt_text)
                        VALUES (?, ?, ?, ?)
                    `;
                    const photoPromises = imgUrls.map((secure_url) => {
                        const alt_text = null; // Default alt_text to null since it's not provided in the trip form
                        
                        return new Promise((resolve, reject) => {
                            db.query(
                                photoQuery,
                                [tripID, userID, secure_url, alt_text],
                                (err, result) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(result);
                                    }
                                }
                            );
                        });
                    });

                    Promise.all(photoPromises)
                        .then(() => {
                            db.commit(err => {
                                if (err) {
                                    console.error('Commit Error:', err);
                                    return db.rollback(() => {
                                        res.status(500).json({ error: 'Failed to save trip. Please try again later.' });
                                    });
                                }
                                res.status(200).json({ message: 'Trip and photos saved successfully!', tripID });
                            });
                        })
                        .catch(err => {
                            console.error('Failed to insert photos:', err);
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Failed to save photos. Please try again later.' });
                            });
                        });
                } else {
                    db.commit(err => {
                        if (err) {
                            console.error('Commit Error:', err);
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Failed to save trip. Please try again later.' });
                            });
                        }
                        res.status(200).json({ message: 'Trip saved successfully!', tripID });
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error adding trip:', error);
        res.status(500).send({ error: 'Failed to add trip' });
    }
};

module.exports = { addNewTrip };