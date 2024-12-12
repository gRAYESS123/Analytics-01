# Support Analytics Project

A complete support ticket analytics system with React frontend, Express backend, and SQL Server database.

## Project Structure

```
support-analytics/
├── client/                    # Frontend application
├── server/                    # Backend application
└── database/                  # Database scripts and migrations
```

## Setup Instructions

1. Database Setup:
```bash
cd database/scripts
# Execute SQL scripts in order:
1. create_database.sql
2. schema.sql
3. stored_procedures.sql
4. improvements.sql
5. seed.sql (optional)
```

2. Server Setup:
```bash
cd server
npm install
cp .env.example .env
# Update .env with your settings
npm start
```

3. Client Setup:
```bash
cd client
npm install
npm start
```

## Features

### Frontend
- Interactive dashboards
- Real-time analytics
- Agent performance metrics
- Email analytics
- File upload capabilities

### Backend
- RESTful API endpoints
- Authentication & authorization
- Data processing
- Error handling

### Database
- Optimized schemas
- Stored procedures
- Data migrations
- Backup procedures

## Technologies

- React with Tailwind CSS
- Express.js
- SQL Server
- JWT Authentication
- Recharts for visualizations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT