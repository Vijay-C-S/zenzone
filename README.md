

# ZenZone - Mental Wellness Platform

A comprehensive mental wellness platform designed for students and young adults to track mood, journal privately, chat with an AI wellness companion, explore wellness resources, and take self-assessments. Now enhanced with advanced goal tracking, habit formation, meditation tools, and crisis support.

## 🌟 Core Features

### Mental Health Tracking
- **Mood Tracking**: Visual calendar-based mood tracking with detailed analytics and insights
- **Private Journaling**: Rich-text editor with encrypted storage and search functionality
- **Self-Assessment Tools**: Scientifically-backed wellness assessments with progress tracking

### Personal Development
- **Goal Setting & Tracking**: SMART goal framework with milestone tracking and progress visualization
- **Habit Tracker**: Build positive habits with streak tracking, customizable reminders, and analytics
- **Meditation & Mindfulness**: Timer-based and guided meditation sessions with progress tracking

### Support & Resources
- **AI Wellness Companion**: Empathetic chatbot for emotional support and guidance
- **Wellness Library**: Curated articles and videos for mental health education
- **Crisis Support Resources**: 24/7 crisis hotlines, chat support, and emergency resources

### Community & Analytics
- **Admin Dashboard**: Content management and user analytics
- **Notification System**: Smart reminders for habits, goals, and wellness check-ins
- **Progressive Web App**: Offline support and mobile-optimized experience

## 🎨 Design & UX

- **Zen/Minimalist Aesthetic**: Calming color palette with soft greens and blues
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first approach, works on all devices
- **Accessibility**: WCAG 2.1 AA compliant
- **Micro-interactions**: Subtle animations and hover effects
- **PWA Support**: Install as native app with offline capabilities

## 🔒 Security & Privacy

- **JWT Authentication**: Secure HTTP-only cookies
- **Data Encryption**: Private journal entries are encrypted
- **Privacy-First**: Clear privacy indicators throughout the app
- **Rate Limiting**: Protection against abuse
- **GDPR Compliant**: Data export and deletion capabilities

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router** for navigation
- **Recharts** for data visualization
- **React Quill** for rich text editing
- **PWA** with service worker support

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Google Gemini API** for AI chatbot
- **Express Rate Limiting** for security

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or cloud)
- Google Gemini API key (for chatbot)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zenzone
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Environment Setup**
   
   Create `server/.env`:
   ```env
   NODE_ENV=development
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/zenzone
   JWT_SECRET=your-super-secure-jwt-secret-key-here
   GEMINI_API_KEY=your-gemini-api-key-here
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the application**
   ```bash
   # Start backend (from server directory)
   cd server
   npm run dev
   
   # Start frontend (from root directory)
   cd ..
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📱 New Features Overview

### 🎯 Goal Setting & Tracking
- Create SMART goals with deadlines and priorities
- Break down goals into actionable milestones
- Track progress with visual indicators
- Category-based organization (health, career, personal, etc.)
- Goal analytics and completion insights

### ✅ Habit Tracker
- Daily, weekly, and monthly habit tracking
- Customizable habit icons and categories
- Streak tracking with motivational rewards
- Habit completion rate analytics
- Flexible target counts and units

### 🧘 Meditation & Mindfulness
- **Timer Sessions**: Customizable meditation timers (5-90 minutes)
- **Guided Sessions**: Professional meditation content organized by:
  - Stress Relief
  - Sleep & Relaxation
  - Anxiety Management
  - Focus & Concentration
  - Gratitude Practice
  - Loving-Kindness
- **Breathing Exercises**: 4-7-8, Box Breathing, Coherent Breathing
- **Session History**: Track meditation streaks and mood improvements

### 🆘 Crisis Support
- **Emergency Resources**: 24/7 hotlines and crisis support
- **Categorized Support**: Suicide prevention, domestic violence, LGBTQ+ support, etc.
- **Multiple Contact Methods**: Phone, text, chat, and website options
- **Location-Based**: Resources filtered by region/country
- **Verified Resources**: Quality-checked and regularly updated

### 🔔 Smart Notifications
- **Habit Reminders**: Customizable timing for habit completion
- **Goal Deadlines**: Alerts for approaching target dates
- **Wellness Check-ins**: Gentle reminders for mood tracking
- **Achievement Celebrations**: Milestone and streak notifications
- **Quiet Hours**: Respect user's sleep schedule

## 📊 API Endpoints

### Goals
- `GET /api/goals` - Get user's goals
- `POST /api/goals` - Create new goal
- `PUT /api/goals/:id` - Update goal
- `PATCH /api/goals/:id/milestones/:milestoneId` - Update milestone
- `GET /api/goals/stats` - Get goal statistics

### Habits
- `GET /api/habits` - Get user's habits
- `POST /api/habits` - Create new habit
- `GET /api/habits/entries` - Get habit entries for date range
- `POST /api/habits/entries` - Record habit completion
- `GET /api/habits/stats` - Get habit statistics

