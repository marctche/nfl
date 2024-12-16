const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config({ path: './api_keys.env' }); // Import the sentitive api information

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
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
});





// GET A SPECFIC PLAYERS ID

router.get('/:id', async (req, res) => {
    const playerID = req.params.id; // Extract player ID from the URL
    const year = req.query.year || '2024' // Default year
    const options = {
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

    try { // How we're handling fetching the information
        const response = await axios.request(options); // Make the API call
        res.json(response.data); // Send the data back to the client
    } catch (error) {
        console.error('Error fetching player stats:', error.message);
        res.status(500).json({ error: 'Failed to fetch player statistics' });
    }
});


module.exports = router;