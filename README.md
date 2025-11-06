

# ZenZone - Mental Wellness Platform 🌿

A comprehensive mental wellness platform designed for students and young adults to track mood, journal privately, chat with an AI wellness companion, explore wellness resources, and take self-assessments. Enhanced with advanced AI chatbot featuring dual AI providers, goal tracking, habit formation, meditation tools, and crisis support.

## ✨ Highlights

- **🤖 Dual AI Integration**: Powered by Emergent AI (Llama-3.3-70B-Instruct) with Google Gemini fallback
- **🎯 Three Chat Modes**: Share Thoughts, Find Calm, and Just Chat for personalized support
- **📊 Comprehensive Tracking**: Mood, journal, goals, and habits with visual analytics
- **🧘 Meditation Tools**: Timer-based and 30+ guided meditation sessions
- **🆘 Crisis Support**: Immediate access to crisis resources with smart detection
- **🌓 Dark Mode**: Beautiful UI with light and dark theme support
- **📱 PWA Ready**: Install as a native app with offline capabilities

## 🌟 Core Features

### 🧠 Mental Health Tracking
- **Mood Tracking**: Visual calendar-based mood tracking with detailed analytics and insights
- **Private Journaling**: Rich-text editor with encrypted storage and search functionality
- **Self-Assessment Tools**: Scientifically-backed wellness assessments with progress tracking

### 🎯 Personal Development
- **Goal Setting & Tracking**: SMART goal framework with milestone tracking and progress visualization
- **Habit Tracker**: Build positive habits with streak tracking, customizable reminders, and analytics
- **Meditation & Mindfulness**: Timer-based and guided meditation sessions with progress tracking

### 🤝 Support & Resources
- **AI Wellness Companion**: Empathetic chatbot with three specialized modes for emotional support
  - **Share Thoughts**: Deep, reflective conversations for emotional processing
  - **Find Calm**: Stress relief and grounding techniques
  - **Just Chat**: Casual wellness conversations
- **Wellness Library**: Curated articles and videos for mental health education
- **Crisis Support Resources**: 24/7 crisis hotlines, chat support, and emergency resources with automatic detection

### 📈 Analytics & Management
- **Admin Dashboard**: Content management and user analytics
- **Notification System**: Smart reminders for habits, goals, and wellness check-ins
- **Progressive Web App**: Offline support and mobile-optimized experience

## 🎨 Design & UX

- **Zen/Minimalist Aesthetic**: Calming color palette with soft greens, blues, and gradients
- **Dark Mode Support**: Seamless toggle between light and dark themes
- **Responsive Design**: Mobile-first approach, works perfectly on all devices
- **Accessibility**: WCAG 2.1 AA compliant with focus on usability
- **Micro-interactions**: Smooth animations, hover effects, and transitions
- **PWA Support**: Install as native app with offline capabilities

## 🔒 Security & Privacy

- **JWT Authentication**: Secure HTTP-only cookies with 7-day expiration
- **Data Encryption**: Private journal entries are encrypted at rest
- **Privacy-First**: Clear privacy indicators throughout the app
- **Rate Limiting**: Protection against abuse (100 requests per 15 minutes)
- **Security Headers**: Helmet.js for enhanced security
- **Input Validation**: Express-validator for all API endpoints
- **CORS Protection**: Configured for secure cross-origin requests

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - Modern UI library
- **Vite 4.5.0** - Fast build tool and dev server
- **Tailwind CSS 3.3.5** - Utility-first CSS framework
- **Zustand 4.4.7** - Lightweight state management
- **React Router DOM 6.20.1** - Client-side routing
- **Recharts 2.10.3** - Data visualization
- **React Quill 2.0.0** - Rich text editor
- **React Hot Toast** - Toast notifications
- **PWA** - Service worker for offline support

### Backend
- **Node.js 18+** with ES Modules
- **Express 4.18.2** - Web framework
- **MongoDB** with **Mongoose 8.0.3** - Database and ODM
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **bcryptjs 2.4.3** - Password hashing
- **OpenAI SDK 5.10.2** - Emergent AI integration
- **Google Generative AI 0.24.1** - Gemini API integration
- **Helmet 7.1.0** - Security headers
- **CORS 2.8.5** - Cross-origin resource sharing
- **Express Rate Limit 7.1.5** - Rate limiting
- **Express Validator 7.0.1** - Input validation

