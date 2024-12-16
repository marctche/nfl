const fetchAllTeams = require('./fetchAllTeams.js'); // Import fetchAllTeams
const fetchAllTeamPlayers = require('./fetchAllTeamPlayers.js'); // Import fetchAllTeamPlayers
const { insertPlayer } = require('../util/player_db'); // Import insertPlayer

const importAllPlayers = async () => {
    try {
        // Step 1: Fetch all teams
        const teams = await fetchAllTeams();

        let totalPlayersInserted = 0;

        // Step 2: Fetch players for each team
        for (const team of teams) {
            const teamID = team.id; // Adjust based on the API's team object structure
            console.log(`Fetching players for team: ${team.name} (ID: ${teamID})`);

            const players = await fetchAllTeamPlayers(teamID);

            for (const player of players) {
                const playerDetails = {
                    id: player.id,
                    uid: player.uid,
                    guid: player.guid,
                    type: player.type || "football",
                    firstName: player.firstName,
                    lastName: player.lastName,
                    fullName: player.fullName,
                    displayName: player.displayName,
                    shortName: player.shortName,
                    weight: player.weight || null,
                    displayWeight: player.displayWeight || null,
                    height: player.height || null,
                    displayHeight: player.displayHeight || null,
                    age: player.age || null,
                    dateOfBirth: player.dateOfBirth || null,
                    debutYear: player.debutYear || null,
                    birthPlace: player.birthPlace || null,
                    alternateIds: player.alternateIds || null,
                    slug: player.slug || null,
                    jersey: player.jersey || null,
                    linked: player.linked || null,
                    experience: player.experience || null,
                    active: player.active || false,
                    status: player.status || null,
                    team_id: player.teamID || null
                };

                console.log("Inserting player:", playerDetails); // Log mapped player details
                await insertPlayer(playerDetails);
                totalPlayersInserted++;
            }

        }

        console.log(`Total players inserted: ${totalPlayersInserted}`);
    } catch (error) {
        console.error('Error importing players:', error.message);
    }
};

module.exports = importAllPlayers();