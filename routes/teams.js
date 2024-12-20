const express = require('express');
const router = express.Router();
const pool = require('../db');

// Route 1: GET all teams
router.get('/', async (req, res) => {
    let query = 'SELECT * FROM teams';
    const params = [];

    // Build query with optional filtering
    if (location || active) {
        const conditions = [];
        if (location) {
            params.push(`%${location}%`);
            conditions.push(`location ILIKE $${params.length}`);
        }
        if (active) {
            params.push(active);
            conditions.push(`is_active = $${params.length}`);
        }
        query += ' WHERE ' + conditions.join(' AND ');
    }

    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching teams:', error.message);
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});

// Route 2: GET all players for a specific team
router.get('/:team_id/players', async (req, res) => {
    const { team_id } = req.params; // Extract team_id from URL params

    try {
        const result = await pool.query('SELECT * FROM players WHERE team_id = $1', [team_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(`Error fetching players for team ${team_id}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch players for the specified team' });
    }
});

module.exports = router;