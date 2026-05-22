import { NextResponse } from 'next/server'

function calcPotentialReturn(stake, odds) {
  const s = parseFloat(stake) || 100
  const o = parseInt(odds) || -110
  if (o > 0) return ((s * o) / 100).toFixed(2)
  return ((s / Math.abs(o)) * 100).toFixed(2)
}

// Map sport keys to Odds API sport keys
const SPORT_MAP = {
  nfl:   'americanfootball_nfl',
  nba:   'basketball_nba',
  mlb:   'baseball_mlb',
  nhl:   'icehockey_nhl',
  ncaaf: 'americanfootball_ncaaf',
  ncaab: 'basketball_ncaab',
  soccer:'soccer_epl',
  pga:   null,
  ufc:   'mma_mixed_martial_arts',
}

// Outdoor stadiums for weather
const OUTDOOR_SPORTS = ['nfl', 'mlb', 'ncaaf', 'soccer']

async function fetchLiveOdds(sport, team) {
  try {
    const sportKey = SPORT_MAP[sport]
    if (!sportKey) return null
    const res = await fetch(
      `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?apiKey=${process.env.ODDS_API_KEY}&regions=us&markets=spreads,totals,h2h&oddsFormat=american`,
      { next: { revalidate: 300 } }
    )
    if (!res.ok) return null
    const games = await res.json()
    // Find game with matching team
    const game = games.find(g =>
      g.home_team?.toLowerCase().includes(team.toLowerCase()) ||
      g.away_team?.toLowerCase().includes(team.toLowerCase())
    )
    if (!game) return null

    // Extract spreads and totals
    const draftkings = game.bookmakers?.find(b => b.key === 'draftkings') || game.bookmakers?.[0]
    const spread = draftkings?.markets?.find(m => m.key === 'spreads')
    const total = draftkings?.markets?.find(m => m.key === 'totals')
    const h2h = draftkings?.markets?.find(m => m.key === 'h2h')

    return {
      homeTeam: game.home_team,
      awayTeam: game.away_team,
      commenceTime: game.commence_time,
      spread: spread?.outcomes,
      total: total?.outcomes,
      moneyline: h2h?.outcomes,
      bookmaker: draftkings?.title || 'Unknown'
    }
  } catch(e) { return null }
}

async function fetchWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}&units=imperial`
    )
    if (!res.ok) return null
    const data = await res.json()
    return {
      temp: Math.round(data.main?.temp),
      description: data.weather?.[0]?.description,
      windSpeed: Math.round(data.wind?.speed),
      humidity: data.main?.humidity
    }
  } catch(e) { return null }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { sport, betType, team, opponent, line, odds, stake, book, notes, city, userId } = body

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

    // Fetch live data in parallel
    const [liveOdds, weather] = await Promise.all([
      fetchLiveOdds(sport, team),
      OUTDOOR_SPORTS.includes(sport) && city ? fetchWeather(city) : Promise.resolve(null)
    ])

    // Build context for AI
    let liveContext = ''
    if (liveOdds) {
      liveContext += `\nLive Odds Data (from ${liveOdds.bookmaker}):`
      liveContext += `\n- Game: ${liveOdds.awayTeam} @ ${liveOdds.homeTeam}`
      if (liveOdds.commenceTime) liveContext += `\n- Game Time: ${new Date(liveOdds.commenceTime).toLocaleString()}`
      if (liveOdds.spread) liveContext += `\n- Live Spread: ${liveOdds.spread.map(o => `${o.name} ${o.point > 0 ? '+' : ''}${o.point} (${o.price})`).join(', ')}`
      if (liveOdds.total) liveContext += `\n- Live Total: ${liveOdds.total.map(o => `${o.name} ${o.point} (${o.price})`).join(', ')}`
      if (liveOdds.moneyline) liveContext += `\n- Live Moneyline: ${liveOdds.moneyline.map(o => `${o.name} (${o.price})`).join(', ')}`
    }

    let weatherContext = ''
    if (weather) {
      weatherContext = `\nGame Day Weather${city ? ` (${city})` : ''}:`
      weatherContext += `\n- Temperature: ${weather.temp}°F`
      weatherContext += `\n- Conditions: ${weather.description}`
      weatherContext += `\n- Wind: ${weather.windSpeed} mph`
      weatherContext += `\n- Humidity: ${weather.humidity}%`
      if (weather.windSpeed > 15) weatherContext += '\n- ⚠️ High wind — consider impact on passing game and totals'
      if (weather.temp < 32) weatherContext += '\n- ⚠️ Freezing temperatures — consider impact on scoring'
    }

    const prompt = `You are a sharp sports bettor and betting analyst with access to live odds data. Analyse this bet and respond ONLY with valid JSON.

Bet Details:
- Sport: ${sport.toUpperCase()}
- Bet Type: ${betType}
- Selection: ${team}${opponent ? ` vs ${opponent}` : ''}
- Line: ${line}
- Odds: ${odds} (American)
- Stake: $${stake}
- Sportsbook: ${book}
${notes ? `- Notes/Context: ${notes}` : ''}
${liveContext}
${weatherContext}

${liveOdds ? 'Use the live odds data to assess line value — compare the user\'s line to current market prices.' : ''}
${weather && weather.windSpeed > 15 ? 'Factor in the high wind speed when analysing totals and passing props.' : ''}

Respond ONLY with this JSON:
{
  "recommendation": "Bet|Strong Bet|Pass|Lean Bet",
  "confidence": <number 0-100>,
  "analysis": "2-3 sentence analysis referencing live odds and weather if available",
  "keyFactors": ["factor 1", "factor 2", "factor 3", "factor 4"],
  "risks": ["risk 1", "risk 2", "risk 3"],
  "edgeRating": "Good Value|Fair Value|Poor Value|Line Shopping Advised",
  "lineValue": ${liveOdds ? '"brief note on whether user\'s line is better or worse than current market"' : 'null'}
}`

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
          result_data: { ...aiResult, sport, betType, team, opponent, line, odds, stake, book, potentialReturn, liveOdds, weather },
          status: 'active'
        })
      })
      await fetch(`${process.env.DB_API_URL}/usage/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.DB_API_KEY_SHARPIQ}` },
        body: JSON.stringify({ user_id: userId, product: 'sharpiq', action: 'analyse_sports_bet' })
      })
    }

    return NextResponse.json({
      ...aiResult, team, betType, line, odds, potentialReturn,
      liveOdds: liveOdds ? { homeTeam: liveOdds.homeTeam, awayTeam: liveOdds.awayTeam, spread: liveOdds.spread, total: liveOdds.total } : null,
      weather
    })
  } catch(err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
