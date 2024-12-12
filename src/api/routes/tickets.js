const express = require('express');
const router = express.Router();
const { executeQuery } = require('../../services/database');

// Get all tickets
router.get('/', async (req, res) => {
    try {
        const result = await executeQuery(`
            SELECT t.*, u.email as customer_email, 
                   a.email as agent_email
            FROM tickets t
            LEFT JOIN users u ON t.customer_id = u.user_id
            LEFT JOIN users a ON t.assigned_agent_id = a.user_id
            ORDER BY t.created_at DESC
        `);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get ticket by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await executeQuery(`
            SELECT t.*, u.email as customer_email, 
                   a.email as agent_email
            FROM tickets t
            LEFT JOIN users u ON t.customer_id = u.user_id
            LEFT JOIN users a ON t.assigned_agent_id = a.user_id
            WHERE t.ticket_id = ${req.params.id}
        `);
        
        if (result.length === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new ticket
router.post('/', async (req, res) => {
    try {
        const { subject, description, customer_id, priority, category } = req.body;
        
        const result = await executeQuery(`
            INSERT INTO tickets (customer_id, subject, description, status, priority, category)
            VALUES (${customer_id}, '${subject}', '${description}', 'new', '${priority}', '${category}')
            SELECT SCOPE_IDENTITY() as ticket_id
        `);
        
        res.status(201).json({ ticket_id: result[0].ticket_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update ticket
router.put('/:id', async (req, res) => {
    try {
        const { status, assigned_agent_id, priority } = req.body;
        
        await executeQuery(`
            EXEC sp_UpdateTicketStatus 
                @TicketId = ${req.params.id},
                @NewStatus = '${status}',
                @UserId = ${req.user.userId}
        `);
        
        if (assigned_agent_id || priority) {
            await executeQuery(`
                UPDATE tickets
                SET assigned_agent_id = ${assigned_agent_id || 'assigned_agent_id'},
                    priority = '${priority || 'priority'}'
                WHERE ticket_id = ${req.params.id}
            `);
        }
        
        res.json({ message: 'Ticket updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;