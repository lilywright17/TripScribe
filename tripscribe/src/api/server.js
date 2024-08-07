// require('dotenv').config();

const express = require('express');
const db = require('../../../backend/tripscribedb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err.stack);
        return;
    }
    console.log('Connected to TripScribeDB.');
});

// login route
app.post('/api/login', async (req,res) => {
    const {email, password} = req.body;
    const invalidMsg = {
        success: false,
        message: 'Invalid email or password'
    }

    try {
        const user = await user.find(u => u.email === email);
        if (!user) {
            return res.json(invalidMsg);
        }

        const pwMatch = await user.find(u => u.password === password);
        if (!pwMatch) {
            return res.json(invalidMsg);
        }

        res.json({
            success: true,
            message: 'Login successful'
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
