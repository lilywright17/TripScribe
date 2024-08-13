const express = require("express");
require("dotenv").config();
const cors = require("cors");
const db = require("./config/db.js"); // Importing the db connection

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server running"));

app.post("/api/trips", async (req, res) => {
  // Extracting userID from the request body
  /* {
        "userID": 1
     } */
  const { userID } = req.body;

  if (!userID) {
    return res.status(400).json({ error: "userID is required" });
  }

  try {
    // Directly using the query method from the pool
    const [result] = await db.query(
      `
            SELECT t.tripID, t.city, t.country, t.description, t.date_from, t.date_to
            FROM Trips t
            WHERE t.userID = ?
        `,
      [userID]
    );

    if (result.length === 0) {
      return res.status(204).json({ message: "No trips were found!" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ error: "An error occurred while fetching trips" });
  }
});
// app.get('/api/trips/:userID', async (req, res) => {
//     const userID = req.params.userID;

//     try {
//         // Directly using the query method from the pool
//         const [result] = await db.query(`
//             SELECT t.tripID, t.city, t.country, t.description, t.date_from, t.date_to
//             FROM Trips t
//             WHERE t.userID = ?
//         `, [userID]);

//         if (result.length === 0) {
//             return res.status(204).json({ message: 'No trips were found!' });
//         }

//         res.status(200).json(result);

//     } catch (error) {
//         console.error('Error fetching trips:', error);
//         res.status(500).json({ error: 'An error occurred while fetching trips' });
//     }
// });

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
