const express = require('express');
const router = express.Router();
const { executeQuery } = require('../../services/database');

// Get ticket analytics
router.get('/tickets', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        const result = await executeQuery(`
            EXEC sp_GetTicketAnalytics
                @StartDate = '${startDate}',
                @EndDate = '${endDate}'
        `);
        
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get agent performance
router.get('/agent-performance', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        const result = await executeQuery(`
            EXEC sp_GetAgentPerformance
                @StartDate = '${startDate}',
                @EndDate = '${endDate}'
        `);
        
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get customer satisfaction metrics
router.get('/satisfaction', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        const result = await executeQuery(`
            EXEC sp_GetCustomerSatisfaction
                @StartDate = '${startDate}',
                @EndDate = '${endDate}'
        `);
        
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;