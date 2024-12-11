-- Create the support_analytics database
CREATE DATABASE support_analytics;
USE support_analytics;

-- Users table (both agents and customers)
CREATE TABLE users (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) CHECK (role IN ('agent', 'customer', 'admin')),
    created_at DATETIME DEFAULT GETDATE(),
    last_login DATETIME,
    is_active BIT DEFAULT 1
);

-- Tickets table
CREATE TABLE tickets (
    ticket_id INT PRIMARY KEY IDENTITY(1,1),
    customer_id INT FOREIGN KEY REFERENCES users(user_id),
    assigned_agent_id INT FOREIGN KEY REFERENCES users(user_id),
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) CHECK (status IN ('new', 'open', 'in_progress', 'resolved', 'closed')),
    priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    category VARCHAR(100),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    resolved_at DATETIME,
    first_response_time INT, -- in minutes
    resolution_time INT -- in minutes
);

-- Interactions table (messages, updates, notes)
CREATE TABLE interactions (
    interaction_id INT PRIMARY KEY IDENTITY(1,1),
    ticket_id INT FOREIGN KEY REFERENCES tickets(ticket_id),
    user_id INT FOREIGN KEY REFERENCES users(user_id),
    type VARCHAR(50) CHECK (type IN ('message', 'note', 'status_change', 'assignment')),
    content TEXT,
    created_at DATETIME DEFAULT GETDATE()
);

-- Daily Metrics table
CREATE TABLE daily_metrics (
    metric_id INT PRIMARY KEY IDENTITY(1,1),
    date_recorded DATE,
    new_tickets INT,
    resolved_tickets INT,
    avg_response_time DECIMAL(10,2),
    avg_resolution_time DECIMAL(10,2),
    customer_satisfaction_score DECIMAL(3,2),
    active_tickets INT,
    created_at DATETIME DEFAULT GETDATE()
);

-- Customer Satisfaction Surveys
CREATE TABLE satisfaction_surveys (
    survey_id INT PRIMARY KEY IDENTITY(1,1),
    ticket_id INT FOREIGN KEY REFERENCES tickets(ticket_id),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    feedback TEXT,
    submitted_at DATETIME DEFAULT GETDATE()
);

-- Create indexes for better query performance
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_created_at ON tickets(created_at);
CREATE INDEX idx_tickets_customer_id ON tickets(customer_id);
CREATE INDEX idx_tickets_agent_id ON tickets(assigned_agent_id);
CREATE INDEX idx_interactions_ticket_id ON interactions(ticket_id);
CREATE INDEX idx_daily_metrics_date ON daily_metrics(date_recorded);