USE support_analytics;
GO

-- Optimize numeric fields
ALTER TABLE tickets
ALTER COLUMN first_response_time DECIMAL(10,2);

ALTER TABLE tickets
ALTER COLUMN resolution_time DECIMAL(10,2);

-- Improve text fields
ALTER TABLE tickets
ALTER COLUMN description VARCHAR(MAX);

-- Add indexes for better performance
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_created_at ON tickets(created_at);
CREATE INDEX idx_tickets_customer_id ON tickets(customer_id);
CREATE INDEX idx_tickets_agent_id ON tickets(assigned_agent_id);

-- Add automatic timestamp updates
CREATE TRIGGER trg_tickets_update
ON tickets
AFTER UPDATE
AS
BEGIN
    UPDATE tickets
    SET updated_at = GETDATE()
    FROM tickets t
    INNER JOIN inserted i ON t.ticket_id = i.ticket_id;
END;