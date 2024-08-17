require('dotenv').config(); // Ensure you have dotenv installed

export const apiKey = process.env.GOOGLE_API_KEY;

module.exports = { apiKey };