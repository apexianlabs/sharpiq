'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const COLOR = '#7c3aed'
const PRODUCT_NAME = 'SharpIQ'
const PRODUCT_INITIAL = 'S'
const COOKIE = 'sha'
const ITEM_NAME = 'Analyses'
const AI_TASK = 'generate_item'

const STAGE_CONFIG = {
  draft:       { label:'Draft',       color:'#64748b', bg:'rgba(100,116,139,0.1)' },
  sent:        { label:'Sent',        color:'#3b82f6', bg:'rgba(59,130,246,0.1)'  },
  active:      { label:'Active',      color:'#8b5cf6', bg:'rgba(139,92,246,0.1)'  },
  completed:   { label:'Completed',   color:'#16a34a', bg:'rgba(22,163,74,0.1)'   },
  pending:     { label:'Pending',     color:'#f59e0b', bg:'rgba(245,158,11,0.1)'  },
  archived:    { label:'Archived',    color:'#ef4444', bg:'rgba(239,68,68,0.1)'   },
}

const Icon = ({ name, size=16, color='currentColor' }) => {
  const icons = {
    doc:      <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    chart:    <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
    dollar:   <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    clock:    <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    ai:       <><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>,
    zap:      <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    plus:     <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    grid:     <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
    users:    <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    arrow:    <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    logout:   <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    warning:  <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    dollar2:  <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser]         = useState(null)
  const [items, setItems]       = useState([])
  const [usageData, setUsageData] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [briefing, setBriefing] = useState(null)
  const [briefingLoading, setBriefingLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [cmdOpen, setCmdOpen]   = useState(false)
  const [pulse, setPulse]       = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const t = setInterval(() => { setPulse(true); setTimeout(() => setPulse(false), 800) }, 4000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const fn = (e) => { if ((e.metaKey||e.ctrlKey) && e.key==='k') { e.preventDefault(); setCmdOpen(c=>!c) } }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  useEffect(() => {
    const match = document.cookie.match(/sha_user=([^;]+)/)
    if (!match) { router.push('/login'); return }
    try {
      const u = JSON.parse(decodeURIComponent(match[1]))
      setUser(u)
      loadAll(u.id)
    } catch(e) { router.push('/login') }
  }, [])

  const loadAll = async (userId) => {
    setLoading(true)
    try {
      const token = document.cookie.match(/sha_token=([^;]+)/)?.[1] || ''
      const [itemRes, usageRes] = await Promise.all([
        fetch(`/api/items?user_id=${userId}`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`/api/usage?user_id=${userId}`)
      ])
      const itemData = await itemRes.json()
      const uData = await usageRes.json()
      setItems(itemData.items || itemData.data || [])
      setUsageData(uData)
    } catch(e) {}
    setLoading(false)
  }

  const fetchBriefing = async () => {
    if (briefing || briefingLoading) return
    setBriefingLoading(true)
    try {
      const token = document.cookie.match(/sha_token=([^;]+)/)?.[1] || ''
      const res = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ total: items.length, plan: usageData?.plan })
      })
      const data = await res.json()
      setBriefing(data.briefing)
    } catch(e) {}
    setBriefingLoading(false)
  }

  const completed = items.filter(i => i.status==='completed').length
  const active    = items.filter(i => i.status==='active' || i.status==='sent' || i.status==='pending').length
  const recent    = items.slice(0, 5)
  const stageData = Object.entries(STAGE_CONFIG).map(([key, cfg]) => ({
    key, ...cfg, count: items.filter(i => (i.status||'active')===key).length
  })).filter(s => s.count > 0)

  const navItems = [
    { icon:'grid',     label:'Dashboard',  href:'/dashboard',  active:true  },
    { icon:'doc',      label:ITEM_NAME,    href:'/items',      active:false },
    { icon:'zap',      label:'Generate',   href:'/generate',   active:false },
    { icon:'dollar',   label:'Billing',    href:'/billing',    active:false },
  ]

  const Sidebar = () => (
    <div style={{width:220,background:'linear-gradient(180deg,#0a0f2e 0%,#0f172a 100%)',display:'flex',flexDirection:'column',padding:'20px 12px',height:'100vh',position:'sticky',top:0,flexShrink:0,overflowX:'hidden'}}>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:28,paddingLeft:8}}>
        <div style={{width:28,height:28,borderRadius:7,background:COLOR,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:800,color:'#fff',flexShrink:0}}>{PRODUCT_INITIAL}</div>
        <span style={{fontSize:14,fontWeight:800,color:'#fff',letterSpacing:'-0.3px'}}>{PRODUCT_NAME}</span>
      </div>
      <button onClick={() => setCmdOpen(true)} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',borderRadius:7,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.06)',cursor:'pointer',marginBottom:14,width:'100%'}}>
        <Icon name="ai" size={12} color="#475569"/>
        <span style={{fontSize:11,color:'#475569',flex:1,textAlign:'left'}}>Search...</span>
        <span style={{fontSize:9,color:'#334155',background:'rgba(255,255,255,0.06)',padding:'2px 5px',borderRadius:3}}>⌘K</span>
      </button>
      {navItems.map(item => (
        <Link key={item.label} href={item.href} style={{
          display:'flex',alignItems:'center',gap:10,padding:'9px 10px',borderRadius:8,marginBottom:1,
          textDecoration:'none',transition:'all 0.15s',
          background:item.active?'rgba(37,99,235,0.2)':'transparent',
          color:item.active?'#93c5fd':'#475569',fontWeight:item.active?600:400,fontSize:13,
          border:item.active?'1px solid rgba(37,99,235,0.25)':'1px solid transparent',
        }}>
          <Icon name={item.icon} size={14} color={item.active?'#93c5fd':'#475569'}/>{item.label}
        </Link>
      ))}
      <div style={{marginTop:'auto',borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:14}}>
        {usageData && (
          <div style={{background:'rgba(37,99,235,0.08)',borderRadius:8,padding:'10px 12px',marginBottom:10,border:'1px solid rgba(37,99,235,0.15)'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
              <span style={{fontSize:10,color:'#475569',fontWeight:600,textTransform:'uppercase'}}>{usageData.plan||'Free'} Plan</span>
              <Link href="/billing" style={{fontSize:10,color:'#60a5fa',textDecoration:'none',fontWeight:700}}>Upgrade</Link>
            </div>
            <div style={{background:'rgba(255,255,255,0.06)',borderRadius:3,height:3,marginBottom:5}}>
              <div style={{background:'linear-gradient(90deg,#3b82f6,#8b5cf6)',borderRadius:3,height:3,width:`${Math.min(100,((usageData.used||0)/(usageData.limit||3))*100)}%`}}/>
            </div>
            <div style={{fontSize:10,color:'#334155'}}>{usageData.used||0} / {usageData.limit||3} used</div>
          </div>
        )}
        <button onClick={() => { document.cookie='sha_token=;max-age=0'; document.cookie='sha_user=;max-age=0'; router.push('/login') }}
          style={{display:'flex',alignItems:'center',gap:8,padding:'8px 10px',borderRadius:7,background:'none',border:'none',cursor:'pointer',color:'#334155',fontSize:12,width:'100%'}}>
          <Icon name="logout" size={13} color="#334155"/>Sign out
        </button>
      </div>
    </div>
  )

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#f1f5f9',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter,Arial,sans-serif'}}>
      <div style={{textAlign:'center'}}>
        <div style={{width:36,height:36,border:'2.5px solid #e2e8f0',borderTop:`2.5px solid ${COLOR}`,borderRadius:'50%',animation:'spin 0.7s linear infinite',margin:'0 auto 12px'}}/>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{fontSize:13,color:'#64748b'}}>Loading...</div>
      </div>
    </div>
  )

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#f1f5f9',fontFamily:'Inter,Arial,sans-serif',overflowX:'hidden'}}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes glow{0%,100%{box-shadow:0 0 8px rgba(37,99,235,0.2)}50%{box-shadow:0 0 24px rgba(37,99,235,0.5)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .stat-card:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,0.08)!important}
        .stat-card{transition:all 0.2s}
        .item-row:hover{background:#f8fafc!important}
        .item-row{transition:background 0.1s}
      `}</style>

      {isMobile && sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:40}}/>}
      {!isMobile ? <Sidebar/> : <div style={{position:'fixed',left:sidebarOpen?0:-240,top:0,bottom:0,zIndex:50,transition:'left 0.25s',width:220}}><Sidebar/></div>}

      {cmdOpen && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:100,display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:120}} onClick={() => setCmdOpen(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:'#fff',borderRadius:14,width:'100%',maxWidth:500,boxShadow:'0 32px 80px rgba(0,0,0,0.3)',border:'1px solid #e2e8f0',overflow:'hidden',animation:'slideUp 0.15s ease'}}>
            <div style={{padding:'12px 16px',borderBottom:'1px solid #f1f5f9',display:'flex',alignItems:'center',gap:10}}>
              <Icon name="ai" size={16} color="#94a3b8"/>
              <input autoFocus placeholder={`Search ${ITEM_NAME} or type a command...`} style={{flex:1,border:'none',outline:'none',fontSize:14,color:'#0f172a',background:'transparent'}}/>
              <span style={{fontSize:11,color:'#94a3b8',background:'#f1f5f9',padding:'2px 7px',borderRadius:4}}>ESC</span>
            </div>
            <div style={{padding:'8px'}}>
              {[
                {icon:'zap',   label:`Generate new ${ITEM_NAME.toLowerCase().slice(0,-1)}`, href:'/generate'},
                {icon:'doc',   label:`View all ${ITEM_NAME.toLowerCase()}`,                  href:'/items'},
                {icon:'dollar',label:'Manage billing',                                        href:'/billing'},
              ].map((cmd,i) => (
                <Link key={i} href={cmd.href} onClick={() => setCmdOpen(false)} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',borderRadius:8,textDecoration:'none',color:'#0f172a'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#f8fafc'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div style={{width:28,height:28,borderRadius:7,background:'#f1f5f9',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Icon name={cmd.icon} size={13} color="#64748b"/>
                  </div>
                  <span style={{fontSize:13,fontWeight:500}}>{cmd.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{flex:1,display:'flex',flexDirection:'column',minWidth:0}}>
        <div style={{background:'#fff',borderBottom:'1px solid #e2e8f0',padding:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:30}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            {isMobile && <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{background:'none',border:'none',cursor:'pointer',padding:4}}><Icon name="grid" size={18} color="#64748b"/></button>}
            <div>
              <h1 style={{fontSize:14,fontWeight:700,color:'#0f172a',margin:0}}>Dashboard</h1>
              <p style={{fontSize:11,color:'#94a3b8',margin:0}}>{PRODUCT_NAME} Intelligence</p>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <button onClick={() => setCmdOpen(true)} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 12px',borderRadius:7,background:'#f8fafc',border:'1px solid #e2e8f0',cursor:'pointer',fontSize:12,color:'#64748b'}}>
              <Icon name="ai" size={12} color="#94a3b8"/><span>Command</span>
              <span style={{fontSize:10,color:'#94a3b8',background:'#e2e8f0',padding:'1px 5px',borderRadius:3}}>⌘K</span>
            </button>
            <Link href="/generate" style={{background:COLOR,color:'#fff',padding:'7px 14px',borderRadius:7,textDecoration:'none',fontSize:12,fontWeight:700,display:'flex',alignItems:'center',gap:6}}>
              <Icon name="plus" size={13} color="#fff"/>New {ITEM_NAME.slice(0,-1)}
            </Link>
          </div>
        </div>

        <div style={{padding:'20px',flex:1}}>

          {/* AI Briefing */}
          <div style={{background:'linear-gradient(135deg,#1e3a8a 0%,#1e1b4b 60%,#0f172a 100%)',borderRadius:14,padding:'22px 24px',marginBottom:20,position:'relative',overflow:'hidden',animation:'glow 4s ease-in-out infinite'}}>
            <div style={{position:'absolute',top:0,left:'25%',right:'25%',height:1,background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)'}}/>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:16,flexWrap:'wrap',position:'relative',zIndex:1}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                  <div style={{width:24,height:24,borderRadius:6,background:'rgba(59,130,246,0.2)',border:'1px solid rgba(59,130,246,0.3)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Icon name="ai" size={13} color="#60a5fa"/>
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:'#60a5fa',textTransform:'uppercase',letterSpacing:'0.08em'}}>AI Intelligence Briefing</span>
                  <div style={{width:5,height:5,borderRadius:'50%',background:'#16a34a',animation:'pulse 2s infinite'}}/>
                </div>
                {briefingLoading ? (
                  <div style={{fontSize:14,color:'#94a3b8'}}>Analysing your data...</div>
                ) : briefing ? (
                  <div style={{fontSize:14,color:'#e0f2fe',lineHeight:1.7}}>{briefing}</div>
                ) : items.length === 0 ? (
                  <div>
                    <div style={{fontSize:15,fontWeight:600,color:'#fff',marginBottom:4}}>Ready to get started with {PRODUCT_NAME}?</div>
                    <div style={{fontSize:13,color:'#93c5fd',lineHeight:1.6}}>Generate your first {ITEM_NAME.toLowerCase().slice(0,-1)} in under 60 seconds.</div>
                  </div>
                ) : (
                  <div>
                    <div style={{fontSize:15,fontWeight:600,color:'#fff',marginBottom:4}}>{items.length} {ITEM_NAME.toLowerCase()} tracked · {completed} completed.</div>
                    <div style={{fontSize:13,color:'#93c5fd',lineHeight:1.6}}>{active > 0 ? `${active} active right now. ` : ''}Click Get AI Briefing for personalised recommendations.</div>
                  </div>
                )}
              </div>
              <button onClick={fetchBriefing} disabled={briefingLoading}
                style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)',color:'#fff',padding:'8px 14px',borderRadius:8,fontSize:11,fontWeight:600,cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',gap:6}}>
                <Icon name="ai" size={12} color="#60a5fa"/>
                {briefingLoading ? 'Thinking...' : 'Get AI Briefing'}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{display:'flex',gap:8,marginBottom:20,flexWrap:'wrap'}}>
            {[
              {icon:'zap',  label:`New ${ITEM_NAME.slice(0,-1)}`, href:'/generate', primary:true},
              {icon:'doc',  label:`All ${ITEM_NAME}`,             href:'/items'},
              {icon:'settings',label:'Settings',                  href:'/profile'},
            ].map(a => (
              <Link key={a.label} href={a.href} style={{display:'flex',alignItems:'center',gap:6,padding:'7px 12px',borderRadius:7,background:a.primary?COLOR:'#fff',border:a.primary?'none':'1px solid #e2e8f0',textDecoration:'none',fontSize:12,fontWeight:600,color:a.primary?'#fff':'#475569',flexShrink:0}}>
                <Icon name={a.icon} size={13} color={a.primary?'#fff':'#64748b'}/>{a.label}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:12,marginBottom:20}}>
            {[
              {label:`Total ${ITEM_NAME}`, value:items.length,  icon:'doc',    color:'#2563eb', sub:'All time'},
              {label:'Completed',          value:completed,      icon:'chart',  color:'#16a34a', sub:'Done'},
              {label:'Active',             value:active,         icon:'zap',    color:'#7c3aed', sub:'In progress'},
              {label:'Time Saved',         value:`${items.length*2}h`, icon:'clock', color:'#0891b2', sub:'Estimated'},
            ].map((s,i) => (
              <div key={i} className="stat-card" style={{background:'#fff',borderRadius:10,padding:'14px 16px',border:'1px solid #e2e8f0',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                  <span style={{fontSize:10,fontWeight:600,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em'}}>{s.label}</span>
                  <div style={{width:26,height:26,borderRadius:6,background:`${s.color}12`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Icon name={s.icon} size={13} color={s.color}/>
                  </div>
                </div>
                <div style={{fontSize:24,fontWeight:900,color:'#0f172a',letterSpacing:'-0.5px',lineHeight:1}}>{s.value}</div>
                <div style={{fontSize:11,color:'#94a3b8',marginTop:4}}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Recent Items */}
          <div style={{background:'#fff',borderRadius:12,border:'1px solid #e2e8f0',padding:'18px',marginBottom:20,boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
              <h2 style={{fontSize:13,fontWeight:700,color:'#0f172a',margin:0}}>Recent {ITEM_NAME}</h2>
              <Link href="/items" style={{fontSize:12,color:COLOR,textDecoration:'none',fontWeight:600}}>View all →</Link>
            </div>
            {recent.length === 0 ? (
              <div style={{textAlign:'center',padding:'32px 16px'}}>
                <div style={{width:44,height:44,borderRadius:10,background:'#f1f5f9',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px'}}>
                  <Icon name="doc" size={20} color="#94a3b8"/>
                </div>
                <div style={{fontSize:14,fontWeight:700,color:'#0f172a',marginBottom:6}}>No {ITEM_NAME.toLowerCase()} yet</div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:16}}>Get started by generating your first {ITEM_NAME.toLowerCase().slice(0,-1)}</div>
                <Link href="/generate" style={{background:COLOR,color:'#fff',padding:'8px 16px',borderRadius:8,textDecoration:'none',fontSize:12,fontWeight:700,display:'inline-flex',alignItems:'center',gap:6}}>
                  <Icon name="plus" size={13} color="#fff"/>Generate now
                </Link>
              </div>
            ) : recent.map((item,i) => (
              <div key={item.id||i} className="item-row" style={{display:'flex',alignItems:'center',gap:12,padding:'9px 10px',borderRadius:8,marginBottom:4,background:'transparent'}}>
                <div style={{width:32,height:32,borderRadius:8,background:`${COLOR}15`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:COLOR,flexShrink:0}}>
                  {(item.title||item.name||'?')[0]?.toUpperCase()}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,color:'#0f172a',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.title||item.name||'Untitled'}</div>
                  <div style={{fontSize:11,color:'#94a3b8',marginTop:1}}>{item.created_at ? new Date(item.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : ''}</div>
                </div>
                <div style={{padding:'3px 8px',borderRadius:20,fontSize:10,fontWeight:700,flexShrink:0,background:STAGE_CONFIG[item.status||'active']?.bg||'#f8fafc',color:STAGE_CONFIG[item.status||'active']?.color||'#64748b'}}>
                  {(item.status||'active').toUpperCase()}
                </div>
                <Icon name="arrow" size={13} color="#e2e8f0"/>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',background:'#fff',borderRadius:10,border:'1px solid #e2e8f0'}}>
            <span style={{fontSize:11,color:'#94a3b8'}}>© 2026 {PRODUCT_NAME}</span>
            <div style={{display:'flex',gap:16}}>
              {['Privacy','Terms','Support'].map(l => (
                <a key={l} href={`/${l.toLowerCase()}`} style={{fontSize:11,color:'#94a3b8',textDecoration:'none'}}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
