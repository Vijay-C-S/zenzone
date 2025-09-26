import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Shield, Users, Sparkles, ArrowRight, Leaf, Moon, Sun } from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: Heart,
      title: 'Mood Tracking',
      description: 'Track your emotional journey with our intuitive mood calendar and visualize patterns over time.'
    },
    {
      icon: Shield,
      title: 'Private Journaling',
      description: 'Express yourself freely in a secure, encrypted space designed for your thoughts and reflections.'
    },
    {
      icon: Users,
      title: 'AI Wellness Companion',
      description: 'Chat with our empathetic AI companion for support, guidance, and mindfulness exercises.'
    },
    {
      icon: Sparkles,
      title: 'Self-Assessment Tools',
      description: 'Understand yourself better with scientifically-backed assessments and personalized insights.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zen-50 via-calm-50 to-zen-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%2322c55e&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Floating elements */}
            <div className="absolute top-20 left-10 animate-pulse-gentle">
              <Leaf className="h-8 w-8 text-zen-400 opacity-60" />
            </div>
            <div className="absolute top-32 right-16 animate-pulse-gentle" style={{ animationDelay: '1s' }}>
              <Moon className="h-6 w-6 text-calm-400 opacity-60" />
            </div>
            <div className="absolute bottom-32 left-20 animate-pulse-gentle" style={{ animationDelay: '2s' }}>
              <Sun className="h-7 w-7 text-zen-500 opacity-60" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
              A non-judgmental space for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zen-600 to-calm-600">
                emotional self-care
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
              ZenZone provides a safe, private environment for students and young adults to track their mental wellness, 
              journal their thoughts, and access supportive resources on their journey to emotional well-being.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-3 flex items-center space-x-2 group"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/login"
                className="btn-secondary text-lg px-8 py-3"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your wellness toolkit
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover tools designed to support your mental health journey with privacy, empathy, and scientific backing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-zen-100 dark:bg-zen-900 rounded-full mb-4 group-hover:bg-zen-200 dark:group-hover:bg-zen-800 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-zen-600 dark:text-zen-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-zen-600 to-calm-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to prioritize your mental wellness?
          </h2>
          <p className="text-xl text-zen-100 mb-8">
            Join thousands of students and young adults who have found peace and clarity with ZenZone.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 bg-white text-zen-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-zen-400" />
              <span className="text-lg font-semibold">ZenZone</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 ZenZone. A safe space for mental wellness.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage