-- Seed data for testing
USE support_analytics;

-- Insert sample users
INSERT INTO users (email, first_name, last_name, role)
VALUES
    ('john.agent@example.com', 'John', 'Smith', 'agent'),
    ('sarah.agent@example.com', 'Sarah', 'Johnson', 'agent'),
    ('admin@example.com', 'Admin', 'User', 'admin'),
    ('customer1@example.com', 'James', 'Wilson', 'customer'),
    ('customer2@example.com', 'Emily', 'Brown', 'customer');

-- Insert sample tickets
INSERT INTO tickets (customer_id, assigned_agent_id, subject, description, status, priority, category)
VALUES
    (4, 1, 'Login Issue', 'Cannot login to the application', 'open', 'high', 'Authentication'),
    (5, 2, 'Feature Request', 'Need export to PDF feature', 'in_progress', 'medium', 'Feature Request'),
    (4, 1, 'Data Import Failed', 'Bulk import not working', 'resolved', 'urgent', 'Data Management');

-- Insert sample interactions
INSERT INTO interactions (ticket_id, user_id, type, content)
VALUES
    (1, 1, 'message', 'I will look into this right away'),
    (1, 4, 'message', 'Thank you for the quick response'),
    (2, 2, 'note', 'Investigating feasibility with development team');

-- Insert sample daily metrics
INSERT INTO daily_metrics (date_recorded, new_tickets, resolved_tickets, avg_response_time, avg_resolution_time, customer_satisfaction_score, active_tickets)
VALUES
    (GETDATE(), 3, 1, 15.5, 120.0, 4.5, 2);

-- Insert sample satisfaction surveys
INSERT INTO satisfaction_surveys (ticket_id, rating, feedback)
VALUES
    (3, 5, 'Very satisfied with the quick resolution');