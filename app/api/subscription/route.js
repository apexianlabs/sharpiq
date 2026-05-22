import { NextResponse } from 'next/server'
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get('user_id')
    if (!user_id) return NextResponse.json({ plan: 'free' })
    const res = await fetch(`${process.env.DB_API_URL}/db/subscriptions/${user_id}/sharpiq`, {
      headers: { 'Authorization': `Bearer ${process.env.{{DB_KEY}}}` }
    })
    if (!res.ok) return NextResponse.json({ plan: 'free' })
    const data = await res.json()
    return NextResponse.json({ plan: data?.data?.plan || 'free', status: data?.data?.status })
  } catch(err) { return NextResponse.json({ plan: 'free' }) }
}
