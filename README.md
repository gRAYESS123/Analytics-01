# Support Analytics Project

This project consists of two completely independent applications:
1. A React frontend client for data visualization and user interface
2. A Node.js/Express backend server providing API endpoints

## Project Structure

```
support-analytics/
├── client/              # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── Pages/         # Page components
│   │   ├── Services/      # API service functions
│   │   └── App.js         # Main React component
│   ├── public/
│   └── package.json
│
├── server/              # Express backend application
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── config/        # Configuration files
│   │   └── server.js      # Main server file
│   ├── database/          # SQL scripts
│   └── package.json
│
└── README.md

```

## Server Application

### Setup
1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Update .env with your database credentials
   ```

4. Set up the database:
   ```bash
   # Execute these scripts in SQL Server Management Studio:
   1. database/create_database.sql
   2. database/schema.sql
   3. database/improvements.sql
   4. database/stored_procedures.sql
   5. database/seed.sql (optional, for test data)
   ```

5. Start the server:
   ```bash
   npm start
   ```

The server will run on http://localhost:3001

### API Endpoints
- GET /api/analytics/tickets - Get ticket analytics
- GET /api/analytics/agent-performance - Get agent performance metrics
- GET /api/analytics/email - Get email analytics

## Client Application

### Setup
1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The client will run on http://localhost:3000

### Features
- Dashboard with ticket analytics
- Agent performance metrics
- Email analytics
- Date range filtering
- Interactive charts and visualizations

## Development

### Server Development
- Uses Express.js for API
- SQL Server for database
- Stored procedures for data analytics

### Client Development
- React for UI components
- Recharts for data visualization
- Tailwind CSS for styling
- Axios for API requests

## Contributing
1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License
MIT