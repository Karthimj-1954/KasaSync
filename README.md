# KasaSync - Real-Time Property Rental, Maintenance & Amenity Management Platform

> **Smart Property Management in Real Time**

KasaSync is a production-ready, enterprise-grade full-stack web platform designed to streamline property rentals, maintenance request dispatches, conflict-free community amenity reservations, real-time messaging, and multi-role analytical dashboards.

---

## 🛠 Tech Stack

### Frontend (`/client`)
- **Framework**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS, Custom Glassmorphism Theme, Dark/Light Mode
- **UI Components**: Shadcn UI inspired architecture, Lucide React icons, Framer Motion
- **State & Data Fetching**: React Context, Axios, TanStack Query (React Query)
- **Real-Time & Charts**: Socket.IO Client, Recharts, React Hot Toast

### Backend (`/server`)
- **Runtime & Framework**: Node.js + Express.js
- **Database**: MongoDB Atlas via Mongoose with clean schemas & indexing
- **Security**: JWT Authentication (Access + Refresh Tokens), bcryptjs, Helmet, CORS, Express Rate Limit, Express Validator
- **Real-Time Communication**: Socket.IO event server with user rooms & presence
- **File Processing**: Multer + Cloudinary image processing

---

## 🚀 Key Modules & Features

1. **Authentication & User Management**:
   - Role-based authorization for **Admin**, **Property Owner**, **Tenant**, and **Maintenance Staff**.
   - 1-click Quick Login demo presets on `/login`.

2. **Property Management**:
   - Zillow-inspired property card catalog with image galleries, rent pricing, layout specs, and location filtering.
   - Owner CRUD listing control and lease assignment.

3. **Maintenance Engine**:
   - 7-step resolution lifecycle (`Pending` → `Accepted` → `Assigned` → `In Progress` → `Completed`).
   - Priority dispatching (Low, Medium, High, Emergency), resolution visualizer, activity notes, and proof photo uploads.

4. **Conflict-Free Amenity Reservations**:
   - Predefined catalog of 9 community amenities (Gym, Pool, Club House, Meeting Room, Parking, Tennis Court, Party Hall, Garden, Children Play Area).
   - Collision validation preventing time-slot overlap.

5. **Real-Time System & Messaging**:
   - Socket.IO live notifications, status push updates, and direct messaging with typing indicators and read receipts.

6. **Role Dashboards & Recharts Analytics**:
   - Role-customized portals for Tenants, Owners, Staff, and Admins.
   - Interactive charts for weekly trends, maintenance status distribution, and amenity popularity.

---

## 📁 Repository Structure

```
KasaSync/
├── client/          # Next.js 15 App Router Frontend
├── server/          # Express.js REST API & Socket.IO Server
├── .gitignore       # Root Git ignore rules
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone & Environment Setup
Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
MONGODB_URI=your_mongodb_atlas_connection_string
```

Create `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### 2. Install & Seed
```bash
# Backend Setup
cd server
npm install
npm run seed

# Frontend Setup
cd ../client
npm install
```

### 3. Run Locally
```bash
# Terminal 1 - Backend Server
cd server
npm start

# Terminal 2 - Frontend Client
cd client
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🌐 Production Deployment Architecture

- **Frontend**: Vercel (`https://kasasync.vercel.app`)
- **Backend API & Real-Time Server**: Railway (`https://kasasync-api-production.up.railway.app`)
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary
- **Email**: Mailtrap (Development) / Gmail SMTP (Production)

### Deploying Backend to Railway
1. Log in to [Railway](https://railway.app) and create a **New Project** $\rightarrow$ **Deploy from GitHub repo**.
2. Select your repository and specify the Root Directory as `server`.
3. Railway automatically detects `server/railway.json` and configures the Nixpacks Node.js builder.
4. Add your Environment Variables in Railway Settings (`MONGODB_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `CLOUDINARY_*`, `SMTP_*`, `CLIENT_URL`, `SOCKET_CORS_ORIGIN`).
5. Copy your Railway Public Domain (e.g., `https://kasasync-api-production.up.railway.app`).
6. Update `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SOCKET_URL` on Vercel with your Railway URL.

