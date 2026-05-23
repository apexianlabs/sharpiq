import { NextResponse } from 'next/server'
export async function POST(request) {
  try {
    const body = await request.json()
    const prompt = `You are an AI assistant for SharpIQ. Generate a concise daily briefing in 2 sentences based on: ${JSON.stringify(body)}. Be specific and actionable.`
    const aiRes = await fetch(`${process.env.AI_API_URL}/api/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.AI_API_KEY}` },
      body: JSON.stringify({ task: 'generate_item', inputs: { prompt } })
    })
    if (!aiRes.ok) throw new Error('AI failed')
    const aiData = await aiRes.json()
    const text = aiData.data?.raw_response || aiData.data?.text || 'Your dashboard is ready.'
    return NextResponse.json({ briefing: typeof text === 'string' ? text : JSON.stringify(text) })
  } catch(e) {
    return NextResponse.json({ briefing: 'Your SharpIQ dashboard is ready.' })
  }
}
