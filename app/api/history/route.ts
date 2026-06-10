import { NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL = 'https://nkzgisgrbipbnaogeryw.supabase.co'
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(request: NextRequest) {
    const sessionId = request.nextUrl.searchParams.get('sessionId')

    if (!sessionId) {
        return NextResponse.json([], { status: 200 })
    }

    try {
        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/mentor_messages?session_id=eq.${sessionId}&order=created_at.asc&select=role,content`,
            {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`,
                },
            }
        )

        if (!res.ok) return NextResponse.json([], { status: 200 })

        const rows = await res.json()

        if (!Array.isArray(rows)) return NextResponse.json([], { status: 200 })

        return NextResponse.json(rows)
    } catch {
        return NextResponse.json([], { status: 200 })
    }
}
