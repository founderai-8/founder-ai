'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async () => {
        setLoading(true)
        setError('')
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) setError(error.message)
        else window.location.href = '/dashboard'
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#0a0c1a] text-white flex items-center justify-center">
            <div className="w-full max-w-sm px-8">
                <h1 className="text-2xl font-bold mb-2 text-center">FounderAI</h1>
                <p className="text-gray-400 text-sm text-center mb-8">Accedi al tuo mentor AI</p>

                <div className="flex flex-col gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        placeholder="Email"
                        className="bg-[#0f1229] border border-[#1e2340] text-white rounded-xl px-4 py-3 outline-none focus:border-[#3B5BDB] text-sm"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        placeholder="Password"
                        className="bg-[#0f1229] border border-[#1e2340] text-white rounded-xl px-4 py-3 outline-none focus:border-[#3B5BDB] text-sm"
                    />
                    {error && <p className="text-red-400 text-xs">{error}</p>}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-[#3B5BDB] text-white rounded-xl py-3 font-medium hover:bg-[#5C7CFA] transition-colors disabled:opacity-40"
                    >
                        {loading ? 'Accesso...' : 'Accedi →'}
                    </button>
                </div>
            </div>
        </div>
    )
}
