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



//func to insert player data into the database
const pool = require('../db');

const insertPlayer = async (playerDetails) => {
    const {
        id, uid, guid, type, firstName, lastName, fullName, displayName, shortName,
        weight, displayWeight, height, displayHeight, age, dateOfBirth, debutYear,
        birthPlace, alternateIds
    } = playerDetails;

    const query = `

        INSERT INTO players (external_id, uid, guid, type, first_name, last_name, full_name, display_name, short_name, weight, display_weight, height, display_height, age, date_of_birth, debut_year, birth_place, alternate_ids) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
        ON CONFLICT (external_id) DO NOTHING;`

    ;

    const values = [
        id, uid, guid, type, firstName, lastName, fullName, displayName, shortName,
        weight, displayWeight, height, displayHeight, age, dateOfBirth, debutYear,
        birthPlace ? JSON.stringify(birthPlace) : null, // Convert to JSON
        alternateIds ? JSON.stringify(alternateIds) : null // Convert to JSON
    ];

    try {
        await pool.query(query, values);
        console.log(`Player ${fullName} inserted successfully.`);
    } catch (err) {
        console.error('Error inserting player:', err.message);
    }
};

module.exports = { insertPlayer };


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

        res.json(combinedData); // Send combined data back to the client
    } catch (error) {
        console.error('Error fetching player details or stats:', error.message);
        res.status(500).json({ error: 'Failed to fetch player details or statistics' });
    }
});


module.exports = router;