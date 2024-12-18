const pool = require('../db'); // Database connection

const insertTeam = async (team) => {
    // SQL query to insert a team into the database
    const query = `
        INSERT INTO teams (external_id, name, abbreviation, location, color, alternate_color)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (external_id) DO NOTHING;
    `;

    // Values to insert into the query
    const values = [
        team.id,
        team.name,
        team.abbreviation,
        team.location || 'Unknown',
        team.color || null,
        team.alternateColor || null
    ];

    try {
        // Execute the query
        await pool.query(query, values);
        console.log(`Team ${team.name} inserted successfully.`);
    } catch (error) {
        console.error(`Error inserting team ${team.name}:`, error.message);
    }
};

module.exports = insertTeam; // Export the function
