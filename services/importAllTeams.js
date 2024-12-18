const fetchAllTeams = require('./fetchAllTeams.js');
const insertTeam = require('../util/team_db.js');

const importAllTeams = async () => {
    try {
        const teams = await fetchAllTeams();
        console.log("Fetched teams:", teams); // Verify API response structure

        let totalTeamsInserted = 0;

        console.log("Fetched raw teams data:", teams);

        // Iterate through the teams
        for (const team of teams) {
            console.log("Team object before insert:", team);
            await insertTeam(team);
            totalTeamsInserted++
        }

        console.log('All teams have been imported.');
        console.log(`Total teams inserted: ${totalTeamsInserted}`);
    } catch (error) {
        console.error(`Error occurred while importing teams:`, error.message);
    }
};

// Export the function
module.exports = importAllTeams();
