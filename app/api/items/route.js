import { NextResponse } from 'next/server'
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get('user_id')
    if (!user_id) return NextResponse.json({ items: [] })
    const res = await fetch(`${process.env.DB_API_URL}/db/sharpiq/{{ITEM_TABLE}}?user_id=${user_id}&order_by=created_at&ascending=false`, {
      headers: { 'Authorization': `Bearer ${process.env.{{DB_KEY}}}` }
    })
    if (!res.ok) return NextResponse.json({ items: [] })
    const data = await res.json()
    return NextResponse.json({ items: data.data || [] })
  } catch(err) { return NextResponse.json({ items: [] }) }
}
