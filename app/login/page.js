'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Logo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#5b21b6"/></linearGradient></defs>
    <path d="M50 8 L92 50 L50 92 L8 50 Z" fill="url(#lg)"/>
    <rect x="32" y="58" width="9" height="16" rx="2" fill="white" opacity="0.6"/>
    <rect x="45" y="46" width="9" height="28" rx="2" fill="white" opacity="0.8"/>
    <rect x="58" y="34" width="9" height="40" rx="2" fill="white" opacity="0.95"/>
    <path d="M30 65 L45 50 L60 38 L70 30" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)


const GOOGLE_AUTH_URL = `https://wdeilbhnsdlmckovicqy.supabase.co/auth/v1/authorize?provider=google&redirect_to=https%3A%2F%2Fapp.sharpiq.app%2Fauth%2Fcallback&scopes=email+profile`

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab]         = useState('login')
  const [form, setForm]       = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    setError('')
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    if (tab === 'signup' && !form.name) { setError('Please enter your name.'); return }
    setLoading(true)
    try {
      const endpoint = tab === 'login' ? '/auth/signin' : '/auth/signup'
      const body = tab === 'login'
        ? { email: form.email, password: form.password, product: 'sharpiq' }
        : { email: form.email, password: form.password, full_name: form.name, source_product: 'sharpiq' }
      const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message || data.error || 'Authentication failed.'); setLoading(false); return }
      const token = data.data?.token || data.token
      const user  = data.data?.user  || data.user
      if (!token) { setError('No token received.'); setLoading(false); return }
      let fullName = form.name || user.full_name || ''
      try {
        const profileRes = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const profileData = await profileRes.json()
        fullName = profileData?.data?.full_name || fullName
      } catch(e) {}
      document.cookie = `sha_token=${token}; path=/; max-age=2592000; SameSite=Lax`
      document.cookie = `sha_user=${encodeURIComponent(JSON.stringify({ id: user.id, email: user.email, name: fullName }))}; path=/; max-age=2592000; SameSite=Lax`
      
      // Send welcome email on signup
      if (tab === 'signup') {
        fetch(`${process.env.NEXT_PUBLIC_DB_API_URL}/email/welcome`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DB_API_KEY}` },
          body: JSON.stringify({ product: 'sharpiq', to: form.email, name: fullName, email: form.email })
        }).catch(() => {}) // fire and forget
      }
      
      router.push('/dashboard')
    } catch(err) {
      setError('Authentication failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const leftPanel = (
    <div style={{width:420,flexShrink:0,background:'#7c3aed',display:'flex',flexDirection:'column',padding:'40px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:-80,right:-60,width:280,height:280,borderRadius:'50%',background:'rgba(255,255,255,0.08)'}}/>
      <Link href="/" style={{display:'flex',alignItems:'center',gap:10,marginBottom:48,zIndex:1,textDecoration:'none'}}>
        <Logo size={36}/>
        <span style={{fontSize:20,fontWeight:800,color:'#fff'}}>SharpIQ</span>
      </Link>
      <div style={{zIndex:1,marginBottom:40}}>
        <h1 style={{fontSize:28,fontWeight:800,color:'#fff',lineHeight:1.2,marginBottom:12}}>
          {tab === 'login' ? 'Welcome back.' : 'Get started today.'}
        </h1>
        <p style={{fontSize:14,color:'rgba(255,255,255,0.7)',lineHeight:1.6}}>AI sports betting tracker and picks analyser</p>
      </div>
      <div style={{zIndex:1,marginTop:'auto',background:'rgba(255,255,255,0.1)',borderRadius:12,padding:20,border:'1px solid rgba(255,255,255,0.15)'}}>
        <p style={{fontSize:13,color:'rgba(255,255,255,0.9)',lineHeight:1.6,marginBottom:10,fontStyle:'italic'}}>"SharpIQ saves me hours every week."</p>
        <p style={{fontSize:12,color:'rgba(255,255,255,0.6)',fontWeight:500}}>— Beta User</p>
      </div>
    </div>
  )

  const inputStyle = {width:'100%',padding:'11px 14px',border:'1px solid #e2e8f0',borderRadius:10,fontSize:14,color:'#0f172a',background:'#fff',outline:'none',fontFamily:'Inter,sans-serif',boxSizing:'border-box'}

  return (
    <div style={{minHeight:'100vh',display:'flex',fontFamily:'Inter,sans-serif',background:'#fff'}}>
      {!isMobile && leftPanel}
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'32px 24px',minHeight:'100vh'}}>
        <div style={{width:'100%',maxWidth:400}}>
          {isMobile && (
            <Link href="/" style={{display:'flex',alignItems:'center',gap:8,marginBottom:24,textDecoration:'none',justifyContent:'center'}}>
              <Logo size={36}/>
              <span style={{fontWeight:800,fontSize:18,color:'#0f172a'}}>SharpIQ</span>
            </Link>
          )}
          <div style={{display:'flex',background:'#f1f5f9',borderRadius:10,padding:4,marginBottom:24}}>
            {['login','signup'].map(t => (
              <button key={t} onClick={() => { setTab(t); setError('') }}
                style={{flex:1,padding:'9px 16px',borderRadius:7,border:'none',fontSize:14,fontWeight:600,cursor:'pointer',
                  background: tab === t ? '#fff' : 'transparent',
                  color: tab === t ? '#0f172a' : '#64748b',
                  boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'}}>
                {t === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>
          <h2 style={{fontSize:22,fontWeight:800,color:'#0f172a',marginBottom:4}}>
            {tab === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p style={{fontSize:14,color:'#64748b',marginBottom:20}}>
            {tab === 'login' ? `Sign in to your SharpIQ account.` : 'Start your free trial today.'}
          </p>
          {error && <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:8,padding:'10px 14px',fontSize:13,color:'#dc2626',marginBottom:16}}>{error}</div>}
          {tab === 'signup' && (
            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,fontWeight:600,color:'#475569',display:'block',marginBottom:5}}>Full Name</label>
              <input name="name" type="text" placeholder="Enter your full name" value={form.name} onChange={handleChange} style={inputStyle}/>
            </div>
          )}
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12,fontWeight:600,color:'#475569',display:'block',marginBottom:5}}>Email Address</label>
            <input name="email" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange} style={inputStyle}/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{fontSize:12,fontWeight:600,color:'#475569',display:'block',marginBottom:5}}>Password</label>
            <input name="password" type="password" placeholder={tab === 'signup' ? 'Min 8 characters' : 'Enter your password'} value={form.password} onChange={handleChange} onKeyDown={e => e.key === 'Enter' && handleSubmit()} style={inputStyle}/>
          </div>
          <button onClick={handleSubmit} disabled={loading}
            style={{width:'100%',padding:13,borderRadius:10,border:'none',background:'#7c3aed',color:'#fff',fontSize:15,fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif',marginBottom:16,opacity:loading?0.7:1}}>
            {loading ? 'Please wait...' : tab === 'login' ? 'Log In →' : 'Create Account →'}
          </button>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
            <div style={{flex:1,height:1,background:'#e2e8f0'}}/>
            <span style={{fontSize:12,color:'#94a3b8',fontWeight:500}}>OR</span>
            <div style={{flex:1,height:1,background:'#e2e8f0'}}/>
          </div>
          <a href={GOOGLE_AUTH_URL}
            style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:10,padding:12,borderRadius:10,border:'1px solid #e2e8f0',background:'#fff',fontSize:14,fontWeight:500,color:'#0f172a',textDecoration:'none',boxSizing:'border-box',marginBottom:16}}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            {tab === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
          </a>
          <p style={{fontSize:12,color:'#94a3b8',textAlign:'center'}}>Your data is secure and encrypted.</p>
        </div>
      </div>
    </div>
  )
}
