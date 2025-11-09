import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  Moon, Sun, Menu, X, Heart, LogOut, User,
  LayoutDashboard, Smile, BookOpen, Target, CheckSquare,
  Brain, MessageCircle, Library, ClipboardList, AlertCircle
} from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useDarkMode } from '../../hooks/useDarkMode'

const Navbar = () => {
  const { user, logout } = useAuthStore()
  const { darkMode, toggleDarkMode } = useDarkMode()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  const navLinks = user ? {
    track: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/mood', label: 'Mood', icon: Smile },
      { path: '/journal', label: 'Journal', icon: BookOpen },
    ],
    improve: [
      { path: '/goals', label: 'Goals', icon: Target },
      { path: '/habits', label: 'Habits', icon: CheckSquare },
      { path: '/meditation', label: 'Meditation', icon: Brain },
    ],
    learn: [
      { path: '/chat', label: 'AI Chat', icon: MessageCircle },
      { path: '/wellness', label: 'Wellness', icon: Library },
      { path: '/assessment', label: 'Assessment', icon: ClipboardList },
    ],
    support: [
      { path: '/crisis', label: 'Crisis Support', icon: AlertCircle },
    ]
  } : {
    public: [
      { path: '/crisis', label: 'Crisis Support', icon: AlertCircle }
    ]
  }

  // Flatten for desktop navigation
  const flatNavLinks = user ? [
    ...navLinks.track,
    ...navLinks.improve,
    ...navLinks.learn,
    ...navLinks.support
  ] : navLinks.public

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-zen-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ZenZone
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {flatNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-zen-600 dark:text-zen-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-zen-600 dark:hover:text-zen-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-zen-600 dark:hover:text-zen-400 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-1">
              {user ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center space-x-3 px-3 py-3 bg-gray-50 dark:bg-gray-900 rounded-lg mb-3">
                    <div className="w-10 h-10 rounded-full bg-zen-100 dark:bg-zen-900 flex items-center justify-center">
                      <User className="h-5 w-5 text-zen-600 dark:text-zen-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>

                  {/* Track Section */}
                  <div className="mb-2">
                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Track Progress
                    </p>
                    {navLinks.track.map((link) => {
                      const Icon = link.icon
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                            isActive(link.path)
                              ? 'bg-zen-50 dark:bg-zen-900/30 text-zen-600 dark:text-zen-400'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{link.label}</span>
                        </Link>
                      )
                    })}
                  </div>

                  {/* Improve Section */}
                  <div className="mb-2">
                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Improve Wellbeing
                    </p>
                    {navLinks.improve.map((link) => {
                      const Icon = link.icon
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                            isActive(link.path)
                              ? 'bg-zen-50 dark:bg-zen-900/30 text-zen-600 dark:text-zen-400'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{link.label}</span>
                        </Link>
                      )
                    })}
                  </div>

                  {/* Learn Section */}
                  <div className="mb-2">
                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Learn & Connect
                    </p>
                    {navLinks.learn.map((link) => {
                      const Icon = link.icon
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                            isActive(link.path)
                              ? 'bg-zen-50 dark:bg-zen-900/30 text-zen-600 dark:text-zen-400'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{link.label}</span>
                        </Link>
                      )
                    })}
                  </div>

                  {/* Support Section */}
                  <div className="mb-2">
                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Get Support
                    </p>
                    {navLinks.support.map((link) => {
                      const Icon = link.icon
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                            isActive(link.path)
                              ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{link.label}</span>
                        </Link>
                      )
                    })}
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center space-x-3 px-3 py-2.5 mt-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  {navLinks.public.map((link) => {
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{link.label}</span>
                      </Link>
                    )
                  })}
                  <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">Login</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 mx-3 px-4 py-2.5 bg-zen-600 hover:bg-zen-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <span className="text-sm font-medium">Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar