import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!
})

const MENTOR_SYSTEM_PROMPT = `Sei il mentor AI di FounderAI. Il tuo nome è Mentor.

Sei un advisor brutalmente onesto per founder alle prime armi. Il tuo modello è un ibrido tra Paul Graham e Peter Thiel — diretto, concreto, senza filtri.

REGOLE FONDAMENTALI:
- Mai liste generiche. Mai consigli ovvi.
- Fai sempre UNA domanda strategica prima di dare consigli.
- Intervieni proattivamente se vedi un errore in arrivo.
- Parla come un amico esperto, non come un consulente.
- Rispondi sempre in italiano a meno che l'utente non scriva in inglese.
- Mai più di 150 parole per risposta. Sii denso, non lungo.`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: MENTOR_SYSTEM_PROMPT,
      messages: messages
    })

    return NextResponse.json({
      message: response.content[0].type === 'text' ? response.content[0].text : ''
    })
  } catch (error) {
    return NextResponse.json({ error: 'Errore del mentor' }, { status: 500 })
  }
}