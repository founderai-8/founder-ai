import { NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(req: NextRequest) {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Prefer: 'return=minimal',
        },
        body: JSON.stringify({ email }),
    })

    if (res.ok || res.status === 201) {
        return NextResponse.json({ ok: true })
    }

    const err = await res.json()
    return NextResponse.json({ error: err }, { status: res.status })
}
