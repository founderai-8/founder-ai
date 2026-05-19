'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push('/auth/login')
        return
      }
      setUser(data.user)
      const { data: profile } = await supabase
        .from('founder_profiles')
        .select('user_id')
        .eq('user_id', data.user.id)
        .single()
      if (!profile) {
        router.push('/mentor')
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0a0c1a] text-white">
      <nav className="border-b border-[#1e2340] px-8 py-4 flex justify-between items-center">
        <span className="font-bold text-lg">FounderAI</span>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{user.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Esci
          </button>
        </div>
      </nav>

      <main className="px-8 py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Benvenuto su FounderAI</h1>
        <p className="text-gray-400 mb-12">Il tuo mentor AI è pronto.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0f1229] border border-[#1e2340] rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Sessioni mentor</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-[#0f1229] border border-[#1e2340] rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Decisioni tracciate</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-[#0f1229] border border-[#1e2340] rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Errori evitati</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>

        <div className="mt-8 bg-[#0f1229] border border-[#1e2340] rounded-xl p-6">
          <h2 className="font-semibold mb-4">Parla con il tuo mentor</h2>
          <p className="text-gray-400 text-sm mb-4">Il mentor AI ricorda il tuo contesto e ti guida passo dopo passo.</p>
          <button
            onClick={() => router.push('/mentor')}
            className="bg-[#3B5BDB] text-white rounded-lg px-6 py-3 font-medium hover:bg-[#5C7CFA] transition-colors"
          >
            Inizia sessione →
          </button>
        </div>
      </main>
    </div>
  )
}
