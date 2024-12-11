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
            ORDER BY date_recorded ASC
        `);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get real-time metrics
router.get('/realtime', async (req, res) => {
    try {
        const result = await executeQuery(`
            SELECT 
                COUNT(CASE WHEN status = 'open' OR status = 'in_progress' THEN 1 END) as active_tickets,
                COUNT(CASE WHEN status = 'new' THEN 1 END) as new_tickets,
                COUNT(CASE WHEN status = 'resolved' AND resolved_at >= DATEADD(hour, -24, GETDATE()) THEN 1 END) as resolved_today
            FROM tickets
        `);
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get satisfaction trends
router.get('/satisfaction/trend', async (req, res) => {
    try {
        const { period } = req.query; // 'daily', 'weekly', or 'monthly'
        let groupBy;
        
        switch(period) {
            case 'weekly':
                groupBy = 'DATEPART(week, submitted_at)';
                break;
            case 'monthly':
                groupBy = 'DATEPART(month, submitted_at)';
                break;
            default:
                groupBy = 'CAST(submitted_at AS DATE)';
        }

        const result = await executeQuery(`
            SELECT 
                ${groupBy} as period,
                AVG(CAST(rating as FLOAT)) as avg_rating,
                COUNT(*) as total_responses
            FROM satisfaction_surveys
            GROUP BY ${groupBy}
            ORDER BY period ASC
        `);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;