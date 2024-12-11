USE support_analytics;

-- Get ticket analytics for a date range
CREATE PROCEDURE sp_GetTicketAnalytics
    @StartDate DateTime,
    @EndDate DateTime
AS
BEGIN
    SELECT 
        COUNT(*) as total_tickets,
        COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved_tickets,
        AVG(CAST(first_response_time as FLOAT)) as avg_first_response_time,
        AVG(CAST(resolution_time as FLOAT)) as avg_resolution_time
    FROM tickets
    WHERE created_at BETWEEN @StartDate AND @EndDate;
END;

-- Get agent performance metrics
CREATE PROCEDURE sp_GetAgentPerformance
    @StartDate DateTime,
    @EndDate DateTime
AS
BEGIN
    SELECT 
        u.user_id,
        u.first_name + ' ' + u.last_name as agent_name,
        COUNT(t.ticket_id) as total_tickets,
        AVG(CAST(t.resolution_time as FLOAT)) as avg_resolution_time,
        COUNT(CASE WHEN t.status = 'resolved' THEN 1 END) as resolved_tickets
    FROM users u
    LEFT JOIN tickets t ON u.user_id = t.assigned_agent_id
    WHERE 
        u.role = 'agent' AND
        t.created_at BETWEEN @StartDate AND @EndDate
    GROUP BY u.user_id, u.first_name, u.last_name;
END;

-- Get customer satisfaction metrics
CREATE PROCEDURE sp_GetCustomerSatisfaction
    @StartDate DateTime,
    @EndDate DateTime
AS
BEGIN
    SELECT 
        COUNT(*) as total_surveys,
        AVG(CAST(rating as FLOAT)) as avg_rating,
        COUNT(CASE WHEN rating >= 4 THEN 1 END) as satisfied_customers
    FROM satisfaction_surveys
    WHERE submitted_at BETWEEN @StartDate AND @EndDate;
END;