-- Schema Improvements
USE support_analytics;

-- 1. Update data types for better precision
ALTER TABLE tickets
ALTER COLUMN first_response_time DECIMAL(10,2);

ALTER TABLE tickets
ALTER COLUMN resolution_time DECIMAL(10,2);

-- 2. Update TEXT fields to VARCHAR(MAX)
ALTER TABLE tickets
ALTER COLUMN description VARCHAR(MAX);

ALTER TABLE interactions
ALTER COLUMN content VARCHAR(MAX);

ALTER TABLE satisfaction_surveys
ALTER COLUMN feedback VARCHAR(MAX);

-- 3. Add cascade delete for interactions
ALTER TABLE interactions
DROP CONSTRAINT IF EXISTS FK__interaction__ticket;

ALTER TABLE interactions
ADD CONSTRAINT FK_interaction_ticket 
FOREIGN KEY (ticket_id) 
REFERENCES tickets(ticket_id)
ON DELETE CASCADE;

-- 4. Add trigger for updated_at
CREATE OR ALTER TRIGGER trg_tickets_update
ON tickets
AFTER UPDATE
AS
BEGIN
    UPDATE tickets
    SET updated_at = GETDATE()
    FROM tickets t
    INNER JOIN inserted i ON t.ticket_id = i.ticket_id;
END;

-- 5. Add new composite indexes for performance
CREATE INDEX idx_tickets_status_created
ON tickets(status, created_at);

CREATE INDEX idx_satisfaction_submitted
ON satisfaction_surveys(submitted_at);

-- 6. Improved agent performance stored procedure
CREATE OR ALTER PROCEDURE sp_GetAgentPerformance
    @StartDate DateTime,
    @EndDate DateTime
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Validate input parameters
    IF @StartDate IS NULL OR @EndDate IS NULL
    BEGIN
        THROW 50000, 'Start date and end date are required.', 1;
        RETURN;
    END;

    IF @EndDate < @StartDate
    BEGIN
        THROW 50000, 'End date must be greater than or equal to start date.', 1;
    END;

    BEGIN TRY
        SELECT 
            u.user_id,
            u.first_name + ' ' + u.last_name as agent_name,
            COUNT(t.ticket_id) as total_tickets,
            AVG(CAST(t.resolution_time as FLOAT)) as avg_resolution_time,
            COUNT(CASE WHEN t.status = 'resolved' THEN 1 END) as resolved_tickets
        FROM users u
        LEFT JOIN (
            SELECT * FROM tickets 
            WHERE created_at BETWEEN @StartDate AND @EndDate
        ) t ON u.user_id = t.assigned_agent_id
        WHERE u.role = 'agent'
        GROUP BY u.user_id, u.first_name, u.last_name;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH;
END;

-- 7. Add ticket status transition validation procedure
CREATE OR ALTER PROCEDURE sp_UpdateTicketStatus
    @TicketId INT,
    @NewStatus VARCHAR(50),
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @CurrentStatus VARCHAR(50);
    DECLARE @ErrorMessage VARCHAR(200);
    
    -- Get current status
    SELECT @CurrentStatus = status
    FROM tickets
    WHERE ticket_id = @TicketId;
    
    -- Validate transition
    IF @CurrentStatus = 'closed' AND @NewStatus != 'closed'
    BEGIN
        SET @ErrorMessage = 'Cannot reopen a closed ticket';
        THROW 50000, @ErrorMessage, 1;
    END;
    
    IF @CurrentStatus = 'new' AND @NewStatus = 'closed'
    BEGIN
        SET @ErrorMessage = 'Cannot close a new ticket directly';
        THROW 50000, @ErrorMessage, 1;
    END;
    
    -- Update status
    BEGIN TRANSACTION;
    
    UPDATE tickets
    SET status = @NewStatus,
        updated_at = GETDATE()
    WHERE ticket_id = @TicketId;
    
    -- Log the status change
    INSERT INTO interactions (ticket_id, user_id, type, content)
    VALUES (@TicketId, @UserId, 'status_change', 
            'Status changed from ' + @CurrentStatus + ' to ' + @NewStatus);
    
    COMMIT TRANSACTION;
END;
