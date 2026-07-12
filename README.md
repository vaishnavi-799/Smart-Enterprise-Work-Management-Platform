# 🚀 Smart Enterprise Work Management Platform

A full-stack **Enterprise Work Management System** designed to help organizations manage projects, tasks, users, and productivity tracking efficiently.

The platform provides secure authentication, project management, task tracking, activity monitoring, and user-specific data management.

---

## 📌 Features

### 🔐 Authentication & User Management
- User registration and login
- JWT-based authentication
- Secure password hashing
- User-specific data access
- Protected routes

### 📁 Project Management
- Create new projects
- View personal projects
- Update project details
- Delete projects
- Track:
  - Project priority
  - Status
  - Progress percentage
  - Due dates
- Each user can only access their own projects

### ✅ Task Management
- Create and manage tasks
- Assign tasks
- Track task completion
- Monitor task progress

### 📊 Dashboard
- Active project statistics
- Priority overview
- Task summary
- Project progress visualization
- Activity feed

### 📝 Activity Tracking
- Records user actions:
  - Project creation
  - Project updates
  - Project deletion

---

# 🛠️ Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript
- Tailwind CSS
- Chart.js
- Lucide Icons


## Backend

- Node.js
- Express.js
- JWT Authentication
- REST API


## Database

- MongoDB
- MongoDB Atlas
- Mongoose ODM


## Tools

- Git
- GitHub
- VS Code
- Postman

---


# 📂 Project Structure

```
Smart-Enterprise-Work-Management-Platform
│
├── frontend
│   │
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── projects.html
│   ├── tasks.html
│   ├── task-details.html
│   ├── profile.html
│   ├── style.css
│   └── assets
│
│
└── backend
    │
    ├── config
    │   └── db.js
    │
    ├── controllers
    │   ├── authController.js
    │   ├── projectController.js
    │   ├── taskController.js
    │   └── userController.js
    │
    ├── middleware
    │   ├── authMiddleware.js
    │   ├── errorHandler.js
    │   └── role.js
    │
    ├── models
    │   ├── User.js
    │   ├── Project.js
    │   ├── Task.js
    │   └── Activity.js
    │
    ├── routes
    │   ├── authRoutes.js
    │   ├── projectRoutes.js
    │   ├── taskRoutes.js
    │   └── userRoutes.js
    │
    ├── utils
    │   └── asyncHandler.js
    │
    ├── .env
    ├── package.json
    ├── package-lock.json
    └── server.js
```

---

# 🛠️ Technology Stack

## Frontend
- HTML5
- CSS3
- JavaScript
- Tailwind CSS
- Chart.js
- Lucide Icons

## Backend
- Node.js
- Express.js
- JWT Authentication
- REST API

## Database
- MongoDB Atlas
- Mongoose

## Tools
- Git
- GitHub
- VS Code
- Postman

---

# 🔗 API Endpoints

## Authentication APIs

### Register User

```
POST /api/auth/register
```

Request:

```json
{
"name":"Vaishnavi",
"email":"user@gmail.com",
"password":"password123"
}
```

---

### Login User

```
POST /api/auth/login
```

Request:

```json
{
"email":"user@gmail.com",
"password":"password123"
}
```

Response:

```json
{
"token":"jwt_token"
}
```

---

# 👤 User APIs

### Get User Profile

```
GET /api/users/profile
```

Headers:

```
Authorization: Bearer <token>
```

---

# 📁 Project APIs

All project APIs are protected.
Each user can only access their own projects.

---

### Get Projects

```
GET /api/projects
```

Headers:

```
Authorization: Bearer <token>
```

Response:

```json
[
 {
  "name":"Attendance Tracking System",
  "priority":"High",
  "status":"In Progress",
  "progress":70,
  "createdBy":"user_id"
 }
]
```

---

### Create Project

```
POST /api/projects
```

Headers:

```
Authorization: Bearer <token>
```

Body:

```json
{
"name":"Resume Checker",
"description":"AI based resume analysis",
"priority":"High",
"status":"In Progress",
"progress":50,
"dueDate":"2026-07-20"
}
```

---

### Get Single Project

```
GET /api/projects/:id
```

---

### Update Project

```
PUT /api/projects/:id
```

Example:

```json
{
"status":"Completed",
"progress":100
}
```

---

### Delete Project

```
DELETE /api/projects/:id
```

---

# ✅ Task APIs

### Get Tasks

```
GET /api/tasks
```

---

### Create Task

```
POST /api/tasks
```

Body:

```json
{
"title":"Complete frontend",
"description":"Finish project UI",
"status":"Pending"
}
```

---

### Update Task

```
PUT /api/tasks/:id
```

---

### Delete Task

```
DELETE /api/tasks/:id
```

---

# 🔐 Authentication Flow

```
User Login
     |
     |
Backend validates credentials
     |
     |
JWT Token Generated
     |
     |
Frontend stores token
     |
     |
Token sent with every API request
     |
     |
Middleware verifies user
     |
     |
Access user-specific data
```

---

# ⚙️ Installation Commands

## Clone Repository

```bash
git clone https://github.com/vaishnavi-799/Smart-Enterprise-Work-Management-Platform.git
```

---

## Backend Setup

Move into backend:

```bash
cd backend
```

Install packages:

```bash
npm install
```

---

## Create Environment File

Create:

```
backend/.env
```

Add:

```env
PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/workflowpro

JWT_SECRET=mysecretkey
```

---

# ▶️ Run Backend Server

Development:

```bash
npm start
```

Server:

```
http://localhost:5000
```

---

# 🌐 Run Frontend

Open frontend files:

```
frontend/login.html
frontend/dashboard.html
frontend/projects.html
```

or use VS Code Live Server.

---

# 🧪 Testing APIs

Using Postman:

1. Register user

```
POST /api/auth/register
```

2. Login

```
POST /api/auth/login
```

3. Copy JWT token

4. Add Header:

```
Authorization:
Bearer token
```

5. Access protected APIs

---

# 📌 Git Commands

Initialize repository:

```bash
git init
```

Add files:

```bash
git add .
```

Commit:

```bash
git commit -m "Initial commit"
```

Connect remote:

```bash
git remote add origin https://github.com/vaishnavi-799/Smart-Enterprise-Work-Management-Platform.git
```

Push code:

```bash
git push origin main
```

---

# 🚀 Features Implemented

✅ User Authentication  
✅ JWT Authorization  
✅ User Specific Projects  
✅ Project CRUD Operations  
✅ Task Management  
✅ Activity Tracking  
✅ Dashboard Analytics  
✅ MongoDB Integration  
✅ REST API Architecture  

---





