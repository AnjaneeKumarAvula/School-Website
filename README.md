# School Website - Anji

A comprehensive school management system with three main dashboards: Admin, Teacher, and Parent.

## Features

### Admin Dashboard
- Add and manage teachers
- Add students with parent information
- Assign mentors to students
- Mark attendance for students
- Add marks for students (Subject, Obtained, Total)
- View all teachers and students with credentials

### Teacher Dashboard
- View assigned mentees with attendance percentage and marks
- Send messages to parents
- Receive and view messages from parents
- Monitor student academic performance

### Parent Dashboard
- View student information
- Check student marks and attendance
- Send messages to assigned mentor
- Send complaints
- View responses from teachers

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- CORS enabled

## Installation

### Backend Setup
```bash
cd dropshield_fresh_backend
npm install
# Create .env file with MongoDB connection string
# MONGO_URI=your_mongodb_connection_string
npm start
```

### Frontend Setup
```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the `dropshield_fresh_backend` folder:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Default Access

### Admin Dashboard
- Direct access from home page

### Teacher Login
- Credentials are created by admin when adding teachers

### Parent Login  
- Credentials are automatically created when admin adds a student

## Project Structure

```
dropshield_with_home/
├── dropshield_fresh_backend/    # Backend server
│   ├── config/                  # Database configuration
│   ├── controllers/             # Route controllers
│   ├── models/                  # MongoDB models
│   ├── routes/                  # API routes
│   └── server.js                # Entry point
├── src/                         # Frontend source
│   ├── components/              # React components
│   ├── pages/                   # Page components
│   ├── routes/                  # React Router setup
│   └── utils/                   # API utilities
└── index.html                   # HTML entry point
```

## License

This project is created for educational purposes.
