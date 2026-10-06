# SehatSathi

**🌟 Live Demo:** [https://sehat-sathi-eosin.vercel.app](https://sehat-sathi-eosin.vercel.app)

SehatSathi is a healthcare management and discovery platform built for patients, doctors, and healthcare administrators. It combines doctor discovery, appointment booking, medical record management, healthcare facility locating, and AI-based risk assessment in a single experience.

## Overview

The platform is split into a Vite + React frontend and a Node.js + Express backend with MongoDB. It is designed to support:

- Patient sign-up and login
- Doctor search and profiles
- Appointment booking and tracking
- Medical record upload and viewing
- AI-powered risk assessment for health conditions
- Nearby hospital and pharmacy discovery via OpenStreetMap data
- Separate doctor and patient dashboard views

## Key Features

### Patient Experience
- Secure authentication and profile management
- Search doctors by specialty, location, and rating
- View doctor profiles, qualifications, reviews, and availability
- Book appointments and monitor status
- Upload and manage medical records
- Check AI-driven health risk prediction
- Locate nearby hospitals, clinics, and pharmacies

### Doctor Experience
- Doctor profile and availability management
- Access to appointment workflows
- Review and update professional profile data

### AI Risk Prediction
- Assesses patient health indicators and symptoms
- Returns risk score, disease-risk breakdown, recommendations, and confidence levels
- Stores risk assessment history for the patient

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Leaflet + React Leaflet
- Lucide React icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- Helmet, CORS, rate limiting, sanitization middleware
- Multer for file uploads

## Project Structure

```text
SehatSathi/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seeders/
│   │   └── utils/
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── uploads/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .gitignore
├── index.html
├── package.json
├── public/
├── vite.config.js
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ installed
- MongoDB running locally or a MongoDB Atlas connection string
- A browser for the frontend

## Configuration

### Frontend environment
The frontend reads its API URL from the root `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend environment
Copy the example backend environment file and update the values:

```bash
cd backend
copy .env.example .env
```

Example contents:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/sehatsathi
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5174
UPLOAD_PATH=uploads/
MAX_FILE_SIZE=10485760
```

## Getting Started

### 1) Install dependencies

```bash
npm install
cd backend
npm install
```

### 2) Start MongoDB
Ensure your MongoDB instance is running before launching the backend.

### 3) Run the backend

```bash
cd backend
npm run dev
```

The API will run at:

```text
http://localhost:5000/api
```

### 4) Run the frontend

From the project root:

```bash
npm run dev
```

The frontend is served by Vite and typically runs at:

```text
http://localhost:5173
```

## Available Scripts

### Root frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Build production bundle
npm run preview  # Preview production build
npm run lint     # Run Oxlint
```

### Backend
```bash
npm run dev      # Start Express server with nodemon
npm run start    # Start the Express server
npm run seed     # Seed sample database data
```

## Main Application Routes

The frontend includes routes such as:

- `/` — Home page
- `/auth` — Login / registration
- `/doctors` — Search and browse doctors
- `/locator` — Nearby healthcare facilities
- `/book` — Appointment booking flow
- `/doctor-dashboard` — Doctor dashboard
- `/patient-dashboard` — Patient dashboard
- `/ai-risk` — AI risk assessment page

## API Highlights

The backend exposes REST endpoints for:

- `/api/auth` — register, login, profile and password management
- `/api/doctors` — doctor listing, details, reviews, slots
- `/api/appointments` — booking and scheduling
- `/api/records` — medical records management
- `/api/hospitals` — hospital and facility data
- `/api/risk` — AI risk assessment and history
- `/api/health` — health check endpoint

## Notes

- The project uses OpenStreetMap-based nearby facility data for healthcare location services.
- Uploaded medical records are stored locally under the backend `uploads/` directory.
- It is built as a full-stack prototype and can be extended with production-grade storage, CI/CD, and deployment pipelines.

## Future Enhancements

Possible next steps include:

- Role-based dashboards with stricter permissions
- Payment and insurance integration
- Real AI model integration with trained health-risk pipelines
- Advanced analytics and reporting
- Cloud deployment with Docker and managed MongoDB

## Summary

SehatSathi is a modern healthcare platform that brings doctor discovery, appointment management, medical records, healthcare proximity tools, and AI-assisted health risk evaluation into one application ecosystem.
