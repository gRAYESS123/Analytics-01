const express = require('express');
const router = express.Router();
const { executeQuery } = require('../../services/database');

// Get daily metrics
router.get('/daily', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        const result = await executeQuery(`
            SELECT *
            FROM daily_metrics
            WHERE date_recorded BETWEEN '${startDate}' AND '${endDate}'
            ORDER BY date_recorded
        `);
        
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get current day metrics
router.get('/current', async (req, res) => {
    try {
        const result = await executeQuery(`
            SELECT TOP 1 *
            FROM daily_metrics
            ORDER BY date_recorded DESC
        `);
        
        res.json(result[0] || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;