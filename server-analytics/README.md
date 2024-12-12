# Support Analytics Server

This is the backend server for the Support Analytics system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Update the .env file with your settings
```

3. Start the server:
```bash
npm start
```

## API Endpoints

### Analytics
- GET /api/analytics/tickets
- GET /api/analytics/agent-performance
- GET /api/analytics/email

### Authentication
- POST /api/auth/login
- POST /api/auth/refresh

## Structure

```
src/
├── config/         # Configuration files
├── middleware/     # Express middleware
├── routes/         # API routes
└── utils/          # Utility functions
```

## Technologies

- Express.js
- SQL Server
- JWT Authentication
- CORS
