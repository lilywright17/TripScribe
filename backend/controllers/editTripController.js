const db = require("../config/db");

// Controller to edit 
const editTripByID = async (req, res) => {
  const { tripID } = req.params;
  const userID = req.user.userID;
  const { country, city, description, date_from, date_to, photos } = req.body;

  if (!country || !city || !description || !date_from || !date_to) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const query = `
      UPDATE Trips 
      SET country = ?, city = ?, description = ?, date_from = ?, date_to = ?
      WHERE tripID = ? AND userID = ?
    `;

    const [result] = await connection.query(query, [
      country,
      city,
      description,
      date_from,
      date_to,
      tripID,
      userID,
    ]);

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "The trip was not found or not authorized" });
    }

    // Managing existing images
    const existingImgQuery = `SELECT secure_url FROM Photos WHERE tripID = ?`;
    const [existingImg] = await connection.query(existingImgQuery, [tripID]);
    const existingImgUrls = existingImg.map(photo => photo.secure_url);

    // Determine images to delete and add
    const deleteImg = existingImgUrls.filter(url => !photos.includes(url));
    const addImg = photos.filter(url => !existingImgUrls.includes(url));

    // Delete removed images
    if (deleteImg.length > 0) {
      const deleteImgQuery = `DELETE FROM Photos WHERE secure_url IN (?) AND tripID = ?`;
      await connection.query(deleteImgQuery, [deleteImg, tripID]);
    }

    // Add new images
    if (addImg.length > 0) {
      const addImgQuery = `INSERT INTO Photos (tripID, userID, secure_url, alt_text) VALUES ?`;
      const values = addImg.map(url => [tripID, userID, url, null]); // Set alt_text as NULL
      await connection.query(addImgQuery, [values]);
    }

    await connection.commit();

    res.json({ message: "The trip was updated successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Error editing the trip:", error);
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

module.exports = { editTripByID };
