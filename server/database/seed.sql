USE support_analytics;
GO

-- Insert sample users
INSERT INTO users (email, first_name, last_name, role)
VALUES
    ('john.agent@example.com', 'John', 'Smith', 'agent'),
    ('sarah.agent@example.com', 'Sarah', 'Johnson', 'agent'),
    ('customer1@example.com', 'James', 'Wilson', 'customer'),
    ('customer2@example.com', 'Emily', 'Brown', 'customer');

-- Insert sample tickets
INSERT INTO tickets (customer_id, assigned_agent_id, subject, description, status, priority, category)
VALUES
    (3, 1, 'Login Issue', 'Cannot login to the application', 'open', 'high', 'Authentication'),
    (4, 2, 'Feature Request', 'Need export to PDF feature', 'in_progress', 'medium', 'Feature Request'),
    (3, 1, 'Data Import Failed', 'Bulk import not working', 'resolved', 'urgent', 'Data Management');