### Meditation
- `GET /api/meditation/guided` - Get guided sessions
- `POST /api/meditation/session` - Start meditation session
- `PATCH /api/meditation/session/:id/complete` - Complete session
- `GET /api/meditation/history` - Get meditation history
- `GET /api/meditation/stats` - Get meditation statistics

### Crisis Support
- `GET /api/crisis` - Get crisis resources
- `GET /api/crisis/emergency` - Get emergency resources
- `GET /api/crisis/search` - Search resources
- `POST /api/crisis/log` - Log resource usage

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/:id/read` - Mark as read
- `GET /api/notifications/preferences` - Get preferences
- `PUT /api/notifications/preferences` - Update preferences

## 🏗 Project Structure

```
zenzone/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   └── icons/                 # App icons
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   └── layout/            # Layout components
│   ├── pages/
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   ├── Goals.jsx          # Goal tracking
│   │   ├── Habits.jsx         # Habit tracker
│   │   ├── Meditation.jsx     # Meditation tools
│   │   ├── CrisisSupport.jsx  # Crisis resources
│   │   └── ...
│   ├── stores/                # Zustand state stores
│   ├── hooks/                 # Custom React hooks
│   └── data/                  # Static data files
├── server/
│   ├── models/                # Database models
│   │   ├── Goal.js
│   │   ├── Habit.js
│   │   ├── Meditation.js
│   │   ├── CrisisResource.js
│   │   └── Notification.js
│   ├── routes/                # API routes
│   │   ├── goals.js
│   │   ├── habits.js
│   │   ├── meditation.js
│   │   ├── crisis.js
│   │   └── notifications.js
│   └── middleware/            # Express middleware
└── package.json
```

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd zenzone
   npm install
   cd server && npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/zenzone
   JWT_SECRET=your-super-secret-jwt-key
   OPENAI_API_KEY=your-openai-api-key-here  # Optional
   ```

3. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

4. **Start the development servers**
   
   Terminal 1 (Backend):
   ```bash
   cd server
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Chatbot Setup

The AI wellness companion requires an OpenAI API key to function fully. Without it, the chatbot will use fallback responses.

### Getting an OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new secret key
5. Add it to your `.env` file:
   ```env
   OPENAI_API_KEY=sk-your-api-key-here
   ```

### Chatbot Features
- Empathetic responses tailored for mental wellness
- Crisis detection and appropriate resource recommendations
- Fallback responses when API is unavailable
- Conversation context awareness

## Project Structure

```
zenzone/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── stores/            # Zustand state stores
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Utility functions
├── server/                # Backend Node.js application
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API route handlers
│   ├── middleware/        # Express middleware
│   └── utils/             # Server utilities
├── public/                # Static assets
└── docs/                  # Documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Mood Tracking
- `POST /api/mood` - Create mood entry
- `GET /api/mood` - Get mood entries
- `GET /api/mood/stats` - Get mood statistics

### Journaling
- `POST /api/journal` - Create journal entry
- `GET /api/journal` - Get journal entries
- `PUT /api/journal/:id` - Update journal entry
- `DELETE /api/journal/:id` - Delete journal entry

### Chatbot
- `POST /api/chat` - Send message to AI companion

### Assessments
- `POST /api/assessment` - Submit assessment
- `GET /api/assessment` - Get user assessments
- `GET /api/assessment/stats/overview` - Get assessment statistics

### Wellness Resources
- `GET /api/wellness` - Get published resources
- `GET /api/wellness/:id` - Get single resource
- `POST /api/wellness` - Create resource (admin)
- `PUT /api/wellness/:id` - Update resource (admin)

## Development

### Running Tests
```bash
# Frontend tests
npm test

# Backend tests
cd server && npm test
```

### Building for Production
```bash
# Build frontend
npm run build

# Start production server
cd server && npm start
```

### Code Style
- ESLint for JavaScript linting
- Prettier for code formatting
- Conventional commits for git messages

## Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
FRONTEND_URL=https://your-domain.com
OPENAI_API_KEY=your-openai-api-key
```

### Recommended Hosting
- **Frontend**: Netlify, Vercel, or AWS S3 + CloudFront
- **Backend**: Railway, Render, or AWS EC2
- **Database**: MongoDB Atlas

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Privacy & Ethics

ZenZone is designed with privacy and mental health ethics in mind:

- **Data Minimization**: Only collect necessary data
- **Encryption**: Sensitive data is encrypted at rest
- **Transparency**: Clear privacy policies and data usage
- **Professional Boundaries**: AI companion encourages professional help when appropriate
- **Crisis Resources**: Immediate access to crisis helplines and resources

## Support & Resources

### Mental Health Resources
- **Crisis Text Line**: Text HOME to 741741
- **National Suicide Prevention Lifeline**: 988
- **SAMHSA National Helpline**: 1-800-662-4357

### Technical Support
- Create an issue on GitHub
- Check the documentation
- Review the FAQ section

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Mental health professionals who provided guidance on best practices
- The open-source community for the amazing tools and libraries
- Students and young adults who inspired this platform

---

**Disclaimer**: ZenZone is not a substitute for professional mental health care. If you're experiencing a mental health crisis, please seek immediate professional help or contact emergency services.