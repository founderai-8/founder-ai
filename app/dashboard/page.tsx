'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

interface Chat {
  id: string
  title: string
  created_at: string
}

interface Profile {
  stage?: string
  what_building?: string
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [recentChats, setRecentChats] = useState<Chat[]>([])
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push('/auth/login')
        return
      }
      const u = data.user
      setUser(u)

      // Carica profilo e ultime chat in parallelo
      const [profileRes, chatsRes] = await Promise.all([
        supabase.from('founder_profiles').select('stage, what_building').eq('user_id', u.id).single(),
        fetch(`/api/chats?userId=${u.id}`)
      ])

      if (!profileRes.data) {
        router.push('/onboarding')
        return
      }
      setProfile(profileRes.data)

      if (chatsRes.ok) {
        const chats: Chat[] = await chatsRes.json()
        if (Array.isArray(chats)) setRecentChats(chats.slice(0, 3))
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const displayName = user?.email?.split('@')[0] ?? ''

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0a0c1a] text-white">
      <nav className="border-b border-[#1e2340] px-8 py-4 flex justify-between items-center">
        <Image
          src="/Founder_AI_logo_transparent.png"
          alt="FounderAI"
          height={36}
          width={120}
          className="object-contain"
          priority
        />
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

      <main className="px-6 py-10 max-w-3xl mx-auto w-full">

        {/* Bentornato */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-1">Bentornato, {displayName}.</h1>
          {profile?.stage && (
            <p className="text-gray-400 text-sm">
              Stai lavorando su: <span className="text-gray-300">{profile.what_building || profile.stage}</span>
            </p>
          )}
        </div>

        {/* Nuova conversazione — CTA principale */}
        <div className="bg-[#0f1229] border border-[#3B5BDB] rounded-2xl p-6 mb-8">
          <p className="text-sm text-[#7F77DD] font-medium mb-1">Il tuo mentor è pronto</p>
          <h2 className="text-xl font-bold