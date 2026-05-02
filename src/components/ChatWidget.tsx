import React, { useRef, useState } from 'react'
import { X, Send, Mic, Headphones, MessageCircle } from 'lucide-react'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'bot', timestamp: Date}>>([])
  const [isRecording, setIsRecording] = useState(false)
  const nextMessageId = useRef(1)

  const handleSendMessage = () => {
    const trimmedMessage = message.trim()
    if (trimmedMessage) {
      const userMessageId = nextMessageId.current++
      const newMessage = {
        id: userMessageId,
        text: trimmedMessage,
        sender: 'user' as const,
        timestamp: new Date()
      }
      setMessages([...messages, newMessage])
      setMessage('')
      
      // Simulate bot response
      setTimeout(() => {
        const botMessageId = nextMessageId.current++
        const botResponse = {
          id: botMessageId,
          text: "Thanks for your message! Our team will get back to you shortly. How else can we help you today?",
          sender: 'bot' as const,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botResponse])
      }, 1000)
    }
  }

  const handleVoiceToggle = () => {
    setIsRecording((prev) => !prev)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-footer text-white px-4 py-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 flex items-center space-x-2 z-50"
        >
          <Headphones className="w-5 h-5" />
          <span className="font-medium">Talk with Us</span>
        </button>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl border border-border z-50 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border bg-primary text-white rounded-t-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Talk with Us</h3>
                <p className="text-sm text-white/80">Choose voice or text</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-textSecondary py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 text-textSecondary/50" />
                <p className="text-sm">Start a conversation with our team!</p>
                <p className="text-xs mt-1">We're here to help 24/7</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-section text-textPrimary'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="w-full border border-border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              
              {/* Voice Button */}
              <button
                onClick={handleVoiceToggle}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-primary text-white hover:bg-teal-600'
                }`}
                title={isRecording ? 'Stop Recording' : 'Start Voice Recording'}
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-primary text-white p-2 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Voice Recording Indicator */}
            {isRecording && (
              <div className="mt-2 flex items-center space-x-2 text-red-600 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Recording... Click mic to stop</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ChatWidget