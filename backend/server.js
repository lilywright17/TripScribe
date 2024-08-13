require('dotenv').config();
const express = require('express');
const pool = require('./config/db');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt'); 
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Server running"));

pool.getConnection((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        pool.getConnection((err, connection) => {
            if (err) throw err;

            const query = 'SELECT * FROM users WHERE email = ?';
            connection.query(query, [email], (error, results) => {
                connection.release(); 

                if (error) throw error;

                if (results.length === 0) {
                    return res.status(401).json({ success: false, message: 'Invalid email or password' });
                }

                const user = results[0];

                // If you are using bcrypt:
                // const isMatch = await bcrypt.compare(password, user.password);
                
                // If not using bcrypt, just compare passwords directly:
                const isMatch = password === user.password;

                if (!isMatch) {
                    return res.status(401).json({ success: false, message: 'Invalid email or password' });
                }

                return res.status(200).json({
                    success: true,
                    message: 'Login successful',
                });
            });
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, message: 'Server error, please try again later' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
