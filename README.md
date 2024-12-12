# Support Analytics Project

A complete support ticket analytics system with a React frontend, Express backend, and SQL Server database.

## Project Structure

This project is organized into three main components:

```
Analytics-Project/
├── client-analytics/     # React frontend application
├── server-analytics/     # Express backend server
└── database-analytics/   # SQL Server database scripts
```

### Client Analytics

The frontend application built with React, featuring:
- Interactive dashboards
- Real-time analytics
- Performance metrics visualization
- Email analytics

Setup:
```bash
cd client-analytics
npm install
npm start
```

### Server Analytics

The backend API server built with Express.js, providing:
- RESTful API endpoints
- Authentication
- Data processing
- Performance metrics

Setup:
```bash
cd server-analytics
npm install
npm start
```

### Database Analytics

SQL Server database scripts and migrations:
- Table definitions
- Stored procedures
- Data migrations
- Backup procedures

Setup:
```sql
1. Execute create_database.sql
2. Run schema.sql
3. Apply improvements.sql
4. Set up stored_procedures.sql
5. (Optional) Run seed.sql for test data
```

## Technologies Used

### Frontend
- React
- Recharts
- Tailwind CSS
- Axios

### Backend
- Express.js
- SQL Server
- JWT Authentication
- CORS

### Database
- SQL Server
- Stored Procedures
- Automated Backups
- Data Migrations

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/Analytics-Project.git
```

2. Set up the database:
```bash
cd database-analytics
# Execute SQL scripts in order
```

3. Start the backend server:
```bash
cd server-analytics
npm install
npm start
```

4. Start the frontend application:
```bash
cd client-analytics
npm install
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.