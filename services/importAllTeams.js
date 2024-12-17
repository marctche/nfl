const fetchAllTeams = require('./fetchAllTeams.js')
const insertTeam = require('../util/team_db.js')

const importAllTeams = async() =>{
    try{
        const team = await fetchAllTeams();

        for (const team of teams){
            console.log(`Inserting team: ${team}`)
            await insertTeam(team)
        }

        console.log('All teams have been imported')
    }
    catch (error){
        console.error(`Error occured while importing teams`, error.message)
    }

};

importAllTeams();
