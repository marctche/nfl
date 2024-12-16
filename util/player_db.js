
const pool = require('../db')
const insertPlayer = async (playerDetails) => {
    const {
        id, uid, guid, type, firstName, lastName, fullName, displayName, shortName,
        weight, displayWeight, height, displayHeight, age, dateOfBirth, debutYear,
        birthPlace, alternateIds, slug, jersey, linked, experience, active, status
    } = playerDetails;

    const query = `
        INSERT INTO players (
            external_id, uid, guid, type, first_name, last_name, full_name, display_name,
            short_name, weight, display_weight, height, display_height, age,
            date_of_birth, debut_year, birth_place, alternate_ids, slug, jersey,
            linked, experience_years, active, status
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
            $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
        )
        ON CONFLICT (external_id) DO NOTHING;
    `;

    const values = [
        id, uid, guid, type, firstName, lastName, fullName, displayName, shortName,
        weight, displayWeight, height, displayHeight, age, dateOfBirth, debutYear,
        birthPlace ? JSON.stringify(birthPlace) : null, // Convert to JSON
        alternateIds ? JSON.stringify(alternateIds) : null, // Convert to JSON
        slug, jersey, linked, experience ? experience.years : null, active,
        status ? JSON.stringify(status) : null // Convert status to JSON
    ];

    try {
        await pool.query(query, values);
        console.log(`Player ${fullName} inserted successfully.`);
    } catch (err) {
        console.error('Error inserting player:', err.message);
    }
};

module.exports = {insertPlayer};