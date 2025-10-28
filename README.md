# Task Manager Pro - Comprehensive Task Management Application

A modern, feature-rich task management application built with **React**, **Next.js**, and **Supabase**.  
Inspired by Notion, this app provides a complete solution for managing **tasks**, **daily reports**, **attendance tracking**, and **to-do lists**.

---

## 🚀 Features

### 🧩 Core Features
- **Task Manager** — Create, update, and manage tasks with priority levels and status tracking.
- **Daily Reports** — Generate and track daily work reports with detailed notes.
- **Attendance Tracking** — Record and monitor attendance with multiple status options.
- **To-Do List** — Organize tasks by categories with quick completion tracking.
- **Dashboard** — Real-time overview of all activities and statistics.

### ⚙️ Technical Features
- **Dark/Light Mode** — Seamless theme switching with persistent preferences.
- **Responsive Design** — Works perfectly on desktop, tablet, and mobile.
- **Local Storage** — Data persists for offline access.
- **Real-time Sync** — Automatic synchronization with Supabase.
- **Authentication** — Secure user login and session management.
- **Data Visualization** — Charts and graphs for reports and analytics.

---

## 🧠 Tech Stack

### Frontend
- **React 19**
- **Next.js 16 (App Router)**
- **Tailwind CSS v4**
- **Recharts**, **Lucide React**, **SWR**

### Backend
- **Next.js API Routes**
- **Elysia (optional lightweight server)**
- **JWT Authentication**

### Database
- **Supabase (PostgreSQL)**
- **localStorage** for offline support

---

## 📂 Project Structure

```bash
task-manager-pro/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── tasks/
│   │   ├── reports/
│   │   └── attendance/
│   ├── auth/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── dashboard.tsx
│   ├── task-manager.tsx
│   ├── report-harian.tsx
│   ├── absensi.tsx
│   ├── todo-list.tsx
│   └── sidebar.tsx
├── hooks/
│   ├── use-auth.ts
│   └── use-mobile.ts
├── lib/
│   ├── api-client.ts
│   ├── db.ts
│   └── utils.ts
├── public/
├── scripts/
└── server/
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm / yarn / pnpm / bun
- Supabase account (optional)

### Installation

```bash
git clone https://github.com/siabang35/task_manager.git
cd task-manager
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
JWT_SECRET=your_jwt_secret_here
```

---

## 📘 Usage Guide

### Dashboard
- Overview of all tasks, reports, and attendance.

### Task Manager
1. Create a new task.
2. Set priority, due date, and status.
3. Edit or delete tasks.

### Daily Reports
1. Create daily report with completed tasks.
2. Track report history.

### Attendance
1. Record attendance with status.
2. View attendance statistics.

### To-Do List
1. Add to-do items and mark as completed.

---

## 🧩 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |

### Tasks
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/[id]` | Update task |
| DELETE | `/api/tasks/[id]` | Delete task |

---

## 🧾 Database Schema (Simplified)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  name VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## ☁️ Deployment

### Vercel (Recommended)
1. Push to GitHub.
2. Connect to Vercel.
3. Add environment variables.
4. Deploy.

### Others
- Netlify, Railway, Render, or self-hosted options available.

---

## 🔒 Security
- JWT authentication
- HTTPS enforced
- Input validation & SQL injection prevention
- XSS protection

---

## 🧰 Troubleshooting

| Issue | Solution |
|-------|-----------|
| Data not persisting | Check localStorage / browser cache |
| API errors | Verify `.env` setup and network status |
| Authentication failing | Check JWT secret and credentials |

---

## 🧑‍💻 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/awesome`)
3. Commit changes (`git commit -m 'Add awesome feature'`)
4. Push branch (`git push origin feature/awesome`)
5. Open Pull Request

---

## 📜 License

Licensed under the **MIT License** — see `LICENSE` for details.

---

## 🗺️ Roadmap
- [ ] Mobile app (React Native)
- [ ] Team collaboration
- [ ] Analytics & reporting
- [ ] Calendar integration
- [ ] Slack/Teams notifications
- [ ] AI task suggestions
- [ ] Automation workflows

---

## 🕒 Changelog

### v1.0.0
- Initial release with all core modules.
