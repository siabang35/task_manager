# Task Manager Pro - Installation & Running Guide

Complete guide to install and run the Task Manager Pro application.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Steps](#installation-steps)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Development](#development)
6. [Building for Production](#building-for-production)
7. [Troubleshooting](#troubleshooting)

## System Requirements

### Minimum Requirements
- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (or yarn, pnpm, bun)
- **RAM**: 2GB minimum
- **Disk Space**: 500MB for dependencies
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

### Recommended Requirements
- **Node.js**: 20.0.0 or higher
- **npm**: 10.0.0 or higher
- **RAM**: 4GB or more
- **Disk Space**: 1GB
- **OS**: macOS, Linux, or Windows 10+

## Installation Steps

### Step 1: Clone the Repository

\`\`\`bash
# Using HTTPS
git clone https://github.com/yourusername/task-manager-pro.git

# Using SSH
git clone git@github.com:yourusername/task-manager-pro.git

# Navigate to project directory
cd task-manager-pro
\`\`\`

### Step 2: Install Dependencies

Choose one of the following package managers:

**Using npm (recommended)**
\`\`\`bash
npm install
\`\`\`

**Using yarn**
\`\`\`bash
yarn install
\`\`\`

**Using pnpm**
\`\`\`bash
pnpm install
\`\`\`

**Using bun**
\`\`\`bash
bun install
\`\`\`

### Step 3: Verify Installation

\`\`\`bash
# Check Node.js version
node --version

# Check npm version
npm --version

# List installed dependencies
npm list
\`\`\`

## Configuration

### Step 1: Create Environment File

Create a `.env.local` file in the root directory:

\`\`\`bash
# macOS/Linux
touch .env.local

# Windows
type nul > .env.local
\`\`\`

### Step 2: Add Environment Variables

Edit `.env.local` and add the following variables:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://mrndlxwnilxuqtslqztl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Authentication
JWT_SECRET=your_jwt_secret_here_min_32_characters

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/taskmanager

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
\`\`\`

### Step 3: Get Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy `Project URL` and `anon public key`
5. Paste into `.env.local`

### Step 4: Generate JWT Secret

\`\`\`bash
# Generate a random JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

Copy the output and paste into `JWT_SECRET` in `.env.local`

## Running the Application

### Development Mode

Start the development server with hot reload:

\`\`\`bash
npm run dev
\`\`\`

The application will be available at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api

### Access the Application

1. Open your browser
2. Navigate to `http://localhost:3000`
3. You should see the login page
4. Create a new account or login with existing credentials

### Development Server Features

- Hot Module Replacement (HMR) - Changes reflect instantly
- Fast Refresh - Preserves component state
- Error Overlay - Shows errors in browser
- Source Maps - Easy debugging

## Building for Production

### Step 1: Build the Application

\`\`\`bash
npm run build
\`\`\`

This will:
- Compile TypeScript
- Optimize React components
- Generate static assets
- Create production bundle

### Step 2: Start Production Server

\`\`\`bash
npm start
\`\`\`

The application will run on `http://localhost:3000`

### Step 3: Verify Production Build

- Check that all pages load correctly
- Test all features
- Verify API endpoints work
- Check performance in DevTools

## Development

### Available Scripts

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run backend server (Elysia)
npm run server
\`\`\`

### Project Structure

\`\`\`
task-manager-pro/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Auth pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components
│   └── [feature].tsx     # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static files
├── scripts/              # Database scripts
├── server/               # Backend server
├── .env.local            # Environment variables
├── next.config.mjs       # Next.js config
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies
\`\`\`

### Key Files

- **app/page.tsx** - Main dashboard page
- **app/layout.tsx** - Root layout with theme provider
- **components/sidebar.tsx** - Navigation sidebar
- **lib/api-client.ts** - API client utilities
- **hooks/use-auth.ts** - Authentication hook

## Database Setup

### Initialize Database

\`\`\`bash
# Run database setup script
npm run setup-db

# Or manually run SQL
psql -U postgres -d taskmanager -f scripts/setup-db.sql
\`\`\`

### Database Tables

The following tables will be created:
- `users` - User accounts
- `tasks` - Task management
- `reports` - Daily reports
- `attendance` - Attendance records
- `todos` - To-do list items

## Troubleshooting

### Issue: Port 3000 Already in Use

**Solution:**
\`\`\`bash
# Kill process on port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm run dev
\`\`\`

### Issue: Dependencies Installation Fails

**Solution:**
\`\`\`bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
\`\`\`

### Issue: Environment Variables Not Loading

**Solution:**
1. Verify `.env.local` file exists in root directory
2. Check variable names are correct
3. Restart development server
4. Check `.env.local` is not in `.gitignore`

### Issue: Database Connection Error

**Solution:**
1. Verify DATABASE_URL is correct
2. Check database server is running
3. Verify credentials are correct
4. Check firewall settings

### Issue: Authentication Not Working

**Solution:**
1. Clear browser cookies and localStorage
2. Verify JWT_SECRET is set
3. Check API endpoints in browser DevTools
4. Verify Supabase credentials

### Issue: Slow Performance

**Solution:**
1. Check browser DevTools Performance tab
2. Verify database queries are optimized
3. Clear browser cache
4. Check network tab for slow requests
5. Reduce number of items displayed

## Advanced Configuration

### Enable HTTPS in Development

\`\`\`bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

# Run with HTTPS
NODE_OPTIONS='--experimental-modules' npm run dev
\`\`\`

### Configure Custom Domain

1. Update `NEXT_PUBLIC_API_URL` in `.env.local`
2. Configure DNS records
3. Update CORS settings in backend
4. Rebuild and deploy

### Enable Debug Logging

\`\`\`bash
# Set debug environment variable
DEBUG=* npm run dev
\`\`\`

## Performance Tips

1. **Use Production Build** - Always use `npm run build` for production
2. **Enable Caching** - Configure browser caching headers
3. **Optimize Images** - Use Next.js Image component
4. **Database Indexing** - Add indexes to frequently queried columns
5. **Code Splitting** - Use dynamic imports for large components
6. **Monitor Performance** - Use browser DevTools and Lighthouse

## Security Checklist

- [ ] Change default JWT_SECRET
- [ ] Use HTTPS in production
- [ ] Set secure CORS headers
- [ ] Enable database encryption
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Enable CSRF protection
- [ ] Use secure cookies
- [ ] Regular security updates

## Getting Help

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Community Support
- GitHub Issues
- Stack Overflow
- Discord Community
- Email Support

## Next Steps

1. Complete the setup following this guide
2. Create your first task
3. Explore all features
4. Customize the application
5. Deploy to production

Happy task managing! 🚀
