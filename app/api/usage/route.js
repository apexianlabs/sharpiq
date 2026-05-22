import { NextResponse } from 'next/server'
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get('user_id')
    if (!user_id) return NextResponse.json({ plan: 'free', used: 0, limit: 3, remaining: 3 })
    const res = await fetch(
      `${process.env.DB_API_URL}/usage/check?user_id=${user_id}&product=sharpiq`,
      { headers: { 'Authorization': `Bearer ${process.env.DB_API_KEY_SHARPIQ}` } }
    )
    const data = await res.json()
    return NextResponse.json(data)
  } catch(e) { return NextResponse.json({ plan: 'free', used: 0, limit: 3, remaining: 3 }) }
}
