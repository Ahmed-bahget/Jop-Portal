# 🧑‍💼 Job Portal Web Application

Welcome to the **Job Portal App** — a full-featured job portal platform that connects **job seekers** with **employers**. This project is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), providing modern features for managing job applications, profiles, and postings.

🌐 **Live Demo (Frontend)**: [https://jop-portal-three.vercel.app/](https://jop-portal-three.vercel.app/)

---

## ✨ Features

### 👤 User Side
- Register and Login with profile picture upload
- Create and update personal profile
- Browse job listings and apply
- Track application status

### 🏢 Company Side
- Register company profile
- Post new job listings
- Manage job postings
- View applicants for each job
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
🔐 API Endpoints
👤 User Routes (/api/v1/user)
POST /register – Register user with profile picture upload

POST /login – Login user

GET /logout – Logout user

POST /profile/update – Update user profile (auth + upload required)

🏢 Company Routes (/api/v1/company)
POST /registerCompany – Register a new company (auth + upload required)

GET /get – Get all companies (auth)

GET /get/:id – Get company by ID (auth)

PUT /update/:id – Update company info (auth + upload required)

💼 Job Routes (/api/v1/job)
POST /post – Post a new job (auth)

GET /get – Get all jobs (auth)

GET /get/:id – Get job by ID (auth)

GET /getadminjobs – Get jobs created by logged-in employer (auth)

📄 Application Routes (/api/v1/application)
GET /apply/:id – Apply for a job by job ID (auth)

GET /get – Get all jobs user has applied to (auth)

GET /:id/applicants – Get applicants for a job (auth)

POST /status/:id/update – Update status of an applicant (auth)


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
