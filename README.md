# Task Manager Pro - Comprehensive Task Management Application

A modern, feature-rich task management application built with React, Next.js, and Supabase. Inspired by Notion, this app provides a complete solution for managing tasks, daily reports, attendance tracking, and to-do lists.

## Features

### Core Features
- **Task Manager** - Create, update, and manage tasks with priority levels and status tracking
- **Daily Reports** - Generate and track daily work reports with detailed notes
- **Attendance Tracking** - Record and monitor attendance with multiple status options
- **To-Do List** - Organize tasks by categories with quick completion tracking
- **Dashboard** - Real-time overview of all activities and statistics

### Technical Features
- **Dark/Light Mode** - Seamless theme switching with persistent preferences
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Local Storage** - Data persists in browser localStorage for offline access
- **Real-time Sync** - Automatic synchronization with cloud database
- **Authentication** - Secure user login and session management
- **Data Visualization** - Charts and graphs for reports and analytics

## Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks and server components
- **Next.js 16** - Full-stack framework with App Router
- **Tailwind CSS v4** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **Lucide React** - Beautiful icon library
- **SWR** - Data fetching and caching

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Elysia** - Lightweight web framework (optional)
- **JWT Authentication** - Secure token-based auth

### Database
- **Supabase** - PostgreSQL database with real-time capabilities
- **localStorage** - Browser-based local storage for offline support

## Project Structure

\`\`\`
task-manager-pro/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── tasks/             # Task management endpoints
│   │   ├── reports/           # Report endpoints
│   │   └── attendance/        # Attendance endpoints
│   ├── auth/                  # Authentication pages
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main dashboard page
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── dashboard.tsx          # Dashboard component
│   ├── task-manager.tsx       # Task manager component
│   ├── report-harian.tsx      # Daily report component
│   ├── absensi.tsx            # Attendance component
│   ├── todo-list.tsx          # To-do list component
│   └── sidebar.tsx            # Navigation sidebar
├── hooks/
│   ├── use-auth.ts            # Authentication hook
│   └── use-mobile.ts          # Mobile detection hook
├── lib/
│   ├── api-client.ts          # API client utilities
│   ├── db.ts                  # Database utilities
│   └── utils.ts               # Helper functions
├── public/                    # Static assets
├── scripts/                   # Database setup scripts
└── server/                    # Backend server (Elysia)
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager
- Supabase account (optional, for cloud sync)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd task-manager-pro
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=https://mrndlxwnilxuqtslqztl.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   JWT_SECRET=your_jwt_secret_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage Guide

### Dashboard
- View overview of all tasks, reports, and attendance
- See statistics and progress indicators
- Quick access to all features from the sidebar

### Task Manager
1. Click "New Task" to create a task
2. Set priority (Low, Medium, High)
3. Add due date and description
4. Track status (Pending, In Progress, Completed)
5. Edit or delete tasks as needed

### Daily Reports
1. Navigate to "Report Harian"
2. Click "Create Report" for today
3. Add tasks completed and notes
4. View report history

### Attendance
1. Go to "Absensi" section
2. Record attendance with status (Present, Absent, Late, Leave)
3. Add notes if needed
4. View attendance statistics

### To-Do List
1. Create quick to-dos with categories
2. Filter by status or category
3. Mark as complete
4. Track completion rate

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/[id]` - Get task details
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Create new report
- `GET /api/reports/[id]` - Get report details
- `PUT /api/reports/[id]` - Update report

### Attendance
- `GET /api/attendance` - Get all attendance records
- `POST /api/attendance` - Create attendance record
- `GET /api/attendance/[id]` - Get attendance details

## Database Schema

### Users Table
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  name VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Tasks Table
\`\`\`sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR NOT NULL,
  description TEXT,
  priority VARCHAR (Low, Medium, High),
  status VARCHAR (Pending, In Progress, Completed),
  due_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Reports Table
\`\`\`sql
CREATE TABLE reports (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  tasks_completed INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Attendance Table
\`\`\`sql
CREATE TABLE attendance (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  status VARCHAR (Present, Absent, Late, Leave),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### To-Do List Table
\`\`\`sql
CREATE TABLE todos (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR NOT NULL,
  category VARCHAR,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy with one click

### Deploy to Other Platforms
- **Netlify** - Connect GitHub and deploy
- **Railway** - Deploy with Railway CLI
- **Render** - Connect GitHub repository
- **Self-hosted** - Use `npm run build && npm start`

## Performance Optimization

- **Code Splitting** - Automatic with Next.js
- **Image Optimization** - Next.js Image component
- **Caching** - SWR for data caching
- **Database Indexing** - Optimized queries
- **Lazy Loading** - Components load on demand

## Security

- **JWT Authentication** - Secure token-based auth
- **HTTPS Only** - Encrypted data transmission
- **CORS Protection** - Cross-origin request handling
- **Input Validation** - Server-side validation
- **SQL Injection Prevention** - Parameterized queries
- **XSS Protection** - React's built-in XSS protection

## Troubleshooting

### Common Issues

**Issue: Data not persisting**
- Check browser localStorage is enabled
- Clear browser cache and try again
- Check browser console for errors

**Issue: API errors**
- Verify environment variables are set correctly
- Check network tab in browser DevTools
- Ensure backend server is running

**Issue: Authentication failing**
- Clear cookies and localStorage
- Check JWT_SECRET is set correctly
- Verify user credentials

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@taskmanagerpro.com or open an issue on GitHub.

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Team collaboration features
- [ ] Advanced analytics and reporting
- [ ] Integration with calendar apps
- [ ] Slack/Teams notifications
- [ ] AI-powered task suggestions
- [ ] Custom workflows and automation

## Changelog

### Version 1.0.0
- Initial release
- Core features: Tasks, Reports, Attendance, To-Do List
- Authentication system
- Dark/Light mode
- Responsive design
