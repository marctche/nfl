const express = require('express'); // Importing the library Express
const players = require('./routes/player.js') // Importing the player.js file
const importAllPlayers = require('./services/importAllPlayers.js')
const importAllTeams = require('./services/importAllTeams.js')
const app = express(); // Create an express app
require('dotenv').config({path:'./database_info.env'});

app.use(express.json()); // Middleware to parse incoming JSON data

app.use('/players', players); // Middleware to parse incoming player endpoint

// Sample endpoint GET
app.get('/players', (req, res) => {
    res.json({ message: "Welcome to my NFL app" });
});

app.get('/import', async (req, res) => { // importing players
    try {
        await importAllPlayers();
        res.json({ message: "Players import completed successfully." });
    } catch (error) { // handles error
        console.error("Error during player import:", error.message);
        res.status(500).json({ message: "Error importing players." });
    }
});

app.get('/import-teams', async (req, res) => {
    try{
        await importAllTeams();
        res.json({message: "All teams have sucessfully been imported"})
    }
    catch (error){
        console.error('Errir during team import', error.message);
        res.status(500).json({ message: "Error importing teams." });
    }

});

// Define the port the app will listen on
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { // Start the server and listen for incoming requests
    console.log(`Server is running on http://localhost:${PORT}`);
});


