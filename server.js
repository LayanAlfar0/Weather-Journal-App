const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('website'));

// Initialize the main project data object
let projectData = {};

// GET route to return the projectData
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route to add data to projectData
app.post('/add', (req, res) => {
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    };
    res.send(projectData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});
