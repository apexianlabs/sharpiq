import { NextResponse } from 'next/server'

function calcPotentialReturn(stake, odds) {
  const s = parseFloat(stake) || 100
  const o = parseInt(odds) || -110
  if (o > 0) return ((s * o) / 100).toFixed(2)
  return ((s / Math.abs(o)) * 100).toFixed(2)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { sport, betType, team, opponent, line, odds, stake, book, notes, userId } = body

    if (!team || !line) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check usage limit
    if (userId) {
      const usageRes = await fetch(
        `${process.env.DB_API_URL}/usage/check?user_id=${userId}&product=sharpiq`,
        { headers: { 'Authorization': `Bearer ${process.env.DB_API_KEY_SHARPIQ}` } }
      )
      const usage = await usageRes.json()
      if (!usage.allowed) {
        return NextResponse.json({ error: 'limit_reached' }, { status: 403 })
      }
    }

    const potentialReturn = calcPotentialReturn(stake, odds)

    const prompt = `You are a sharp sports bettor and betting analyst. Analyse this bet and respond ONLY with valid JSON.

Bet Details:
- Sport: ${sport.toUpperCase()}
- Bet Type: ${betType}
- Selection: ${team}${opponent ? ` vs ${opponent}` : ''}
- Line: ${line}
- Odds: ${odds} (American)
- Stake: $${stake}
- Sportsbook: ${book}
${notes ? `- Notes/Context: ${notes}` : ''}

Analyse this bet based on general knowledge of the sport, typical line value, and betting principles.

Respond ONLY with this JSON:
{
  "recommendation": "Bet|Strong Bet|Pass|Lean Bet",
  "confidence": <number 0-100>,
  "analysis": "2-3 sentence plain English analysis of the bet value and reasoning",
  "keyFactors": ["factor 1", "factor 2", "factor 3", "factor 4"],
  "risks": ["risk 1", "risk 2", "risk 3"],
  "edgeRating": "Good Value|Fair Value|Poor Value",
  "alternativeLine": "suggestion for a better line or alternative bet if applicable, or null"
}

Guidelines:
- Be honest — don't always recommend betting, Pass when the value isn't there
- For -110 juice on spreads/totals, confidence needs to be 55%+ to recommend
- Factor in the odds when giving recommendations — +300 needs less confidence than -300
- Keep analysis concise and specific to the sport and bet type`

    const aiRes = await fetch(`${process.env.AI_API_URL}/api/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.AI_API_KEY}` },
      body: JSON.stringify({ task: 'analyse_sports_bet', inputs: { prompt } })
    })

    if (!aiRes.ok) throw new Error('AI analysis failed')

    const aiData = await aiRes.json()
    let aiResult = aiData.data || aiData.result || {}

    try {
      if (typeof aiResult === 'string') {
        const clean = aiResult.replace(/```json|```/g, '').trim()
        aiResult = JSON.parse(clean.match(/\{[\s\S]*\}/)?.[0] || clean)
      } else if (aiResult.raw_response) {
        const clean = aiResult.raw_response.replace(/```json|```/g, '').trim()
        aiResult = JSON.parse(clean.match(/\{[\s\S]*\}/)?.[0] || clean)
      }
    } catch(e) {}

    // Save to DB
    if (userId) {
      await fetch(`${process.env.DB_API_URL}/db/sharpiq/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.DB_API_KEY_SHARPIQ}` },
        body: JSON.stringify({
          user_id: userId,
          title: `${team} ${betType} ${line} (${sport.toUpperCase()})`,
          result_data: { ...aiResult, sport, betType, team, opponent, line, odds, stake, book, potentialReturn },
          status: 'active'
        })
      })
      await fetch(`${process.env.DB_API_URL}/usage/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.DB_API_KEY_SHARPIQ}` },
        body: JSON.stringify({ user_id: userId, product: 'sharpiq', action: 'analyse_sports_bet' })
      })
    }

    return NextResponse.json({ ...aiResult, team, betType, line, odds, potentialReturn })
  } catch(err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
