# Support Analytics Database

This repository contains the database setup and analytics capabilities for a support ticket system.

## Database Structure

The database consists of several key tables:
- users (agents and customers)
- tickets
- interactions
- daily_metrics
- satisfaction_surveys

## Recent Improvements

### Data Types and Performance
- Optimized numeric fields (first_response_time, resolution_time) to use DECIMAL(10,2)
- Updated large text fields to use VARCHAR(MAX) instead of TEXT
- Added composite indexes for common query patterns
- Improved query performance for date-range operations

### Data Integrity
- Added CASCADE DELETE for related records
- Implemented automatic timestamp updates
- Added status transition validation
- Enhanced referential integrity constraints

### Stored Procedures
The following stored procedures are available:

1. sp_GetTicketAnalytics
   - Analyzes ticket metrics for a date range
   - Includes error handling and input validation

2. sp_GetAgentPerformance
   - Measures agent performance metrics
   - Fixed JOIN operations for accurate reporting

3. sp_GetCustomerSatisfaction
   - Analyzes customer satisfaction ratings
   - Includes statistical aggregations

4. sp_UpdateTicketStatus (New)
   - Manages ticket status transitions
   - Includes validation rules
   - Maintains audit trail

## Setup Instructions

1. Execute create_database.sql
2. Run schema.sql
3. Apply improvements.sql
4. Run stored_procedures.sql
5. (Optional) Run seed.sql for test data

## Usage Examples

```sql
-- Get ticket analytics for last month
EXEC sp_GetTicketAnalytics 
    @StartDate = '2024-01-01',
    @EndDate = '2024-01-31';

-- Get agent performance
EXEC sp_GetAgentPerformance
    @StartDate = '2024-01-01',
    @EndDate = '2024-01-31';

-- Update ticket status
EXEC sp_UpdateTicketStatus
    @TicketId = 1,
    @NewStatus = 'in_progress',
    @UserId = 123;
```

## Best Practices

1. Always use stored procedures instead of direct table access
2. Monitor performance with provided indexes
3. Regular backup of the database
4. Use transaction handling for critical operations

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Include relevant tests and documentation

## License

MIT License - See LICENSE file for details