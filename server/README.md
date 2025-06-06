# Express Contact Server

A Node.js/Express server that provides API endpoints for handling contact form submissions and retrieving messages. Supports both Firebase Firestore and in-memory storage options.

## Features

- Contact form submission endpoint
- Protected messages retrieval endpoint
- API key authentication
- Input validation
- CORS configuration
- Error handling
- Request logging
- Security headers

## Prerequisites

- Node.js 14.x or higher
- npm or yarn
- Firebase project (if using Firestore storage)

## Installation

1. Clone the repository
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the server directory:
   ```
   PORT=3001
   API_SECRET_KEY=your-secure-api-key-here
   NODE_ENV=development
   USE_FIREBASE=true  # Set to false for in-memory storage

   # Firebase Configuration (required if USE_FIREBASE=true)
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   ```

2. For Firebase setup:
   - Create a Firebase project
   - Generate a service account key
   - Add the Firebase configuration to your `.env` file

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### POST /api/contact
Submit a contact form message.

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, this is my message."
}
```

### GET /api/messages
Retrieve all messages (requires API key).

Headers:
```
x-api-key: your-api-key-here
```

## Storage Options

### Firebase Firestore
- Set `USE_FIREBASE=true` in `.env`
- Requires Firebase configuration
- Persistent storage
- Production-ready

### In-Memory Storage
- Set `USE_FIREBASE=false` in `.env`
- Data is lost on server restart
- Suitable for development/testing

## Security

- API key authentication for sensitive endpoints
- Input validation and sanitization
- CORS configuration
- Helmet security headers
- Error handling middleware

## Development

- Uses nodemon for auto-reloading
- ESLint configuration included
- Morgan logging in development mode

## Error Handling

The server includes comprehensive error handling:
- Validation errors (400)
- Authentication errors (401)
- Not found errors (404)
- Server errors (500)

## Testing

Example curl commands:

Submit contact form:
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","message":"Test message"}'
```

Get messages:
```bash
curl http://localhost:3001/api/messages \
  -H "x-api-key: your-api-key-here"
```

## Deployment

The server can be deployed to various platforms:
- Heroku
- Railway
- Render
- Any Node.js hosting service

Remember to:
1. Set environment variables
2. Configure CORS for production domain
3. Use secure API keys
4. Enable required ports 