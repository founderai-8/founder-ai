import Anthropic from '@anthropic-ai/sdk'

import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!
})

const SUPABASE_URL = 'https://nkzgisgrbipbnaogeryw.supabase.co'

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5remdpc2dyYmlwYm5hb2dlcnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1ODAwMzcsImV4cCI6MjA5MzE1NjAzN30.guaR3oAAWfEnYz6SIcDyUodW_hAkmv7_g-zqwpDCRGk'

const sbHeaders = {
    'Content-Type': 'application/json',
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
}

const MENTOR_SYSTEM_PROMPT = `Sei il mentor AI di FounderAI. Il tuo nome è Mentor.

Sei un advisor brutalmente onesto per founder alle prime armi. Il tuo modello è un ibrido tra Paul Graham e Peter Thiel — diretto, concreto, senza filtri.

REGOLE FONDAMENTALI:

- Mai liste generiche. Mai consigli ovvi.

- Fai sempre UNA domanda strategica prima di dare consigli.

- Intervieni proattivamente se vedi un errore in arrivo.

- Parla come un amico esperto, non come un consulente.

- Rispondi sempre in italiano a meno che l'utente non scriva in inglese.

- Mai più di 150 parole per risposta. Sii denso, non lungo.`

async function loadHistory(sessionId: string) {
    try {
          const res = await fetch(
                  `${SUPABASE_URL}/rest/v1/conversations?session_id=eq.${sessionId}&order=created_at.asc&select=role,content`,
            { headers: sbHeaders }
                )

      if (!res.ok) return []

            const rows = await res.json()

      return rows.map((r: { role: string; content: string }) => ({ role: r.role, content: r.content }))

    } catch {

      return []

    }

}

async function saveMessage(sessionId: string, role: string, content: string) {
    try {
          await fetch(`${SUPABASE_URL}/rest/v1/conversations`, {
                  method: 'POST',
                  headers: sbHeaders,
                  body: JSON.stringify({ session_id: sessionId, role, content }),
          })
    } catch {}
}

export async function POST(request: NextRequest) {
    try {
          const { messages, sessionId } = await request.json()

      const lastUserMessage = messages[messages.length - 1]

      if (sessionId && lastUserMessage?.role === 'user') {
              await saveMessage(sessionId, 'user', lastUserMessage.content)
      }

      const history = sessionId ? await loadHistory(sessionId) : messages

      const response = await client.messages.create({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 1024,
              system: MENTOR_SYSTEM_PROMPT,
              messages: history.length > 0 ? history : messages
      })

      const reply = response.content[0].type === 'text' ? response.content[0].text : ''

      if (sessionId) {
              await saveMessage(sessionId, 'assistant', reply)
      }

      return NextResponse.json({ message: reply })

    } catch (error) {
          return NextResponse.json({ error: 'Errore del mentor' }, { status: 500 })
    }
}
