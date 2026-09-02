# SkillNexis Week 3 - Full Stack Task Manager

A full-stack Task Manager application built as part of the SkillNexis Full Stack Web Developer Internship - Week 3 assignment.

## Technologies Used

### Frontend
- React.js
- JavaScript
- Axios
- React Router
- Context API
- HTML
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer

## Features

### Authentication
- User login
- JWT authentication
- Protected routes
- Logout
- Context API for authentication state

### Task Management
- Add tasks
- View tasks
- Mark tasks as completed/pending
- Delete tasks
- Filter tasks by:
  - All
  - Pending
  - Completed

### Image Upload
- Select an image
- Preview image before uploading
- Upload image using Multer
- Store image on the backend
- Display uploaded image

## Project Structure

```text
Week-3/
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   └── Login.jsx
│   │   ├── ImageUpload.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── TaskManager.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md