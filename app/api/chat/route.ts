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

- Hai memoria completa di tutte le conversazioni precedenti con questo founder. Usa sempre il contesto storico: se ha già descritto la sua startup, i suoi problemi o i suoi obiettivi, non chiederlo di nuovo — riferisciti a ciò che sai.

- Mai liste generiche. Mai consigli ovvi.

- Fai sempre UNA domanda strategica prima di dare consigli.

- Intervieni proattivamente se vedi un errore in arrivo.

- Parla come un amico esperto, non come un consulente.

- Rispondi sempre in italiano a meno che l'utente non scriva in inglese.

- Mai più di 150 parole per risposta. Sii denso, non lungo.`

async function loadHistory(sessionId: string): Promise<Array<{ role: 'user' | 'assistant'; content: string }>> {
    try {
        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/mentor_messages?session_id=eq.${sessionId}&order=created_at.asc&select=role,content`,
            { headers: sbHeaders }
        )
        if (!res.ok) return []
        const rows = await res.json()
        return rows
            .filter((r: { role: string; content: string }) =>
                (r.role === 'user' || r.role === 'assistant') &&
                typeof r.content === 'string' &&
                r.content.trim() !== ''
            )
            .map((r: { role: string; content: string }) => ({ role: r.role as 'user' | 'assistant', content: r.content }))
    } catch {
        return []
    }
}

async function saveMessage(sessionId: string, role: string, content: string) {
    try {
        await fetch(`${SUPABASE_URL}/rest/v1/mentor_messages`, {
            method: 'POST',
            headers: sbHeaders,
            body: JSON.stringify({ session_id: sessionId, role, content }),
        })
    } catch {}
}

async function loadFounderProfile(userId: string): Promise<string> {
    try {
        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/founder_profiles?user_id=eq.${userId}&limit=1`,
            { headers: sbHeaders }
        )
        if (!res.ok) return ''
        const rows = await res.json()
        if (!Array.isArray(rows) || rows.length === 0) return ''
        const p = rows[0]
        const lines: string[] = []
        if (p.what_building)    lines.push(`Building: ${p.what_building}`)
        if (p.customer)         lines.push(`Customer: ${p.customer}`)
        if (p.stage)            lines.push(`Stage: ${p.stage}`)
        if (p.problem)          lines.push(`Problem: ${p.problem}`)
        if (p.country)          lines.push(`Country: ${p.country}`)
        if (p.target_market)    lines.push(`Target market: ${p.target_market}`)
        if (p.sector)           lines.push(`Sector: ${p.sector}`)
        if (p.business_model)   lines.push(`Business model: ${p.business_model}`)
        if (p.product_type)     lines.push(`Product type: ${p.product_type}`)
        if (p.budget)           lines.push(`Budget: ${p.budget}`)
        if (p.time_available)   lines.push(`Time available: ${p.time_available}`)
        if (p.team_size)        lines.push(`Team: ${p.team_size}`)
        if (p.audience_size)    lines.push(`Audience: ${p.audience_size}`)
        if (p.investor_access)  lines.push(`Investor access: ${p.investor_access}`)
        if (p.background)       lines.push(`Background: ${p.background}`)
        if (p.first_business)   lines.push(`First business: ${p.first_business}`)
        if (p.failed_before)    lines.push(`Failed before: ${p.failed_before}`)
        if (p.biggest_mistake)  lines.push(`Biggest mistake: ${p.biggest_mistake}`)
        if (p.end_goal)         lines.push(`End goal: ${p.end_goal}`)
        if (p.biggest_fear)     lines.push(`Biggest fear: ${p.biggest_fear}`)
        if (p.revenue_timeline) lines.push(`Revenue timeline: ${p.revenue_timeline}`)
        return lines.length ? '\n\nFOUNDER PROFILE:\n' + lines.join('\n') : ''
    } catch {
        return ''
    }
}

export async function POST(request: NextRequest) {
    try {
        const { message, sessionId, userId } = await request.json()

        const [history, founderProfile] = await Promise.all([
            sessionId ? loadHistory(sessionId) : Promise.resolve([]),
            userId ? loadFounderProfile(userId) : Promise.resolve(''),
        ])
        const contextMessages: Array<{ role: 'user' | 'assistant'; content: string }> = [
            ...history,
            { role: 'user', content: message },
        ]

        const response = await client.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1024,
            system: MENTOR_SYSTEM_PROMPT + founderProfile,
            messages: contextMessages,
        })

        const reply = response.content[0].type === 'text' ? response.content[0].text : ''

        if (sessionId) {
            await saveMessage(sessionId, 'user', message)
            await saveMessage(sessionId, 'assistant', reply)
        }

        return NextResponse.json({ message: reply })
    } catch (error) {
        console.error('[chat] errore:', error)
        return NextResponse.json({ error: 'Errore del mentor' }, { status: 500 })
    }
}
