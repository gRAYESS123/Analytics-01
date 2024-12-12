const express = require('express');
const router = express.Router();
const sql = require('mssql');

// Get analytics data
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`
      EXEC sp_GetTicketAnalytics 
        @StartDate = ${req.query.startDate},
        @EndDate = ${req.query.endDate}
    `;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get agent performance
router.get('/agent-performance', async (req, res) => {
  try {
    const result = await sql.query`
      EXEC sp_GetAgentPerformance
        @StartDate = ${req.query.startDate},
        @EndDate = ${req.query.endDate}
    `;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;