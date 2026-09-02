# Week 2 Backend API

A Node.js and Express.js backend project developed as part of the SkillNexis Full Stack Web Developer Internship.

## Features

### 1. To-Do List REST API
- Create a task
- Get all tasks
- Update a task
- Delete a task
- MongoDB database integration

### 2. User Authentication
- User registration
- User login
- Password hashing using bcryptjs
- JWT token generation
- JWT authentication middleware

### 3. Notes App
- Create notes
- Get all notes
- Update notes
- Delete notes
- JWT-protected routes
- MongoDB database integration

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token (JWT)
- dotenv
- CORS
- Nodemon

## Project Structure

```text
backend/
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Task.js
│   ├── User.js
│   └── Note.js
├── routes/
│   ├── taskRoutes.js
│   ├── authRoutes.js
│   └── noteRoutes.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── server.js