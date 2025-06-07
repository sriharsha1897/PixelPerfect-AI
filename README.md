# Pixelperfect AI Application

## Overview
A modern web application built with React and Express that provides a sleek contact form interface with message management capabilities. The application allows users to submit contact messages through a beautiful UI and administrators to view submitted messages securely. Messages are stored in memory using a simple array data structure.

## Design Rationale

### UX Choices
- **Clean Form Interface**: Minimalist design that makes form submission intuitive and straightforward
- **Responsive Layout**: Mobile-first design approach ensuring great user experience across all devices
- **Real-time Validation**: Immediate feedback on form inputs to help users submit correct information
- **Admin Dashboard**: Secure interface for viewing and managing submitted messages

### UI Components
- Built with shadcn-ui for consistent, modern UI components
- Tailwind CSS for responsive and maintainable styling
- Toast notifications for user feedback
- Loading states and error handling for better UX

### AI Development Tools
- **Cursor AI**: Used as the primary IDE for intelligent code completion and real-time suggestions
- **Claude AI**: Leveraged for code review, optimization, and architectural decisions
- **Lovable AI**: Utilized for initial project setup and component structure planning

## Setup & Run

### Prerequisites
- Node.js 14.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:sriharsha1897/PixelPerfect-AI.git
cd pixel-perfect-ai

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

### Configuration

1. Frontend Environment (.env):
```env
VITE_API_URL=http://localhost:3001
```

2. Backend Environment (server/.env):
```env
PORT=3001
API_SECRET_KEY=your_secret_key
NODE_ENV=development
```

### Running Locally

```bash
# Start frontend (from root directory)
npm run dev
# Frontend runs on http://localhost:8081

# Start backend (from server directory)
npm run dev
# Backend runs on http://localhost:3001
```

## Features
- 📝 User-friendly contact form
- ✉️ Secure message submission
- 🔐 Protected admin message viewing
- ✨ Modern, responsive UI
- 🛡️ Input validation and sanitization
- 📱 Mobile-friendly design
- 💾 Simple in-memory message storage

## API Endpoints

### POST /api/contact
Submit a contact form message
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, this is my message."
}
```

### GET /api/messages
View all messages (requires API key)
```
Header: x-api-key: your_secret_key
```

## Storage Implementation
The application uses a simple in-memory array to store messages. Please note that messages will be lost when the server restarts. This implementation is suitable for development and testing purposes.

## Tech Stack
- Frontend: Vite + React + TypeScript + shadcn-ui
- Backend: Express.js + Node.js
- Storage: In-memory Array
- Styling: Tailwind CSS
- Validation: Express Validator
- Security: Helmet, CORS
