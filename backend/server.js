require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.static('static'));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hellooo from backend");
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening at: http://localhost:${port}`);
});