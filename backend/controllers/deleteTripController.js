const db = require('../config/db');

// Delete a trip controller logic
const deleteTrip = async(req,res) => {
    const { tripID } = req.params;
    const userID = req.user.userID;

    if (!tripID) {
        return res.status(400).json({ error: 'Trip ID is needed!' });
    }

    try {

        const [tripResult] = await db.query(
            `SELECT * FROM Trips WHERE tripID = ? AND userID = ?`,
            [tripID, userID]
        );

        if (tripResult.length === 0) {
            return res.status(404).json({ error: 'Trip not found or you do not have permission to delete it' });
        }

        //Wrapping both Delete queries in Transaction to ensure deletion of photos and trip related information
        //If the deletion fails for one of the queries, the Transaction will not occur
         await db.query(`START TRANSACTION`);

         await db.query(`DELETE FROM Photos WHERE tripID = ? AND userID = ?`, [tripID, userID]);

         await db.query(`DELETE FROM Trip_Location WHERE tripID = ?`, [tripID]);

         await db.query(`DELETE FROM Trips WHERE tripID = ? AND userID = ?`, [tripID, userID]);

         await db.query(`COMMIT`);

         res.status(200).json({ message: 'Successfully deleted Trip and Photos!' });

    } catch (error) {
            await db.query('ROLLBACK');
    
            console.error('Error deleting trip:', error);
            res.status(500).json({ error: 'An error occurred while deleting the trip' });
    }
}

module.exports = deleteTrip;