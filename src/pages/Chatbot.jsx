import React, { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import './Chatbot.css'
import API_BASE_URL from '../config/api'

const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'want to die', 'better off dead',
  'suicidal', 'hurt myself', 'self harm', 'no reason to live', 'hopeless'
]

const DISCLAIMER_TEXT = `⚠️ IMPORTANT DISCLAIMER:

I am ZenBot, an AI-powered conversation companion - NOT a licensed mental health professional, therapist, or doctor.

I CANNOT:
❌ Diagnose mental health conditions
❌ Prescribe medication or medical treatments
❌ Replace professional mental health care
❌ Provide emergency crisis intervention

I CAN:
✅ Offer supportive conversation and active listening
✅ Share evidence-based coping strategies and mindfulness techniques
✅ Provide psychoeducation about mental wellness concepts
✅ Suggest lifestyle approaches that may support mental health

🆘 CRISIS RESOURCES:
If you're experiencing a mental health emergency or having thoughts of self-harm:
• National Suicide Prevention Lifeline: 988 (US)
• Crisis Text Line: Text HOME to 741741
• International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/

Please seek help from a qualified mental health professional for diagnosis, treatment, or medication management.`

const Chatbot = () => {
  const [mode, setMode] = useState('share_thoughts')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [sessionId, setSessionId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [disclaimer, setDisclaimer] = useState(DISCLAIMER_TEXT)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Fetch disclaimer from backend
    const fetchDisclaimer = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/chat/disclaimer`)
        if (response.ok) {
          const data = await response.json()
          setDisclaimer(data.disclaimer)
        }
      } catch (error) {
        console.error('Error fetching disclaimer:', error)
        // Use default disclaimer text
      }
    }
    
    fetchDisclaimer()
  }, [])

  const checkCrisisKeywords = (text) => {
    const textLower = text.toLowerCase()
    return CRISIS_KEYWORDS.some(keyword => textLower.includes(keyword))
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setLoading(true)

    try {
      // Check for crisis keywords
      const isCrisis = checkCrisisKeywords(message)
      
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          message: message,
          mode: mode,
          session_id: sessionId
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const assistantMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
        is_crisis: isCrisis || data.is_crisis
      }

      setMessages(prev => [...prev, assistantMessage])
      
      // Set session ID if not already set
      if (!sessionId && data.session_id) {
        setSessionId(data.session_id)
      }
    } catch (error) {
      console.error('Chat error:', error)
      toast.error('Sorry, I\'m having trouble responding right now. Please try again.')
      
      const errorMessage = {
        role: 'assistant',
        content: "I apologize, but I'm experiencing some technical difficulties right now. Please try again in a moment. In the meantime, remember that it's okay to take things one step at a time.",
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleModeChange = (newMode) => {
    setMode(newMode)
  }

  const getModeTitle = () => {
    switch(mode) {
      case 'share_thoughts':
        return 'Share Your Thoughts'
      case 'find_calm':
        return 'Find Calm'
      case 'just_chat':
        return 'Just Chat'
      default:
        return 'ZenBot AI'
    }
  }

  return (
    <div className="zenbot-app">
      {showDisclaimer && (
        <div className="disclaimer-modal">
          <div className="disclaimer-content">
            <h2>Welcome to ZenBot AI</h2>
            <div className="disclaimer-text">
              {disclaimer.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <button 
              className="accept-btn"
              onClick={() => setShowDisclaimer(false)}
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      <div className="zenbot-container">
        <header className="zenbot-header">
          <h1>🧘 ZenBot AI</h1>
          <p className="zenbot-subtitle">{getModeTitle()}</p>
        </header>

        <div className="mode-selector">
          <button
            className={`mode-btn ${mode === 'share_thoughts' ? 'active' : ''}`}
            onClick={() => handleModeChange('share_thoughts')}
          >
            <span>💭 Share Thoughts</span>
          </button>
          <button
            className={`mode-btn ${mode === 'find_calm' ? 'active' : ''}`}
            onClick={() => handleModeChange('find_calm')}
          >
            <span>🧘 Find Calm</span>
          </button>
          <button
            className={`mode-btn ${mode === 'just_chat' ? 'active' : ''}`}
            onClick={() => handleModeChange('just_chat')}
          >
            <span>💬 Just Chat</span>
          </button>
        </div>

        <div className="zenbot-chat-container">
          <div className="zenbot-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <h3>Welcome! How can I support you today?</h3>
                <p>Feel free to share what's on your mind.</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`zenbot-message ${msg.role}`}>
                <div className="zenbot-message-content">
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                {msg.is_crisis && (
                  <div className="crisis-badge">Crisis Response</div>
                )}
              </div>
            ))}
            {loading && (
              <div className="zenbot-message assistant loading">
                <div className="zenbot-message-content">
                  <p>Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="zenbot-input-form">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="zenbot-message-input"
            />
            <button 
              type="submit" 
              disabled={loading || !message.trim()}
              className="zenbot-send-btn"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chatbot