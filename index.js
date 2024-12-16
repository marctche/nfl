// Importing the library Express
const express = require('express');

// Importing the player.js file
const players = require('./routes/player.js')

// Create an express app
const app = express();
// Middleware to parse incoming JSON data
app.use(express.json());
// Middleware to parse incoming player endpoint
app.use('/players', players);

// Sample endpoint GET
app.get('/players', (req, res) => {
    res.json({ message: "Welcome to my NFL app" });
});

// Define the port the app will listen on
const PORT = 3000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
