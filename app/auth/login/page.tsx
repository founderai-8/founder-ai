'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async () => {
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Controlla la tua email per confermare!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else window.location.href = '/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0c1a] flex items-center justify-center">
      <div className="bg-[#0f1229] border border-[#1e2340] rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-white text-2xl font-bold mb-2">
          {isSignUp ? 'Crea account' : 'Accedi'}
        </h1>
        <p className="text-gray-400 text-sm mb-6">FounderAI</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-[#1a1f3a] text-white border border-[#1e2340] rounded-lg px-4 py-3 mb-3 outline-none focus:border-[#3B5BDB]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-[#1a1f3a] text-white border border-[#1e2340] rounded-lg px-4 py-3 mb-4 outline-none focus:border-[#3B5BDB]"
        />

        <button
          onClick={handleAuth}
          className="w-full bg-[#3B5BDB] text-white rounded-lg py-3 font-medium hover:bg-[#5C7CFA] transition-colors"
        >
          {isSignUp ? 'Registrati' : 'Entra'}
        </button>

        {message && <p className="text-sm text-center mt-4 text-gray-400">{message}</p>}

        <p className="text-center text-sm text-gray-500 mt-4">
          {isSignUp ? 'Hai già un account?' : 'Non hai un account?'}{' '}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-[#5C7CFA] hover:underline">
            {isSignUp ? 'Accedi' : 'Registrati'}
          </button>
        </p>
      </div>
    </div>
  )
}