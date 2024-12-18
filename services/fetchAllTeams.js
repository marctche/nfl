const axios = require('axios');
require('dotenv').config({path:'./database_info.env'});

const fetchAllTeams = async () => {
    const options = {
        method: 'GET',
        url: 'https://nfl-api-data.p.rapidapi.com/nfl-team-listing/v1/data',
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': process.env.API_HOST,
        },
    };

    try {
        const response = await axios.request(options);
        const teams = response.data.map(item => ({
            id: item.team.id,
            name: item.team.name,
            location: item.team.location || 'unknown',
            abbreviation: item.team.abbreviation,
            color: item.team.color || null,
            alternateColor: item.team.alternateColor || null
        }));
        return teams;
    } catch (error) {
        console.error('Error fetching teams:', error.message);
        throw error;
    }
};
module.exports = fetchAllTeams;


