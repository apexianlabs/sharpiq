'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser]           = useState(null)
  const [items, setItems]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [isMobile, setIsMobile]   = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const match = document.cookie.match(/sha_user=([^;]+)/)
    if (!match) { router.push('/login'); return }
    try {
      const u = JSON.parse(decodeURIComponent(match[1]))
      setUser(u)
      loadItems(u.id)
    } catch(e) { router.push('/login') }
  }, [])

  const loadItems = async (userId) => {
    try {
      const token = document.cookie.match(/sha_token=([^;]+)/)?.[1] || ''
      const res = await fetch(`/api/items?user_id=${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setItems(data.items || [])
    } catch(e) {}
    finally { setLoading(false) }
  }

  const handleLogout = () => {
    document.cookie = 'sha_token=; path=/; max-age=0'
    document.cookie = 'sha_user=; path=/; max-age=0'
    router.push('/login')
  }

  const getInitials = (u) => {
    if (!u) return '{{PRODUCT_NAME_INITIAL}}{{PRODUCT_NAME_INITIAL}}'
    const name = u.name || u.email || ''
    const parts = name.trim().split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name.slice(0, 2).toUpperCase()
  }

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const thisMonth = items.filter(i => new Date(i.created_at) > new Date(Date.now() - 30*24*60*60*1000)).length
  const recentItems = items.slice(0, 6)

  const Sidebar = () => (
    <div style={{width:220,background:'#0f172a',display:'flex',flexDirection:'column',minHeight:'100vh',flexShrink:0,position:'relative'}}>
      {/* Logo */}
      <div style={{padding:'20px 16px 16px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:9,textDecoration:'none'}}>
          <div style={{width:28,height:28,borderRadius:7,background:'#7c3aed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:800,color:'#fff',flexShrink:0}}>{{PRODUCT_NAME_INITIAL}}</div>
          <div>
            <p style={{fontSize:13,fontWeight:800,color:'#fff',lineHeight:1,letterSpacing:'-0.3px'}}>SharpIQ</p>
            <p style={{fontSize:10,color:'#475569',lineHeight:1,marginTop:2}}>{{PRODUCT_TAGLINE_SHORT}}</p>
          </div>
        </Link>
      </div>

      {/* New button */}
      <div style={{padding:'12px 12px 8px'}}>
        <Link href="/generate" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:7,background:'#7c3aed',color:'#fff',textDecoration:'none',borderRadius:8,padding:'10px',fontSize:13,fontWeight:600,letterSpacing:'-0.2px'}}>
          <span style={{fontSize:16,lineHeight:1}}>+</span> New Result
        </Link>
      </div>

      {/* Nav */}
      <div style={{padding:'4px 8px',flex:1}}>
        {[
          { icon:'⬡', label:'Dashboard', href:'/dashboard', active:true },
          { icon:'□', label:'Results', href:'/items' },
          { icon:'◈', label:'Billing', href:'/billing' },
        ].map(item => (
          <Link key={item.label} href={item.href}
            style={{display:'flex',alignItems:'center',gap:9,padding:'8px 10px',borderRadius:7,textDecoration:'none',marginBottom:1,
              background: item.active ? 'rgba(255,255,255,0.08)' : 'transparent',
              color: item.active ? '#fff' : '#64748b',
              fontSize:13,fontWeight: item.active ? 600 : 400}}>
            <span style={{fontSize:14,opacity:0.8}}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      {/* User */}
      <div style={{padding:'12px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{background:'rgba(255,255,255,0.04)',borderRadius:10,padding:'10px 12px',marginBottom:8,border:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
            <p style={{fontSize:11,fontWeight:600,color:'#94a3b8'}}>Free Plan</p>
            <Link href="/billing" style={{fontSize:10,color:'#7c3aed',textDecoration:'none',fontWeight:600}}>Upgrade</Link>
          </div>
          <div style={{background:'rgba(255,255,255,0.08)',borderRadius:3,height:3,marginBottom:6}}>
            <div style={{background:'#7c3aed',borderRadius:3,height:3,width:`${Math.min(100,(items.length/3)*100)}%`,transition:'width 0.3s'}}/>
          </div>
          <p style={{fontSize:10,color:'#475569'}}>{items.length} / 3 uses this month</p>
        </div>
        <button onClick={handleLogout}
          style={{display:'flex',alignItems:'center',gap:8,width:'100%',background:'none',border:'none',cursor:'pointer',padding:'6px 4px',borderRadius:7}}>
          <div style={{width:28,height:28,borderRadius:7,background:'#7c3aed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'#fff',flexShrink:0}}>
            {getInitials(user)}
          </div>
          <div style={{textAlign:'left',minWidth:0}}>
            <p style={{fontSize:12,fontWeight:600,color:'#e2e8f0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{user?.name || 'User'}</p>
            <p style={{fontSize:10,color:'#475569',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{user?.email}</p>
          </div>
        </button>
      </div>
    </div>
  )

  return (
    <div style={{display:'flex',minHeight:'100vh',fontFamily:'Inter,system-ui,sans-serif',background:'#f8fafc'}}>
      {!isMobile && <Sidebar />}

      {isMobile && sidebarOpen && (
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex'}}>
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.5)'}} onClick={() => setSidebarOpen(false)}/>
          <div style={{position:'relative',zIndex:1}}><Sidebar /></div>
        </div>
      )}

      <div style={{flex:1,display:'flex',flexDirection:'column',minWidth:0,overflow:'hidden'}}>
        {/* Topbar */}
        <div style={{background:'#fff',borderBottom:'1px solid #f1f5f9',height:56,display:'flex',alignItems:'center',padding:'0 20px',gap:12,flexShrink:0}}>
          {isMobile && (
            <button onClick={() => setSidebarOpen(true)} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex',flexDirection:'column',gap:4,flexShrink:0}}>
              <div style={{width:18,height:1.5,background:'#0f172a',borderRadius:2}}/>
              <div style={{width:18,height:1.5,background:'#0f172a',borderRadius:2}}/>
              <div style={{width:18,height:1.5,background:'#0f172a',borderRadius:2}}/>
            </button>
          )}
          <div style={{flex:1}}>
            <p style={{fontSize:16,fontWeight:700,color:'#0f172a',letterSpacing:'-0.3px'}}>{greeting()}, {user?.name?.split(' ')[0] || 'there'} 👋</p>
            <p style={{fontSize:11,color:'#94a3b8',marginTop:1}}>Here's your SharpIQ overview.</p>
          </div>
          <Link href="/generate"
            style={{background:'#7c3aed',color:'#fff',padding:'7px 16px',borderRadius:8,fontSize:13,fontWeight:600,textDecoration:'none',letterSpacing:'-0.2px',flexShrink:0}}>
            + New
          </Link>
        </div>

        {/* Content */}
        <div style={{flex:1,padding:'20px',overflowY:'auto'}}>

          {/* KPI cards */}
          <div style={{display:'grid',gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',gap:12,marginBottom:20}}>
            {[
              { label:'Total', value: items.length, sub: 'All time', color:'#7c3aed', icon:'📄' },
              { label:'This Month', value: thisMonth, sub: 'Last 30 days', color:'#059669', icon:'📅' },
              { label:'Time Saved', value: `${items.length * 2}h`, sub: '~2h per use', color:'#7c3aed', icon:'⏱' },
              { label:'Streak', value: items.length > 0 ? '🔥' : '—', sub: items.length > 0 ? 'Active' : 'Get started', color:'#d97706', icon:'⚡' },
            ].map(stat => (
              <div key={stat.label} style={{background:'#fff',borderRadius:12,border:'1px solid #f1f5f9',padding:'16px 18px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
                <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:10}}>
                  <p style={{fontSize:10,fontWeight:700,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.06em'}}>{stat.label}</p>
                  <span style={{fontSize:16}}>{stat.icon}</span>
                </div>
                <p style={{fontSize:26,fontWeight:800,color:'#0f172a',letterSpacing:'-0.5px',lineHeight:1,marginBottom:4}}>{stat.value}</p>
                <p style={{fontSize:11,color:stat.color,fontWeight:500}}>{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div style={{display:'grid',gridTemplateColumns: isMobile ? '1fr' : '1fr 300px',gap:16}}>

            {/* Recent items */}
            <div style={{background:'#fff',borderRadius:14,border:'1px solid #f1f5f9',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid #f8fafc',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <p style={{fontSize:14,fontWeight:700,color:'#0f172a',letterSpacing:'-0.2px'}}>Recent Results</p>
                <Link href="/generate" style={{fontSize:12,color:'#7c3aed',textDecoration:'none',fontWeight:600,background:'rgba(0,0,0,0.03)',padding:'4px 10px',borderRadius:6}}>+ New</Link>
              </div>

              {loading ? (
                <div style={{padding:48,textAlign:'center',color:'#94a3b8',fontSize:13}}>Loading...</div>
              ) : recentItems.length === 0 ? (
                <div style={{padding:'48px 24px',textAlign:'center'}}>
                  <div style={{width:48,height:48,borderRadius:12,background:'#f8fafc',border:'1px solid #f1f5f9',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,margin:'0 auto 16px'}}>📄</div>
                  <p style={{fontSize:14,fontWeight:600,color:'#0f172a',marginBottom:6}}>No Results yet</p>
                  <p style={{fontSize:13,color:'#94a3b8',marginBottom:20}}>Generate your first one in seconds</p>
                  <Link href="/generate" style={{background:'#7c3aed',color:'#fff',padding:'9px 20px',borderRadius:8,fontSize:13,fontWeight:600,textDecoration:'none'}}>
                    Get started →
                  </Link>
                </div>
              ) : recentItems.map((item, i) => (
                <div key={item.id}
                  style={{padding:'14px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom: i < recentItems.length-1 ? '1px solid #fafafa' : 'none',cursor:'pointer',transition:'background 0.1s'}}
                  onMouseEnter={e => e.currentTarget.style.background='#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                  <div style={{display:'flex',alignItems:'center',gap:12,minWidth:0,flex:1}}>
                    <div style={{width:34,height:34,borderRadius:9,background:'#f0f4ff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,color:'#7c3aed',flexShrink:0,border:'1px solid rgba(0,0,0,0.04)'}}>
                      {(item.title || item.name || '?')[0]?.toUpperCase()}
                    </div>
                    <div style={{minWidth:0}}>
                      <p style={{fontSize:13,fontWeight:600,color:'#0f172a',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',letterSpacing:'-0.1px'}}>{item.title || item.name}</p>
                      <p style={{fontSize:11,color:'#94a3b8',marginTop:2}}>{new Date(item.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</p>
                    </div>
                  </div>
                  <Link href={`/items/${item.id}`}
                    style={{color:'#7c3aed',fontSize:11,fontWeight:600,textDecoration:'none',padding:'5px 10px',border:'1px solid rgba(0,0,0,0.08)',borderRadius:6,flexShrink:0,marginLeft:12,background:'#fff'}}>
                    View →
                  </Link>
                </div>
              ))}
            </div>

            {/* Right column */}
            <div style={{display:'flex',flexDirection:'column',gap:12}}>

              {/* Quick action */}
              <div style={{background:'linear-gradient(135deg,#7c3aed 0%,#7c3aedcc 100%)',borderRadius:14,padding:20,color:'#fff'}}>
                <p style={{fontSize:13,fontWeight:700,marginBottom:4,letterSpacing:'-0.2px'}}>Ready to generate?</p>
                <p style={{fontSize:12,color:'rgba(255,255,255,0.75)',marginBottom:14,lineHeight:1.5}}>AI sports betting tracker and picks analyser</p>
                <Link href="/generate" style={{display:'block',textAlign:'center',background:'rgba(255,255,255,0.2)',color:'#fff',textDecoration:'none',borderRadius:8,padding:'9px',fontSize:12,fontWeight:700,border:'1px solid rgba(255,255,255,0.25)',backdropFilter:'blur(4px)'}}>
                  + New Result →
                </Link>
              </div>

              {/* Activity */}
              <div style={{background:'#fff',borderRadius:14,border:'1px solid #f1f5f9',padding:20,flex:1,boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
                <p style={{fontSize:13,fontWeight:700,color:'#0f172a',marginBottom:14,letterSpacing:'-0.2px'}}>Activity</p>
                {items.length === 0 ? (
                  <p style={{fontSize:12,color:'#94a3b8',lineHeight:1.6}}>Your activity will appear here once you start generating.</p>
                ) : items.slice(0,5).map((item, i) => (
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:12}}>
                    <div style={{width:26,height:26,borderRadius:'50%',background:'#f0f4ff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,flexShrink:0,color:'#7c3aed',fontWeight:700,border:'1px solid rgba(0,0,0,0.04)'}}>+</div>
                    <div style={{minWidth:0}}>
                      <p style={{fontSize:12,color:'#0f172a',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',letterSpacing:'-0.1px'}}>
                        Created <span style={{fontWeight:600}}>{item.title || item.name}</span>
                      </p>
                      <p style={{fontSize:10,color:'#94a3b8',marginTop:2}}>
                        {new Date(item.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric'})}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upgrade CTA */}
              {items.length >= 2 && (
                <div style={{background:'#fafafa',borderRadius:14,border:'1px solid #f1f5f9',padding:20}}>
                  <p style={{fontSize:13,fontWeight:700,color:'#0f172a',marginBottom:4}}>Upgrade for unlimited</p>
                  <p style={{fontSize:12,color:'#64748b',marginBottom:12,lineHeight:1.5}}>Get unlimited Results from $19/month.</p>
                  <Link href="/billing" style={{display:'block',textAlign:'center',background:'#7c3aed',color:'#fff',textDecoration:'none',borderRadius:8,padding:'8px',fontSize:12,fontWeight:700}}>
                    View plans →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div style={{borderTop:'1px solid #e2e8f0',padding:'14px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#fff',marginTop:'auto'}}>
        <span style={{fontSize:11,color:'#94a3b8'}}>© 2026 SharpIQ</span>
        <div style={{display:'flex',gap:20}}>
          <a href="https://sharpiq.app/privacy" style={{fontSize:11,color:'#94a3b8',textDecoration:'none'}} target="_blank" rel="noreferrer">Privacy</a>
          <a href="https://sharpiq.app/terms" style={{fontSize:11,color:'#94a3b8',textDecoration:'none'}} target="_blank" rel="noreferrer">Terms</a>
          <a href="https://sharpiq.app/support" style={{fontSize:11,color:'#94a3b8',textDecoration:'none'}} target="_blank" rel="noreferrer">Support</a>
        </div>
      </div>
    </div>
  )
}
