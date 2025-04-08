# 🧑‍💼 Job Portal Web Application

Welcome to the **Job Portal App** — a full-featured job portal platform that connects **job seekers** with **employers**. This project is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), providing modern features for managing job applications, profiles, and postings.

🌐 **Live Demo (Frontend)**: [https://jop-portal-three.vercel.app/](https://jop-portal-three.vercel.app/)

---

## 📚 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Folder Structure](#-folder-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 👤 User Side
- Register and Login (JWT-based authentication)
- Create and update personal profile
- Browse job listings
- Apply for jobs
- Track application status

### 🏢 Employer Side
- Register and Login
- Create company profile
- Post new job listings
- Manage posted jobs
- View applicants for each job

### 🛡️ Admin (Optional)
- Manage users
- Manage job postings
- Analytics dashboard (planned)

---

## 🛠 Technologies Used

| Layer        | Stack                            |
|--------------|----------------------------------|
| Frontend     | React.js, Tailwind CSS, Vite     |
| Backend      | Node.js, Express.js              |
| Database     | MongoDB (Mongoose ODM)           |
| Authentication | JSON Web Tokens (JWT)         |
| Hosting      | Vercel (Frontend), Render/Heroku (Backend) |

---

## 🧱 Project Architecture

- **Frontend**: SPA with React + Tailwind for styling, Axios for API requests
- **Backend**: RESTful APIs using Express.js
- **Database**: MongoDB (cloud-hosted via MongoDB Atlas)

---

## 🚀 Getting Started

Follow these instructions to set up the backend on your local machine:

### 1. Clone the repository

```bash
git clone https://github.com/Ahmed-bahget/Jop-Portal.git
-backend
cd job-portal/backend
npm install
PORT=1500
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
npm start
-frontend
cd job-portal/frontend
npm install
npm run dev

🔐 API Documentation
Base URL: http://localhost:5000/api

Auth Routes
POST /auth/register - Register new user

POST /auth/login - Login and receive token

Job Routes
GET /jobs - Get all jobs

POST /jobs - Create job (Employer only)

PUT /jobs/:id - Update job

DELETE /jobs/:id - Delete job

User Routes
GET /profile - Get user profile

PUT /profile - Update user profile

POST /apply/:jobId - Apply for a job

👨‍💻 Developed by
Ahmed Bahget Elsayed

Feel free to connect .
