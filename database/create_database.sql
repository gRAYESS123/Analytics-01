-- Create the database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'support_analytics')
BEGIN
    CREATE DATABASE support_analytics;
END
GO

USE support_analytics;
GO

-- Users table (both agents and customers)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
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
END
GO

-- Tickets table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tickets')
BEGIN
    CREATE TABLE tickets (
        ticket_id INT PRIMARY KEY IDENTITY(1,1),
        customer_id INT,
        assigned_agent_id INT,
        subject VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) CHECK (status IN ('new', 'open', 'in_progress', 'resolved', 'closed')),
        priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
        category VARCHAR(100),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        resolved_at DATETIME,
        first_response_time INT,
        resolution_time INT,
        FOREIGN KEY (customer_id) REFERENCES users(user_id),
        FOREIGN KEY (assigned_agent_id) REFERENCES users(user_id)
    );
END
GO