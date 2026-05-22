'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const PLANS = [
  { id: 'free',    name: 'Free',    price: '$0',  period: '/month', desc: 'Try it out', features: ['3 free uses', 'AI generation', 'Export results'], cta: 'Current Plan' },
  { id: 'starter', name: 'Starter', price: '$19', period: '/month', desc: 'For solo pros', features: ['50 per month', 'All features', 'Email support'], cta: 'Upgrade' },
  { id: 'pro',     name: 'Pro',     price: '$39', period: '/month', desc: 'For agencies', features: ['Unlimited', 'Priority support', 'API access'], cta: 'Upgrade', highlight: true },
  { id: 'studio',  name: 'Studio',  price: '$99', period: '/month', desc: 'For teams', features: ['Unlimited', 'Team seats', 'Dedicated support'], cta: 'Upgrade' },
]

export default function BillingPage() {
  const router = useRouter()
  const [user, setUser]           = useState(null)
  const [currentPlan, setCurrentPlan] = useState('free')
  const [loading, setLoading]     = useState(false)
  const [activeTab, setActiveTab] = useState('plans')
  const [invoices, setInvoices]   = useState([])

  useEffect(() => {
    const match = document.cookie.match(/sha_user=([^;]+)/)
    if (match) {
      try {
        const u = JSON.parse(decodeURIComponent(match[1]))
        setUser(u)
        const token = document.cookie.match(/sha_token=([^;]+)/)?.[1]
        if (token && u?.id) {
          fetch(`/api/subscription?user_id=${u.id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(r => r.json()).then(data => { if (data?.plan) setCurrentPlan(data.plan) })
          fetch(`/api/invoices?user_id=${u.id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(r => r.json()).then(data => { if (data?.invoices) setInvoices(data.invoices) })
        }
      } catch(e) {}
    } else { router.push('/login') }
  }, [])

  const handleUpgrade = async (planId) => {
    if (planId === currentPlan || planId === 'free') return
    setLoading(true)
    try {
      const token = document.cookie.match(/sha_token=([^;]+)/)?.[1]
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ plan: planId })
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch(e) {} finally { setLoading(false) }
  }

  return (
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'Inter,sans-serif'}}>
      <nav style={{background:'#fff',borderBottom:'1px solid #e2e8f0',height:56,display:'flex',alignItems:'center',padding:'0 24px',gap:16}}>
        <Link href="/dashboard" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <div style={{width:28,height:28,borderRadius:6,background:'#7c3aed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:800,color:'#fff'}}>{{PRODUCT_NAME_INITIAL}}</div>
          <span style={{fontWeight:700,color:'#0f172a',fontSize:14}}>SharpIQ</span>
        </Link>
        <div style={{flex:1}}/>
        <div style={{display:'flex',gap:4,background:'#f1f5f9',borderRadius:8,padding:3}}>
          {['plans','invoices'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              style={{padding:'5px 14px',borderRadius:6,border:'none',fontSize:12,fontWeight:500,cursor:'pointer',
                background: activeTab === t ? '#fff' : 'transparent',
                color: activeTab === t ? '#0f172a' : '#64748b'}}>
              {t === 'plans' ? 'Plans' : 'Invoices'}
            </button>
          ))}
        </div>
        <Link href="/dashboard" style={{fontSize:13,color:'#64748b',textDecoration:'none'}}>← Dashboard</Link>
      </nav>
      <div style={{maxWidth:900,margin:'0 auto',padding:'40px 24px'}}>
        {activeTab === 'plans' && (
          <>
            <div style={{textAlign:'center',marginBottom:32}}>
              <h2 style={{fontSize:28,fontWeight:800,color:'#0f172a',marginBottom:8}}>Simple, transparent pricing</h2>
              <p style={{fontSize:14,color:'#64748b'}}>Start free. Upgrade when you're ready.</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:16}}>
              {PLANS.map(plan => {
                const isCurrent = plan.id === currentPlan
                return (
                  <div key={plan.id} style={{borderRadius:14,border: plan.highlight ? '2px solid #7c3aed' : isCurrent ? '2px solid #059669' : '1px solid #e2e8f0',padding:22,background: plan.highlight ? '#f5f3ff' : isCurrent ? '#f0fdf4' : '#fff',position:'relative'}}>
                    {plan.highlight && !isCurrent && <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#7c3aed',color:'#fff',fontSize:10,fontWeight:700,padding:'3px 12px',borderRadius:10,whiteSpace:'nowrap'}}>Most Popular</div>}
                    {isCurrent && <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#059669',color:'#fff',fontSize:10,fontWeight:700,padding:'3px 12px',borderRadius:10,whiteSpace:'nowrap'}}>✓ Current</div>}
                    <p style={{fontSize:14,fontWeight:700,color:'#0f172a',marginBottom:2}}>{plan.name}</p>
                    <p style={{fontSize:11,color:'#64748b',marginBottom:10}}>{plan.desc}</p>
                    <div style={{display:'flex',alignItems:'baseline',gap:2,marginBottom:14}}>
                      <span style={{fontSize:28,fontWeight:800,color:'#0f172a'}}>{plan.price}</span>
                      <span style={{fontSize:11,color:'#94a3b8'}}>{plan.period}</span>
                    </div>
                    <button onClick={() => handleUpgrade(plan.id)} disabled={isCurrent || plan.id === 'free' || loading}
                      style={{width:'100%',padding:'9px',borderRadius:8,border:'none',
                        background: isCurrent ? '#059669' : plan.highlight ? '#7c3aed' : '#f8fafc',
                        color: isCurrent || plan.highlight ? '#fff' : '#7c3aed',
                        fontWeight:600,fontSize:12,cursor: isCurrent || plan.id === 'free' ? 'default' : 'pointer',
                        marginBottom:14,fontFamily:'Inter,sans-serif'}}>
                      {isCurrent ? '✓ Current plan' : plan.id === 'free' ? 'Free forever' : loading ? '...' : plan.cta}
                    </button>
                    <div style={{borderTop:'1px solid #e2e8f0',paddingTop:12}}>
                      {plan.features.map(f => (
                        <div key={f} style={{display:'flex',gap:8,marginBottom:6}}>
                          <span style={{color:'#7c3aed',fontSize:12}}>✓</span>
                          <span style={{fontSize:11,color:'#475569'}}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
        {activeTab === 'invoices' && (
          <div style={{background:'#fff',borderRadius:12,border:'1px solid #e2e8f0',padding:24}}>
            <h2 style={{fontSize:15,fontWeight:700,marginBottom:16}}>Invoice History</h2>
            {invoices.length === 0 ? (
              <p style={{fontSize:13,color:'#94a3b8'}}>No invoices yet.</p>
            ) : invoices.map((inv,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #f8fafc',fontSize:13}}>
                <span style={{color:'#475569'}}>{inv.date} — {inv.desc}</span>
                <div style={{display:'flex',gap:12,alignItems:'center'}}>
                  <span style={{fontWeight:600}}>{inv.amount}</span>
                  {inv.pdf && <a href={inv.pdf} target="_blank" rel="noopener noreferrer" style={{color:'#7c3aed',fontSize:11,fontWeight:600,textDecoration:'none'}}>↓ PDF</a>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
