# Support Analytics Project

This project consists of two separate applications:

1. A React frontend client for visualizing support analytics data
2. A Node.js/Express backend server providing API endpoints and database integration

## Project Structure

```
support-analytics/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   └── App.js         # Main React component
│   └── package.json       # Client dependencies
│
└── server/                # Express backend application
    ├── src/
    │   ├── routes/        # API route handlers
    │   ├── config/        # Server configuration
    │   └── middleware/    # Express middleware
    ├── database/          # SQL scripts and migrations
    └── package.json       # Server dependencies
```

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- SQL Server (>= 2019)
- npm or yarn

### Server Setup

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
# Execute these scripts in SQL Server Management Studio in order:
1. database/create_database.sql
2. database/stored_procedures.sql
3. database/seed.sql (optional, for test data)
```

5. Start the server:
```bash
npm start
```

The server will run on http://localhost:3001

### Client Setup

1. Navigate to client directory (in a new terminal):
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

## Features

### Server Features
- RESTful API endpoints for analytics data
- SQL Server database integration
- Stored procedures for efficient data processing
- Error handling and logging

### Client Features
- Interactive dashboard with charts
- Agent performance metrics
- Ticket analytics visualization
- Date range filtering
- Responsive design with Tailwind CSS

## API Endpoints

- `GET /api/analytics/tickets` - Get ticket analytics data
  - Query params: startDate, endDate

- `GET /api/analytics/agent-performance` - Get agent performance metrics
  - Query params: startDate, endDate

- `GET /api/analytics/email` - Get email analytics data
  - Query params: startDate, endDate

## Technologies Used

### Server
- Express.js
- SQL Server
- Node.js
- CORS
- Helmet

### Client
- React
- React Router
- Recharts
- Axios
- Tailwind CSS
- Heroicons

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License