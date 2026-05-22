'use client'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'

function GeneratePageInner() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('analysis')
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({
    sport: 'nfl',
    betType: 'spread',
    team: '',
    opponent: '',
    line: '',
    odds: '-110',
    stake: '100',
    book: 'DraftKings',
    notes: ''
  })

  const COLOR = '#7c3aed'

  useEffect(() => {
    const match = document.cookie.match(/sha_user=([^;]+)/)
    if (match) {
      try { setUser(JSON.parse(decodeURIComponent(match[1]))) } catch(e) {}
    }
  }, [])

  const handleAnalyse = async () => {
    if (!form.team || !form.line) {
      setError('Please enter the team and line/total')
      return
    }
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const token = document.cookie.match(/sha_token=([^;]+)/)?.[1] || ''
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...form, userId: user?.id })
      })
      const data = await res.json()
      if (data.error === 'limit_reached') { setError('limit_reached'); setLoading(false); return }
      if (!res.ok) throw new Error(data.error || 'Analysis failed')
      setResult(data)
      setActiveTab('analysis')
    } catch(e) { setError(e.message) }
    setLoading(false)
  }

  const inputStyle = { width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid #e2e8f0', fontSize:13, outline:'none', boxSizing:'border-box', background:'#fff' }
  const labelStyle = { fontSize:12, fontWeight:600, color:'#475569', marginBottom:4, display:'block' }

  const confidenceColor = (score) => {
    if (score >= 70) return '#16a34a'
    if (score >= 50) return '#d97706'
    return '#dc2626'
  }

  const recommendationColor = (rec) => {
    if (rec === 'Bet' || rec === 'Strong Bet') return { bg:'#f0fdf4', border:'#bbf7d0', text:'#16a34a' }
    if (rec === 'Pass') return { bg:'#fef2f2', border:'#fecaca', text:'#dc2626' }
    return { bg:'#fff7ed', border:'#fed7aa', text:'#d97706' }
  }

  if (error === 'limit_reached') return (
    <div style={{minHeight:'100vh',background:'#f8fafc',display:'flex',alignItems:'center',justifyContent:'center',padding:20,fontFamily:'Inter,Arial,sans-serif'}}>
      <div style={{background:'#fff',borderRadius:16,padding:32,maxWidth:400,textAlign:'center',border:'1px solid #e2e8f0'}}>
        <div style={{fontSize:40,marginBottom:16}}>🎯</div>
        <h2 style={{fontSize:18,fontWeight:800,color:'#0f172a',marginBottom:8}}>Free limit reached</h2>
        <p style={{fontSize:14,color:'#64748b',marginBottom:24}}>Upgrade to keep getting AI bet analysis.</p>
        <Link href="/billing" style={{display:'block',background:COLOR,color:'#fff',padding:'12px 24px',borderRadius:9,textDecoration:'none',fontWeight:700,fontSize:14,marginBottom:12}}>Upgrade now →</Link>
        <button onClick={() => setError('')} style={{background:'none',border:'none',color:'#94a3b8',fontSize:13,cursor:'pointer'}}>Maybe later</button>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'Inter,Arial,sans-serif'}}>
      <div style={{background:'#fff',borderBottom:'1px solid #e2e8f0',padding:'14px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/dashboard" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <div style={{width:28,height:28,borderRadius:7,background:COLOR,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:800,color:'#fff'}}>S</div>
          <span style={{fontSize:14,fontWeight:800,color:'#0f172a'}}>SharpIQ</span>
        </Link>
        <Link href="/dashboard" style={{fontSize:13,color:'#64748b',textDecoration:'none'}}>← Dashboard</Link>
      </div>

      <div style={{maxWidth:960,margin:'0 auto',padding:'24px 16px'}}>
        <div style={{marginBottom:24}}>
          <h1 style={{fontSize:22,fontWeight:800,color:'#0f172a',marginBottom:6}}>Analyse a bet</h1>
          <p style={{fontSize:14,color:'#64748b'}}>Enter the bet details and get an AI confidence score, key factors and recommendation.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns: result ? 'clamp(300px,45%,460px) 1fr' : '1fr',gap:24}}>
          {/* Form */}
          <div style={{background:'#fff',borderRadius:14,border:'1px solid #e2e8f0',padding:24}}>
            <h2 style={{fontSize:15,fontWeight:700,color:'#0f172a',marginBottom:20}}>Bet Details</h2>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
              <div>
                <label style={labelStyle}>Sport</label>
                <select style={inputStyle} value={form.sport} onChange={e => setForm({...form, sport: e.target.value})}>
                  <option value="nfl">🏈 NFL</option>
                  <option value="nba">🏀 NBA</option>
                  <option value="mlb">⚾ MLB</option>
                  <option value="nhl">🏒 NHL</option>
                  <option value="ncaaf">🏈 NCAAF</option>
                  <option value="ncaab">🏀 NCAAB</option>
                  <option value="soccer">⚽ Soccer</option>
                  <option value="pga">⛳ PGA</option>
                  <option value="ufc">🥊 UFC/MMA</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Bet Type</label>
                <select style={inputStyle} value={form.betType} onChange={e => setForm({...form, betType: e.target.value})}>
                  <option value="spread">Spread</option>
                  <option value="moneyline">Moneyline</option>
                  <option value="total">Total (O/U)</option>
                  <option value="parlay">Parlay</option>
                  <option value="prop">Player Prop</option>
                  <option value="futures">Futures</option>
                  <option value="teaser">Teaser</option>
                </select>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
              <div>
                <label style={labelStyle}>Team / Selection *</label>
                <input style={inputStyle} placeholder="e.g. Kansas City Chiefs" value={form.team}
                  onChange={e => setForm({...form, team: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Opponent</label>
                <input style={inputStyle} placeholder="e.g. Buffalo Bills" value={form.opponent}
                  onChange={e => setForm({...form, opponent: e.target.value})} />
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
              <div>
                <label style={labelStyle}>Line / Total *</label>
                <input style={inputStyle} placeholder="e.g. -3.5 or 47.5" value={form.line}
                  onChange={e => setForm({...form, line: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Odds (American)</label>
                <input style={inputStyle} placeholder="-110" value={form.odds}
                  onChange={e => setForm({...form, odds: e.target.value})} />
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
              <div>
                <label style={labelStyle}>Stake ($)</label>
                <input style={inputStyle} type="number" placeholder="100" value={form.stake}
                  onChange={e => setForm({...form, stake: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Sportsbook</label>
                <select style={inputStyle} value={form.book} onChange={e => setForm({...form, book: e.target.value})}>
                  {['DraftKings','FanDuel','BetMGM','Caesars','PointsBet','BetRivers','Bet365','William Hill','Unibet','Other'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{marginBottom:20}}>
              <label style={labelStyle}>Context / Notes</label>
              <textarea style={{...inputStyle, height:70, resize:'vertical'}}
                placeholder="Any relevant info — injuries, weather, line movement, matchup notes..."
                value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
            </div>

            {error && error !== 'limit_reached' && (
              <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:8,padding:12,marginBottom:16,fontSize:13,color:'#dc2626'}}>{error}</div>
            )}

            <button onClick={handleAnalyse} disabled={loading}
              style={{width:'100%',background:loading ? '#a78bfa' : COLOR,color:'#fff',border:'none',borderRadius:9,padding:'13px 24px',fontSize:14,fontWeight:700,cursor:loading?'not-allowed':'pointer'}}>
              {loading ? '🔍 Analysing...' : '🎯 Analyse Bet'}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div style={{background:'#fff',borderRadius:14,border:'1px solid #e2e8f0',padding:24}}>
              <h2 style={{fontSize:15,fontWeight:700,color:'#0f172a',marginBottom:4}}>AI Analysis</h2>
              <p style={{fontSize:12,color:'#94a3b8',marginBottom:16}}>{result.team} {result.betType} {result.line} @ {result.odds}</p>

              {/* Recommendation + Confidence */}
              {result.recommendation && (() => {
                const rc = recommendationColor(result.recommendation)
                return (
                  <div style={{background:rc.bg,border:`1px solid ${rc.border}`,borderRadius:10,padding:'12px 16px',marginBottom:16,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div>
                      <div style={{fontSize:18,fontWeight:800,color:rc.text}}>{result.recommendation}</div>
                      <div style={{fontSize:12,color:'#64748b',marginTop:2}}>AI Recommendation</div>
                    </div>
                    {result.confidence && (
                      <div style={{textAlign:'right'}}>
                        <div style={{fontSize:24,fontWeight:800,color:confidenceColor(result.confidence)}}>{result.confidence}%</div>
                        <div style={{fontSize:11,color:'#94a3b8'}}>Confidence</div>
                      </div>
                    )}
                  </div>
                )
              })()}

              {/* Potential return */}
              {result.potentialReturn && (
                <div style={{background:'#f8fafc',borderRadius:8,padding:'10px 14px',marginBottom:16,display:'flex',justifyContent:'space-between'}}>
                  <div><div style={{fontSize:10,color:'#94a3b8',fontWeight:600}}>STAKE</div><div style={{fontSize:14,fontWeight:700,color:'#0f172a'}}>${form.stake}</div></div>
                  <div><div style={{fontSize:10,color:'#94a3b8',fontWeight:600}}>TO WIN</div><div style={{fontSize:14,fontWeight:700,color:'#16a34a'}}>${result.potentialReturn}</div></div>
                  <div><div style={{fontSize:10,color:'#94a3b8',fontWeight:600}}>BOOK</div><div style={{fontSize:14,fontWeight:700,color:'#0f172a'}}>{form.book}</div></div>
                </div>
              )}

              {/* Tabs */}
              <div style={{display:'flex',gap:6,marginBottom:16,borderBottom:'1px solid #f1f5f9',paddingBottom:8,flexWrap:'wrap'}}>
                {[
                  {key:'analysis', label:'🤖 Analysis'},
                  {key:'factors', label:'📊 Key Factors'},
                  {key:'risks', label:'⚠️ Risks'},
                ].map(tab => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                    style={{padding:'6px 12px',borderRadius:6,border:'none',fontSize:12,fontWeight:600,cursor:'pointer',
                      background:activeTab===tab.key ? COLOR : '#f1f5f9',
                      color:activeTab===tab.key ? '#fff' : '#64748b'}}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'analysis' && result.analysis && (
                <div style={{background:'#f8fafc',borderRadius:8,padding:14,fontSize:13,color:'#334155',lineHeight:1.7}}>{result.analysis}</div>
              )}

              {activeTab === 'factors' && result.keyFactors && (
                <div>
                  {result.keyFactors.map((f, i) => (
                    <div key={i} style={{display:'flex',gap:10,marginBottom:10,alignItems:'flex-start'}}>
                      <div style={{width:20,height:20,borderRadius:'50%',background:COLOR,color:'#fff',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>{i+1}</div>
                      <span style={{fontSize:13,color:'#334155',lineHeight:1.5}}>{f}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'risks' && result.risks && (
                <div>
                  {result.risks.map((r, i) => (
                    <div key={i} style={{display:'flex',gap:10,marginBottom:10,alignItems:'flex-start'}}>
                      <span style={{color:'#dc2626',fontSize:16,flexShrink:0}}>⚠</span>
                      <span style={{fontSize:13,color:'#334155',lineHeight:1.5}}>{r}</span>
                    </div>
                  ))}
                </div>
              )}

              <button onClick={() => {
                const txt = `SharpIQ Analysis\n${result.team} ${result.betType} ${result.line} @ ${result.odds}\nRecommendation: ${result.recommendation} (${result.confidence}% confidence)\n\n${result.analysis}`
                navigator.clipboard.writeText(txt)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }} style={{width:'100%',marginTop:16,background:'#f1f5f9',border:'none',borderRadius:8,padding:'10px',fontSize:13,fontWeight:600,color:'#475569',cursor:'pointer'}}>
                {copied ? '✓ Copied!' : '📋 Copy Analysis'}
              </button>

              <Link href="/dashboard" style={{display:'block',marginTop:10,textAlign:'center',fontSize:13,color:'#94a3b8',textDecoration:'none'}}>View all bets →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function GeneratePage() {
  return <Suspense><GeneratePageInner /></Suspense>
}
