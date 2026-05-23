'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ name: '', email: '' })
  const COLOR = process.env.NEXT_PUBLIC_PRODUCT_COLOR || '#2563eb'

  useEffect(() => {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [key, val] = cookie.trim().split('=')
      if (val && key.includes('_user')) {
        try {
          const u = JSON.parse(decodeURIComponent(val))
          setUser(u)
          setForm({ name: u.name || '', email: u.email || '' })
        } catch(e) {}
      }
    }
  }, [])

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = () => {
    document.cookie.split(';').forEach(c => {
      document.cookie = c.trim().split('=')[0] + '=;max-age=0;path=/'
    })
    router.push('/login')
  }

  const inputStyle = { width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid #e2e8f0', fontSize:13, outline:'none', boxSizing:'border-box', background:'#fff', fontFamily:'Inter,Arial,sans-serif' }
  const labelStyle = { fontSize:12, fontWeight:600, color:'#475569', marginBottom:4, display:'block' }

  return (
    <div style={{minHeight:'100vh',background:'#f1f5f9',fontFamily:'Inter,Arial,sans-serif'}}>
      {/* Header */}
      <div style={{background:'#fff',borderBottom:'1px solid #e2e8f0',padding:'12px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/dashboard" style={{fontSize:13,color:'#64748b',textDecoration:'none',display:'flex',alignItems:'center',gap:6}}>
          ← Dashboard
        </Link>
        <h1 style={{fontSize:14,fontWeight:700,color:'#0f172a',margin:0}}>Settings</h1>
        <div style={{width:80}}/>
      </div>

      <div style={{maxWidth:560,margin:'0 auto',padding:'32px 20px'}}>

        {/* Profile */}
        <div style={{background:'#fff',borderRadius:12,border:'1px solid #e2e8f0',padding:'24px',marginBottom:16,boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
          <h2 style={{fontSize:14,fontWeight:700,color:'#0f172a',marginBottom:20}}>Profile</h2>
          <div style={{marginBottom:14}}>
            <label style={labelStyle}>Name</label>
            <input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name"/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} value={form.email} disabled placeholder="your@email.com" style={{...inputStyle, background:'#f8fafc', color:'#94a3b8'}}/>
            <p style={{fontSize:11,color:'#94a3b8',marginTop:4}}>Email cannot be changed</p>
          </div>
          <button onClick={handleSave} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'9px 20px',fontSize:13,fontWeight:700,cursor:'pointer'}}>
            {saved ? '✓ Saved!' : 'Save changes'}
          </button>
        </div>

        {/* Plan */}
        <div style={{background:'#fff',borderRadius:12,border:'1px solid #e2e8f0',padding:'24px',marginBottom:16,boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
          <h2 style={{fontSize:14,fontWeight:700,color:'#0f172a',marginBottom:16}}>Plan & Billing</h2>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 14px',background:'#f8fafc',borderRadius:8,border:'1px solid #e2e8f0',marginBottom:12}}>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:'#0f172a',textTransform:'capitalize'}}>{user?.plan || 'Free'} Plan</div>
              <div style={{fontSize:11,color:'#94a3b8',marginTop:2}}>Current subscription</div>
            </div>
            <Link href="/billing" style={{fontSize:12,fontWeight:700,color:'#2563eb',textDecoration:'none'}}>Manage →</Link>
          </div>
        </div>

        {/* Account */}
        <div style={{background:'#fff',borderRadius:12,border:'1px solid #e2e8f0',padding:'24px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
          <h2 style={{fontSize:14,fontWeight:700,color:'#0f172a',marginBottom:16}}>Account</h2>
          <button onClick={handleLogout} style={{display:'flex',alignItems:'center',gap:8,padding:'9px 16px',borderRadius:8,border:'1px solid #e2e8f0',background:'#fff',fontSize:13,fontWeight:600,color:'#64748b',cursor:'pointer',width:'100%'}}>
            Sign out
          </button>
        </div>

      </div>
    </div>
  )
}
