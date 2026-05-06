'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

const getSessionId = () => {
    let id = localStorage.getItem('founderai_session')
    if (!id) {
          id = crypto.randomUUID()
          localStorage.setItem('founderai_session', id)
    }
    return id
}

export default function MentorPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [sessionId, setSessionId] = useState<string | null>(null)
    const [memoryCount, setMemoryCount] = useState(0)
    const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
        const id = getSessionId()
        setSessionId(id)
        fetch(`https://nkzgisgrbipbnaogeryw.supabase.co/rest/v1/conversations?session_id=eq.${id}&order=created_at.asc&select=role,content`, {
                headers: {
                          apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5remdpc2dyYmlwYm5hb2dlcnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1ODAwMzcsImV4cCI6MjA5MzE1NjAzN30.guaR3oAAWfEnYz6SIcDyUodW_hAkmv7_g-zqwpDCRGk',
                          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5remdpc2dyYmlwYm5hb2dlcnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1ODAwMzcsImV4cCI6MjA5MzE1NjAzN30.guaR3oAAWfEnYz6SIcDyUodW_hAkmv7_g-zqwpDCRGk'
                }
        })
          .then(r => r.json())
          .then(rows => {
                    if (rows.length > 0) {
                                setMessages(rows.map((r: { role: 'user' | 'assistant'; content: string }) => ({ role: r.role, content: r.content })))
                                setMemoryCount(rows.length)
                    }
          })
          .catch(() => {})
  }, [])

  useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
        if (!input.trim() || loading) return

        const userMessage: Message = { role: 'user', content: input }
        const updatedMessages = [...messages, userMessage]
        setMessages(updatedMessages)
        setInput('')
        setLoading(true)

        try {
                const response = await fetch('/api/chat', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ messages: updatedMessages, sessionId })
                })

          const data = await response.json()
                setMessages([...updatedMessages, { role: 'assistant', content: data.message }])
        } catch {
                setMessages([...updatedMessages, { role: 'assistant', content: 'Errore di connessione.' }])
        } finally {
                setLoading(false)
        }
  }

  return (
        <div className="min-h-screen bg-[#0a0c1a] text-white flex flex-col">
              <nav className="border-b border-[#1e2340] px-8 py-4 flex justify-between items-center">
                      <a href="/dashboard" className="text-gray-400 hover:text-white text-sm">← Dashboard</a>a>
                      <span className="font-bold">Mentor AI</span>span>
                      <div className="w-16" />
              </nav>nav>
        
          {memoryCount > 0 && (
                  <div className="text-center py-2 text-xs text-[#5C7CFA] border-b border-[#1e2340]">
                            ↑ memoria attiva — {memoryCount} messaggi dalle sessioni precedenti
                  </div>div>
              )}
        
              <div className="flex-1 overflow-y-auto px-8 py-6 max-w-3xl mx-auto w-full">
                {messages.length === 0 && (
                    <div className="text-center mt-24">
                                <p className="text-2xl font-bold mb-2">Ciao, sono il tuo Mentor.</p>p>
                                <p className="text-gray-400">Dimmi su cosa stai lavorando.</p>p>
                    </div>div>
                      )}
              
                {messages.map((msg, i) => (
                    <div key={i} className={`mb-6 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xl px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                                    msg.role === 'user'
                                      ? 'bg-[#3B5BDB] text-white'
                                      : 'bg-[#0f1229] border border-[#1e2340] text-gray-200'
                    }`}>
                                  {msg.content}
                                </div>div>
                    </div>div>
                  ))}
              
                {loading && (
                    <div className="flex justify-start mb-6">
                                <div className="bg-[#0f1229] border border-[#1e2340] rounded-2xl px-5 py-3 text-gray-400 text-sm">
                                              Il mentor sta pensando...
                                </div>div>
                    </div>div>
                      )}
              
                      <div ref={bottomRef} />
              </div>div>
        
              <div className="border-t border-[#1e2340] px-8 py-4 max-w-3xl mx-auto w-full">
                      <div className="flex gap-3">
                                <input
                                              type="text"
                                              value={input}
                                              onChange={e => setInput(e.target.value)}
                                              onKeyDown={e => e.key === 'Enter' && sendMessage()}
                                              placeholder="Scrivi al tuo mentor..."
                                              className="flex-1 bg-[#0f1229] border border-[#1e2340] text-white rounded-xl px-4 py-3 outline-none focus:border-[#3B5BDB] text-sm"
                                            />
                                <button
                                              onClick={sendMessage}
                                              disabled={loading || !input.trim()}
                                              className="bg-[#3B5BDB] text-white rounded-xl px-6 py-3 font-medium hover:bg-[#5C7CFA] transition-colors disabled:opacity-40"
                                            >
                                            →
                                </button>button>
                      </div>div>
              </div>div>
        </div>div>
      )
}</div>
