# KasaSync - Full-Stack Next.js 15 Property Management Platform

> **Smart Property Management in Real Time • Deployed 100% on Vercel**

KasaSync is a production-ready, enterprise-grade **Full-Stack Next.js 15 App Router** application designed to streamline property rentals, maintenance request dispatches, community amenity reservations, in-app notifications, and analytical dashboards.

---

## 🛠 Unified Technology Stack

- **Framework**: Next.js 15 (App Router) + React 19 (JavaScript)
- **API & Serverless**: Next.js 15 Route Handlers (`app/api/*`)
- **Database**: MongoDB Atlas via Mongoose with cached serverless connections (`lib/mongodb.js`)
- **Image Storage**: Cloudinary SDK helper (`lib/cloudinary.js`)
- **Authentication**: JWT Access & Refresh Tokens, bcryptjs password hashing, role-based middleware guards
- **Styling & UI**: Tailwind CSS, Custom Glassmorphism Theme, Shadcn UI primitives, Lucide React, Framer Motion
- **Hosting**: 1-click deployment to **Vercel**

---

## 📁 Repository Structure

```
KasaSync/
├── app/                  # Next.js 15 App Router Pages & API Route Handlers
│   ├── (auth)/           # Login, Register, Password Reset
│   ├── (dashboard)/      # Properties, Maintenance, Amenities, Bookings, Messages, Analytics, Admin
│   └── api/              # Full-Stack Route Handlers (/api/auth, /api/properties, /api/maintenance, etc)
├── components/           # UI Components (Cards, Buttons, Inputs, Layouts, Dashboards)
├── context/              # AuthContext, ThemeContext, SocketContext
├── lib/                  # mongodb.js (Serverless Mongoose Cache), cloudinary.js
├── models/               # Mongoose Schemas (User, Property, MaintenanceRequest, Amenity, Booking, etc)
├── services/             # Axios REST Services
├── vercel.json           # Vercel deployment configuration
├── .env.local            # Environment configuration
└── README.md
```

---

## 🔑 Demo Account Credentials

Use the 1-click Quick Login preset buttons on `/login`:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@kasasync.com` | `Password123!` |
| **Property Owner** | `owner@kasasync.com` | `Password123!` |
| **Tenant** | `tenant@kasasync.com` | `Password123!` |
| **Maintenance Staff** | `staff@kasasync.com` | `Password123!` |

---

## ⚡ How to Run & Deploy

### 1. Local Development
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### 2. Deploy to Vercel
1. Push repository to GitHub.
2. Import project in [Vercel Dashboard](https://vercel.com).
3. Add Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `SMTP_*`).
4. Click **Deploy**.
