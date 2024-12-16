const express = require('express');
const axios = require('axios');
const router = express.Router();
const { insertPlayer } = require('../util/player_db');
require('dotenv').config({ path: './api_keys.env' }); // Import the sensitive api information

// API INFORMATION
const API_HOST = process.env.API_HOST;
const API_KEY = process.env.API_KEY;


// Axios configuration for RapidAPI
const axiosConfig = {
    headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
    }
};

// GET ALL PLAYERS

router.get('/team/:id', async (req, res) => {

    const teamID = req.params.id;

    const options = {
        method: 'GET',
        url: 'https://nfl-api-data.p.rapidapi.com/nfl-player-listing/v1/data',
        params: {id: teamID},
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }//
    };

    try {
        const response = await axios.request(options);
        res.json(response.data); // Send the data back to the client
    } catch (error) {
        console.error(error.message); // Log the error
        res.status(500).json({ error: 'Failed to fetch players for the specified team' });
    }
});





// GET A SPECFIC PLAYERS ID

router.get('/:id', async (req, res) => {
    const playerID = req.params.id; // Extract player ID from the URL
    const year = req.query.year || '2024' // Default year

    const playerDetailsOptions = {
        method: 'GET',
        url: 'https://nfl-api-data.p.rapidapi.com/nfl-player-info/v1/data',
        params: { id: playerID },
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
        },
    };


    const playerStatsOptions = {
        method: 'GET', // The type of request
        url: 'https://nfl-api-data.p.rapidapi.com/nfl-ath-statistics', // where its getting
        params: { // The parameters
            id: playerID, // Players ID
            year: year // Example year
        },
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    try {
        // Fetch player details and statistics in parallel
        const [detailsResponse, statsResponse] = await Promise.all([
            axios.request(playerDetailsOptions), // fetch details
            axios.request(playerStatsOptions), // fetch stats
        ]);

        const combinedData = { // Combine the responses
            playerDetails: detailsResponse.data,
            playerStats: statsResponse.data,
        };
        await insertPlayer(combinedData.playerDetails)
        res.json(
            {message: 'Player data fetched and saved correctly', combinedData
        }); // Send combined data back to the client


    } catch (error) {
        console.error('Error fetching player details or stats:', error.message);
        res.status(500).json({ error: 'Failed to fetch player details or statistics' });
    }
});


module.exports = router;