### Development Tools
- **ESLint 8.53.0** - JavaScript linting
- **Vitest 0.34.6** - Frontend testing
- **Jest 29.7.0** - Backend testing
- **Supertest 6.3.3** - API testing
- **nodemon 3.0.2** - Auto-restart dev server
- **PostCSS & Autoprefixer** - CSS processing

## 🚀 Getting Started

### Prerequisites

Before running ZenZone, make sure you have:

- **Node.js 18+** and npm installed ([Download here](https://nodejs.org/))
- **MongoDB** installed and running ([Download here](https://www.mongodb.com/try/download/community))
- **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))
- **Emergent AI API Key** (Optional - [Sign up here](https://emergentmethods.ai/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vijaygowda09/zenzone.git
   cd zenzone
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure environment variables**
   
   Create a `server/.env` file:
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=3001
   FRONTEND_URL=http://localhost:5173

   # Database
   MONGODB_URI=mongodb://localhost:27017/zenzone

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d

   # AI APIs (Required)
   GEMINI_API_KEY=your-gemini-api-key-here
   
   # Emergent AI (Optional - falls back to Gemini if not provided)
   EMERGENT_LLM_KEY=your-emergent-api-key-here

   # Security
   BCRYPT_ROUNDS=12

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

5. **Start MongoDB**
   
   **Windows:**
   ```bash
   # Start MongoDB service
   net start MongoDB
   ```
   
   **macOS/Linux:**
   ```bash
   # Start MongoDB
   mongod --dbpath /path/to/your/data/directory
   ```

### Running the Application

You need to run both the backend server and frontend development server:

#### Option 1: Using Two Terminals (Recommended)

**Terminal 1 - Backend Server:**
```bash
cd server
node server.js
```

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
```

#### Option 2: Using Background Processes

**Windows PowerShell:**
```powershell
# Start backend in background
Start-Process powershell -ArgumentList "cd server; node server.js"

# Start frontend
npm run dev
```

**macOS/Linux:**
```bash
# Start backend in background
cd server && node server.js &

# Start frontend
cd .. && npm run dev
```

### Accessing the Application

Once both servers are running:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **MongoDB**: mongodb://localhost:27017

### Verify Installation

Check that both servers are running properly:

1. **Backend health check**: Open http://localhost:3001/api/auth/me
2. **Frontend**: Open http://localhost:5173 and you should see the landing page
3. **AI Integration**: 
   - Backend should show: `✓ Google Gemini client initialized successfully`
   - If Emergent API configured: `✓ Emergent LLM client initialized successfully`

## 🤖 AI Chatbot Features

ZenZone's AI wellness companion is powered by dual AI providers for maximum reliability:

### AI Providers
- **Primary**: Emergent AI (Llama-3.3-70B-Instruct) - Advanced language model optimized for empathetic conversations
- **Fallback**: Google Gemini (gemini-2.0-flash-exp) - Ensures 100% uptime even if primary API is unavailable

### Three Conversation Modes

#### 💭 Share Thoughts
Deep, reflective conversations for emotional processing:
- Empathetic listening and validation
- Help processing complex emotions
- Perspective on challenging situations
- Journaling prompts and reflection questions

#### 🌊 Find Calm
Immediate stress relief and grounding techniques:
- Quick breathing exercises
- Grounding techniques (5-4-3-2-1 method)
- Progressive muscle relaxation
- Mindfulness exercises
- Calming visualization

#### 💬 Just Chat
Casual wellness conversations:
- Light mental health topics
- Wellness tips and advice
- Motivation and encouragement
- Daily check-ins

### Smart Features
- **Crisis Detection**: Automatically detects crisis keywords and provides immediate resources
- **Session Persistence**: Conversations saved and can be resumed later
- **Context Awareness**: Remembers last 10 messages for coherent conversations
- **Disclaimer Modal**: Clear expectations about AI limitations and when to seek professional help

## 📱 Feature Deep Dive

### 🎯 Goal Setting & Tracking
- **SMART Framework**: Set Specific, Measurable, Achievable, Relevant, Time-bound goals
- **Milestones**: Break down goals into actionable steps
- **Progress Visualization**: Visual progress bars and completion percentages
- **Categories**: Organize by health, career, personal growth, relationships, etc.
- **Priority Levels**: High, medium, low priority assignment
- **Status Management**: Active, completed, paused goal states
- **Analytics Dashboard**: Track completion rates and goal statistics

### ✅ Habit Tracker
- **Flexible Tracking**: Daily, weekly, and custom frequency habits
- **Customization**: Choose from 20+ icons and 8 color themes
- **Streak Tracking**: Build momentum with consecutive day tracking
- **Target Setting**: Set custom target counts and units (reps, minutes, cups, etc.)
- **Categories**: Health, productivity, learning, social, self-care, and more
- **Completion Rate**: Visual analytics showing your habit success rate
- **Calendar View**: See your habit completion history at a glance

### 🧘 Meditation & Mindfulness
- **Timer Sessions**: Customizable meditation timers (5-90 minutes)
  - Ambient sounds and bell notifications
  - Pause/resume functionality
  - Session notes and reflections
- **30+ Guided Sessions**: Professional meditation content:
  - **Stress Relief** (5 sessions)
  - **Sleep & Relaxation** (5 sessions)
  - **Anxiety Management** (5 sessions)
  - **Focus & Concentration** (5 sessions)
  - **Gratitude Practice** (5 sessions)
  - **Loving-Kindness** (5 sessions)
- **Breathing Exercises**: 
  - 4-7-8 Breathing (relaxation)
  - Box Breathing (stress management)
  - Coherent Breathing (nervous system regulation)
- **Progress Tracking**: 
  - Total sessions completed
  - Meditation streaks
  - Total time meditated
  - Mood improvements after sessions

### 🆘 Crisis Support Resources
- **24/7 Emergency Hotlines**: Immediate access to crisis support
- **Categorized Resources**: 
  - Suicide Prevention (988, Crisis Text Line)
  - Mental Health Crisis
  - Domestic Violence (NDVH)
  - Sexual Assault (RAINN)
  - LGBTQ+ Support (Trevor Project)
  - Substance Abuse (SAMHSA)
  - Veterans Crisis Line
- **Multiple Contact Methods**: Phone, text, chat, and website
- **International Support**: US-based with plans for global expansion
- **Smart Detection**: Chatbot automatically surfaces resources when crisis language detected
- **Verified & Updated**: Quality-checked resources regularly maintained

### 🔔 Smart Notifications
- **Habit Reminders**: Set custom reminder times for each habit
- **Goal Deadline Alerts**: Notifications for approaching target dates
- **Wellness Check-ins**: Gentle reminders for mood tracking and journaling
- **Achievement Celebrations**: Milestone and streak achievement notifications
- **Meditation Reminders**: Daily mindfulness practice prompts
- **Quiet Hours**: Configure do-not-disturb times
- **Notification Preferences**: Granular control over notification types

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user account
- `POST /api/auth/login` - Login and receive JWT token
- `POST /api/auth/logout` - Logout and clear session
- `GET /api/auth/me` - Get current authenticated user

### Mood Tracking
- `POST /api/mood` - Log mood entry with emoji and notes
- `GET /api/mood` - Get mood entries with date range filtering
- `GET /api/mood/stats` - Get mood statistics and trends
- `DELETE /api/mood/:id` - Delete mood entry

### Journal
- `POST /api/journal` - Create journal entry with rich text
- `GET /api/journal` - Get all journal entries (paginated)
- `GET /api/journal/:id` - Get single journal entry
- `PUT /api/journal/:id` - Update journal entry
- `DELETE /api/journal/:id` - Delete journal entry
- `GET /api/journal/search` - Search journal entries by keyword

### AI Chatbot
- `POST /api/chat` - Send message to AI companion
  - Body: `{ message, mode, session_id }`
  - Returns: `{ response, is_crisis, session_id, timestamp }`
- `GET /api/chat/disclaimer` - Get chatbot disclaimer text
- `GET /api/chat/conversation/:session_id` - Retrieve conversation history
- `DELETE /api/chat/conversation/:session_id` - Delete conversation
- `GET /api/chat/conversations` - Get all user conversations

### Self-Assessment
- `POST /api/assessment` - Submit wellness assessment
- `GET /api/assessment` - Get user's assessment history
- `GET /api/assessment/stats/overview` - Get assessment statistics
- `GET /api/assessment/:id` - Get single assessment result

### Goals
- `GET /api/goals` - Get user's goals (filter by status)
- `POST /api/goals` - Create new goal
- `GET /api/goals/:id` - Get single goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal
- `PATCH /api/goals/:id/milestones/:milestoneId` - Update milestone
- `GET /api/goals/stats` - Get goal statistics and progress

### Habits
- `GET /api/habits` - Get user's habits
- `POST /api/habits` - Create new habit
- `GET /api/habits/:id` - Get single habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit
- `GET /api/habits/entries` - Get habit entries for date range
- `POST /api/habits/entries` - Record habit completion
- `DELETE /api/habits/entries/:id` - Delete habit entry
- `GET /api/habits/stats` - Get habit statistics and streaks

### Meditation
- `GET /api/meditation/guided` - Get all guided sessions (filtered by category)
- `GET /api/meditation/guided/:id` - Get single guided session
- `POST /api/meditation/session` - Start meditation session
- `PATCH /api/meditation/session/:id/complete` - Complete session with notes
- `GET /api/meditation/history` - Get meditation history
- `GET /api/meditation/stats` - Get meditation statistics (streaks, time, count)

### Crisis Support
- `GET /api/crisis` - Get crisis resources (filtered by category)
- `GET /api/crisis/emergency` - Get emergency-only resources
- `GET /api/crisis/:id` - Get single resource details
- `GET /api/crisis/search?q=keyword` - Search resources
- `POST /api/crisis/log` - Log resource usage for analytics

### Wellness Library
- `GET /api/wellness` - Get published wellness resources (paginated)
- `GET /api/wellness/:id` - Get single wellness resource
- `POST /api/wellness` - Create resource (admin only)
- `PUT /api/wellness/:id` - Update resource (admin only)
- `DELETE /api/wellness/:id` - Delete resource (admin only)
- `GET /api/wellness/search?q=keyword` - Search wellness content

### Notifications
- `GET /api/notifications` - Get user notifications (unread/all)
- `PATCH /api/notifications/:id/read` - Mark notification as read
- `DELETE /api/notifications/:id` - Delete notification
- `GET /api/notifications/preferences` - Get notification preferences
- `PUT /api/notifications/preferences` - Update notification settings

## 🏗 Project Structure

```
zenzone/
├── public/                    # Static assets and PWA files
│   ├── manifest.json          # PWA manifest configuration
│   └── sw.js                  # Service worker for offline support
│
├── src/                       # Frontend React application
│   ├── components/
│   │   ├── auth/
│   │   │   ├── ProtectedRoute.jsx    # Protected route wrapper
│   │   │   └── PublicRoute.jsx       # Public route wrapper
│   │   └── layout/
│   │       └── Navbar.jsx            # Main navigation bar
│   │
│   ├── pages/                 # Page components
│   │   ├── LandingPage.jsx           # Public landing page
│   │   ├── LoginPage.jsx             # User login
│   │   ├── RegisterPage.jsx          # User registration
│   │   ├── Dashboard.jsx             # Main dashboard
│   │   ├── MoodTracker.jsx           # Mood tracking interface
│   │   ├── Journal.jsx               # Private journaling
│   │   ├── Chatbot.jsx               # AI wellness companion
│   │   ├── Goals.jsx                 # Goal setting & tracking
│   │   ├── Habits.jsx                # Habit tracker
│   │   ├── Meditation.jsx            # Meditation tools
│   │   ├── SelfAssessment.jsx        # Wellness assessments
│   │   ├── WellnessLibrary.jsx       # Resource library
│   │   ├── WellnessResourceDetail.jsx # Article detail view
│   │   ├── ArticlePage.jsx           # Article reader
│   │   ├── CrisisSupport.jsx         # Crisis resources
│   │   ├── Resources.jsx             # General resources
│   │   └── AdminDashboard.jsx        # Admin panel
│   │
│   ├── stores/
│   │   └── authStore.js              # Zustand auth state
│   │
│   ├── hooks/
│   │   └── useDarkMode.js            # Dark mode hook
│   │
│   ├── data/
│   │   └── guidedSessions.js         # Meditation session data
│   │
│   ├── App.jsx                       # Main app component with routing
│   ├── main.jsx                      # React entry point
│   └── index.css                     # Global styles with Tailwind
│
├── server/                    # Backend Node.js application
│   ├── models/                # Mongoose schemas
│   │   ├── User.js                   # User model
│   │   ├── MoodEntry.js              # Mood tracking
│   │   ├── JournalEntry.js           # Journal entries
│   │   ├── Conversation.js           # Chat sessions
│   │   ├── Assessment.js             # Self-assessments
│   │   ├── Goal.js                   # Goals
│   │   ├── Habit.js                  # Habits
│   │   ├── Meditation.js             # Meditation sessions
│   │   ├── WellnessResource.js       # Wellness content
│   │   ├── CrisisResource.js         # Crisis resources
│   │   └── Notification.js           # Notifications
│   │
│   ├── routes/                # API route handlers
│   │   ├── auth.js                   # Authentication routes
│   │   ├── mood.js                   # Mood tracking API
│   │   ├── journal.js                # Journal API
│   │   ├── chat.js                   # Chatbot API
│   │   ├── assessment.js             # Assessment API
│   │   ├── goals.js                  # Goals API
│   │   ├── habits.js                 # Habits API
│   │   ├── meditation.js             # Meditation API
│   │   ├── wellness.js               # Wellness library API
│   │   ├── crisis.js                 # Crisis resources API
│   │   └── notifications.js          # Notifications API
│   │
│   ├── middleware/
│   │   └── auth.js                   # JWT authentication middleware
│   │
│   ├── .env                          # Environment variables (not in git)
│   ├── server.js                     # Express server setup
│   ├── testAI.js                     # AI API diagnostic tool
│   └── package.json                  # Backend dependencies
│
├── .gitignore                 # Git ignore rules
├── package.json               # Frontend dependencies
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── index.html                 # HTML entry point
└── README.md                  # This file
```

## 🧪 Testing & Development

### Running Tests

**Frontend Tests (Vitest):**
```bash
npm test
```

**Backend Tests (Jest):**
```bash
cd server
npm test
```

**API Testing:**
```bash
cd server
npm test -- --coverage
```

### Development Tools

**Check AI API Connectivity:**
```bash
cd server
node testAI.js
```

**Hot Reload:**
- Frontend: Vite auto-reloads on file changes
- Backend: Use `nodemon` for auto-restart
  ```bash
  cd server
  npm install -g nodemon
  nodemon server.js
  ```

**Linting:**
```bash
npm run lint
```

### Building for Production

**Build Frontend:**
```bash
npm run build
```
This creates optimized production files in the `dist/` folder.

**Preview Production Build:**
```bash
npm run preview
```

## 🚀 Deployment

### Production Environment Variables

Update `server/.env` for production:

```env
# Server Configuration
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-domain.com

# Database (Use MongoDB Atlas for production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zenzone?retryWrites=true&w=majority

# JWT Configuration (Use strong secret)
JWT_SECRET=use-a-very-strong-random-secret-key-here
JWT_EXPIRES_IN=7d

# AI APIs
GEMINI_API_KEY=your-production-gemini-key
EMERGENT_LLM_KEY=your-production-emergent-key

# Security
BCRYPT_ROUNDS=12

# Rate Limiting (Adjust for production traffic)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Recommended Hosting Platforms

#### Frontend
- **Vercel** (Recommended) - Zero-config deployment for Vite
  ```bash
  npm install -g vercel
  vercel
  ```
- **Netlify** - Simple drag-and-drop deployment
- **AWS S3 + CloudFront** - Scalable static hosting
- **GitHub Pages** - Free for public repos

#### Backend
- **Railway** (Recommended) - Easy Node.js deployment
- **Render** - Free tier with auto-deploy from GitHub
- **Heroku** - Traditional PaaS platform
- **AWS EC2** - Full control VPS hosting
- **DigitalOcean App Platform** - Simplified container deployment

#### Database
- **MongoDB Atlas** (Recommended) - Free tier available
  - M0 Sandbox: 512 MB storage, shared CPU
  - Automatic backups and monitoring
  - Global clusters for low latency

### Deployment Steps

#### Deploy to Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**
1. Push code to GitHub
2. Import project to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

**Backend (Railway):**
1. Create new project in Railway
2. Connect GitHub repository
3. Add MongoDB Atlas database
4. Set environment variables in Railway dashboard
5. Deploy with start command: `node server.js`

#### Deploy to Netlify (Frontend) + Render (Backend)

**Frontend (Netlify):**
1. Connect GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

**Backend (Render):**
1. Create new Web Service
2. Connect GitHub repository
3. Environment: Node
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables
7. Create MongoDB instance or use Atlas

### Post-Deployment Checklist

- [ ] Verify CORS settings allow frontend domain
- [ ] Test all API endpoints with production URLs
- [ ] Confirm AI chatbot functionality
- [ ] Check MongoDB connection and queries
- [ ] Test user registration and login
- [ ] Verify PWA installation works
- [ ] Test on mobile devices
- [ ] Monitor error logs and performance
- [ ] Set up automated backups for MongoDB
- [ ] Configure SSL/HTTPS certificates
- [ ] Set up monitoring (e.g., UptimeRobot, New Relic)

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo service mongod start
```

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::3001
```
**Solution:** Kill the process using the port:
```powershell
# Windows PowerShell
netstat -ano | findstr :3001
taskkill /F /PID <PID_NUMBER>
```

**AI Chatbot Not Responding:**
- Check that `GEMINI_API_KEY` is set in `server/.env`
- Run `node server/testAI.js` to verify API connectivity
- Check server logs for API errors
- Verify API key is valid and has quota remaining

**Frontend Can't Connect to Backend:**
- Ensure backend is running on port 3001
- Check `FRONTEND_URL` in `server/.env` matches frontend URL
- Verify CORS settings in `server/server.js`

**JWT Authentication Errors:**
- Clear browser cookies
- Check `JWT_SECRET` is set in `.env`
- Verify token hasn't expired (7-day default)

### Getting Help

If you encounter issues not covered here:

1. **Check the Logs:**
   - Backend: Console output from `node server.js`
   - Frontend: Browser developer console (F12)
   - MongoDB: Check MongoDB logs

2. **Search Existing Issues:**
   - Check [GitHub Issues](https://github.com/Vijaygowda09/zenzone/issues)
   - Search for error messages

3. **Create a New Issue:**
   - Include error messages and logs
   - Describe steps to reproduce
   - Mention your OS and Node.js version

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/zenzone.git
   cd zenzone
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm test
   cd server && npm test
   ```

5. **Commit with descriptive message**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe your changes
   - Link related issues
   - Wait for review

### Code Style Guidelines

- Use **ESLint** for JavaScript linting
- Follow **React** best practices and hooks patterns
- Use **Tailwind CSS** utility classes for styling
- Write **meaningful commit messages** (conventional commits)
- Add **JSDoc comments** for complex functions
- Keep components **small and focused**
- Use **async/await** over promises

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features (check issues for ideas)
- 📚 Documentation improvements
- 🌐 Internationalization (i18n)
- ♿ Accessibility enhancements
- 🎨 UI/UX improvements
- 🧪 Test coverage

## 🔒 Privacy & Ethics

ZenZone is built with mental health ethics and privacy as core principles:

### Privacy Commitments
- **Data Minimization**: Only collect necessary data for functionality
- **Encryption**: Sensitive journal entries encrypted at rest
- **No Third-Party Tracking**: No analytics or advertising trackers
- **User Control**: Export and delete your data anytime
- **Transparency**: Clear privacy policy and data usage explanations

### Ethical AI Guidelines
- **Professional Boundaries**: AI clearly states it's not a replacement for therapy
- **Crisis Detection**: Automatic recognition of crisis language with resource provision
- **No Medical Advice**: AI avoids making medical diagnoses or prescriptions
- **Empathetic Design**: Responses focused on validation and support
- **Human-First**: Always encourages professional help for serious concerns

### Data Retention
- **Active Accounts**: Data retained indefinitely while account is active
- **Inactive Accounts**: 2-year inactivity before deletion notification
- **Deleted Accounts**: Permanent deletion within 30 days
- **Conversation History**: Stored locally in MongoDB, not sent to third parties

## 📞 Support & Resources

### 🆘 Mental Health Crisis Resources

**If you're in immediate danger, call 911 (US) or your local emergency number.**

#### United States
- **988 Suicide & Crisis Lifeline**: Call or text **988** (24/7)
- **Crisis Text Line**: Text **HOME** to **741741** (24/7)
- **SAMHSA National Helpline**: **1-800-662-4357** (24/7, free, confidential)
- **Veterans Crisis Line**: **988** then press **1**, or text **838255**
- **Trevor Project** (LGBTQ+ Youth): **1-866-488-7386** or text **START** to **678678**
- **National Domestic Violence Hotline**: **1-800-799-7233** or text **START** to **88788**
- **RAINN Sexual Assault Hotline**: **1-800-656-4673**

#### International
- **International Association for Suicide Prevention**: [IASP Resources](https://www.iasp.info/resources/Crisis_Centres/)
- **Befrienders Worldwide**: [Find Help](https://www.befrienders.org/)

### 💻 Technical Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Vijaygowda09/zenzone/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/Vijaygowda09/zenzone/discussions)
- **Email**: vijaygowda09@example.com

### 📚 Documentation

- **API Documentation**: See "API Documentation" section above
- **User Guide**: Coming soon
- **FAQ**: Check GitHub Wiki

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Key Points
- ✅ Free to use, modify, and distribute
- ✅ Can be used commercially
- ✅ Must include original copyright notice
- ❌ No warranty or liability

## 🙏 Acknowledgments

### Open Source Libraries
This project wouldn't be possible without these amazing tools:
- **React** - UI library by Meta
- **Vite** - Build tool by Evan You
- **Tailwind CSS** - Utility-first CSS framework
- **MongoDB** - NoSQL database
- **Express** - Web framework for Node.js
- **Google Gemini** - AI language model
- **Emergent AI** - Advanced AI provider

### Inspiration & Guidance
- 💙 Mental health professionals who provided ethical guidance
- 🌟 Open source community for tools and support
- 🎓 Students and young adults who inspired this platform
- 🧠 Mental health advocates working to reduce stigma

### Special Thanks
- Contributors who have helped improve ZenZone
- Beta testers who provided valuable feedback
- Mental health organizations sharing resources

## 📊 Project Stats

- **Tech Stack**: React + Node.js + MongoDB
- **AI Models**: Emergent AI (Llama-3.3) + Google Gemini
- **Lines of Code**: ~15,000+
- **API Endpoints**: 50+
- **Features**: 12+ major features
- **Meditation Sessions**: 30+ guided sessions

---

## ⚠️ Important Disclaimer

**ZenZone is NOT a substitute for professional mental health care.**

This platform is designed to:
- ✅ Support your mental wellness journey
- ✅ Provide tools for self-reflection and tracking
- ✅ Offer coping strategies and mindfulness techniques
- ✅ Connect you with crisis resources when needed

This platform is NOT designed to:
- ❌ Diagnose mental health conditions
- ❌ Provide medical or psychological treatment
- ❌ Replace therapy or counseling
- ❌ Handle emergency mental health crises alone

**If you are experiencing a mental health crisis, suicidal thoughts, or feel you may harm yourself or others, please:**
1. Call **911** or your local emergency number immediately
2. Contact the **988 Suicide & Crisis Lifeline** by calling or texting **988**
3. Go to your nearest emergency room
4. Reach out to a mental health professional

**Your life matters. Help is available. You are not alone.** 💚

---

<div align="center">

**Made with 💚 for mental wellness**

[Report Bug](https://github.com/Vijaygowda09/zenzone/issues) · [Request Feature](https://github.com/Vijaygowda09/zenzone/issues) · [Documentation](https://github.com/Vijaygowda09/zenzone/wiki)

**⭐ Star this repo if ZenZone helped you!**

</div>