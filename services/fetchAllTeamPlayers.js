const axios = require('axios');
require('dotenv').config({ path: './api_keys.env' });

const fetchAllTeamPlayers = async (teamID) => {
    const options = {
        method: 'GET',
        url: 'https://nfl-api-data.p.rapidapi.com/nfl-player-listing/v1/data',
        params: { id: teamID },
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': process.env.API_HOST,
        },
    };

    try {
        const response = await axios.request(options);
        return response.data.athletes.flatMap((group) => group.items); // Flatten players across positions
    } catch (error) {
        console.error(`Error fetching players for team ${teamID}:`, error.message);
        return [];
    }
};

module.exports = fetchAllTeamPlayers;

