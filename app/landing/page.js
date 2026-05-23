'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const Logo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sq1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a78bfa"/>
        <stop offset="100%" stopColor="#5b21b6"/>
      </linearGradient>
    </defs>
    <path d="M50 8 L92 50 L50 92 L8 50 Z" fill="url(#sq1)"/>
    <rect x="32" y="58" width="9" height="16" rx="2" fill="white" opacity="0.6"/>
    <rect x="45" y="46" width="9" height="28" rx="2" fill="white" opacity="0.8"/>
    <rect x="58" y="34" width="9" height="40" rx="2" fill="white" opacity="0.95"/>
    <path d="M30 65 L45 50 L60 38 L70 30" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [faqOpen, setFaqOpen]   = useState(null)
  const [activeTab, setActiveTab] = useState(0)

  const COLOR   = '#7c3aed'
  const NAME    = 'SharpIQ'
  const TAGLINE = 'AI sports betting tracker and analyser'
  const HEADLINE = 'Bet smarter with AI-powered analysis'
  const ITEM    = 'Analysis'
  const ITEMS   = 'Analyses'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const features = [
    { title: `AI-Powered ${ITEM} Generation`, desc: `Generate professional ${ITEMS.toLowerCase()} in under 60 seconds. AI writes it — you review and send.` },
    { title: 'Smart Dashboard', desc: `Track all your ${ITEMS.toLowerCase()} in one place with real-time status updates and AI insights.` },
    { title: 'AI Daily Briefing', desc: 'Start every day with an AI-generated summary of your pipeline and the one action that will have the biggest impact.' },
    { title: 'Revenue Intelligence', desc: 'Forecast your revenue based on active pipeline and historical performance. Know what is coming before it arrives.' },
    { title: 'Time Savings', desc: `Save 2+ hours per ${ITEM.toLowerCase()}. Stop doing manually what AI can do in seconds.` },
    { title: 'Cmd+K Command Palette', desc: 'Navigate your entire workspace at the speed of thought. Search, generate and act — without lifting your hands off the keyboard.' },
  ]

  const steps = [
    { n: '01', title: 'Describe your need', desc: `Enter the details of what you need. Takes under 30 seconds.` },
    { n: '02', title: `AI generates your ${ITEM.toLowerCase()}`, desc: `AI creates a fully structured, professional ${ITEM.toLowerCase()} tailored to your specific situation.` },
    { n: '03', title: 'Review and customise', desc: 'Every word is editable. Make it yours before you use it.' },
    { n: '04', title: 'Track and win', desc: `Monitor your ${ITEMS.toLowerCase()} in your live dashboard with AI-powered recommendations.` },
  ]

  const pricing = [
    { name: 'Starter', price: '$19', period: '/month', desc: 'For individuals starting out', features: [`3 ${ITEMS.toLowerCase()}/month`, 'AI generation', 'Dashboard tracking', 'Email support'], highlight: false },
    { name: 'Pro',     price: '$39', period: '/month', desc: 'For growing professionals',   features: [`Unlimited ${ITEMS.toLowerCase()}`, 'AI Daily Briefing', 'Revenue forecasting', 'Priority support', 'Cmd+K palette'], highlight: true },
    { name: 'Agency',  price: '$79', period: '/month', desc: 'For teams and agencies',      features: ['Everything in Pro', 'Team members', 'White-label output', 'Client portal', 'Dedicated support'], highlight: false },
  ]

  const faqs = [
    { q: `How long does it take to generate a ${ITEM.toLowerCase()}?`, a: `Under 60 seconds from entering your details to having a fully structured, professional ${ITEM.toLowerCase()} ready to review.` },
    { q: 'Can I customise the output?', a: 'Yes — everything is fully editable. AI gives you a strong starting point and you make it yours.' },
    { q: 'Is my data safe?', a: 'Yes. We use enterprise-grade encryption. Your data is stored securely and only accessible to you. We never share or sell your data.' },
    { q: `What happens when I hit the ${ITEM.toLowerCase()} limit on free?`, a: 'Upgrade to Pro at any time for unlimited usage. We never cut off access mid-session.' },
    { q: 'Does it work for all industries?', a: `Yes — ${NAME} works for any professional or service-based business.` },
  ]

  const metrics = [
    { value: '60s',  label: `Time to generate a ${ITEM.toLowerCase()}` },
    { value: '2h+',  label: 'Saved per session vs manual work' },
    { value: '10x',  label: 'Faster than doing it from scratch' },
    { value: '500+', label: 'Professionals using the platform' },
  ]

  return (
    <div style={{ fontFamily: 'Inter,Arial,sans-serif', background: '#fff', color: '#0f172a', overflowX: 'hidden' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .hero-1 { animation: fadeUp 0.7s ease forwards; }
        .hero-2 { animation: fadeUp 0.7s ease 0.12s both; }
        .hero-3 { animation: fadeUp 0.7s ease 0.24s both; }
        .hero-4 { animation: fadeUp 0.7s ease 0.36s both; }
        .feat-card:hover { border-color: #bfdbfe !important; box-shadow: 0 4px 20px rgba(37,99,235,0.08) !important; transform: translateY(-2px); }
        .feat-card { transition: all 0.2s; }
        .pricing-card:hover { transform: translateY(-3px); }
        .pricing-card { transition: all 0.2s; }
        @media (max-width: 640px) {
          .nav-link { display: none !important; }
          .hamburger { display: block !important; }
          nav a[href="/signup"] { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .metrics-grid { grid-template-columns: 1fr 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'all 0.25s',
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #e2e8f0' : 'none',
        padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <Logo size={28} color={COLOR} initial={NAME[0]} />
          <span style={{ fontSize: 15, fontWeight: 800, color: scrolled ? '#0f172a' : '#fff', letterSpacing: '-0.3px' }}>{NAME}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="#features" className="nav-link" style={{ fontSize: 13, color: scrolled ? '#475569' : 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: 500 }}>Features</a>
          <a href="#pricing" className="nav-link" style={{ fontSize: 13, color: scrolled ? '#475569' : 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: 500 }}>Pricing</a>
          <Link href="/login" className="nav-link" style={{ fontSize: 13, color: scrolled ? '#475569' : 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: 500 }}>Log in</Link>
          <Link href="/signup" style={{ background: COLOR, color: '#fff', padding: '7px 14px', borderRadius: 7, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Get started</Link>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: scrolled ? '#0f172a' : '#fff', fontSize: 20, lineHeight: 1 }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', top: 52, left: 0, right: 0, zIndex: 49, background: 'rgba(9,11,24,0.98)', backdropFilter: 'blur(20px)', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {['Features', 'Pricing'].map((l, i) => (
            <a key={i} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ fontSize: 15, color: '#e2e8f0', textDecoration: 'none', fontWeight: 500, padding: '12px 4px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{l}</a>
          ))}
          <Link href="/login" onClick={() => setMenuOpen(false)} style={{ fontSize: 15, color: '#e2e8f0', textDecoration: 'none', fontWeight: 500, padding: '12px 4px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Log in</Link>
          <Link href="/signup" onClick={() => setMenuOpen(false)} style={{ display: 'block', marginTop: 12, background: COLOR, color: '#fff', padding: '12px', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>Get started free</Link>
        </div>
      )}

      {/* Hero */}
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg,#070b1f 0%,#0d1f5c 45%,#070b1f 100%)'
      }}>
        <div style={{ position: 'absolute', top: '20%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: `${COLOR}09`, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(139,92,246,0.06)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 720, position: 'relative', zIndex: 1 }}>
          <div className="hero-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '5px 16px', marginBottom: 28 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#60a5fa', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, color: '#93c5fd', fontWeight: 600 }}>{NAME} AI · Built for professionals</span>
          </div>

          <h1 className="hero-2" style={{ fontSize: 'clamp(36px,5.5vw,62px)', fontWeight: 900, color: '#fff', lineHeight: 1.08, marginBottom: 20, letterSpacing: '-1.5px' }}>
            {HEADLINE}
          </h1>

          <p className="hero-3" style={{ fontSize: 'clamp(16px,2vw,19px)', color: '#94a3b8', lineHeight: 1.65, marginBottom: 40, maxWidth: 540, margin: '0 auto 40px' }}>
            {TAGLINE}
          </p>

          <div className="hero-4" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <Link href="/signup" style={{ background: `linear-gradient(135deg,${COLOR},${COLOR}cc)`, color: '#fff', padding: '13px 28px', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: `0 4px 24px ${COLOR}44` }}>
              Start free — no credit card
            </Link>
            <Link href="/login" style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', padding: '13px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
              Log in
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Free plan included', 'No credit card', '60-second setup'].map((t, i) => (
              <span key={i} style={{ fontSize: 12, color: '#475569', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ background: '#0a0f2e', padding: '32px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, textAlign: 'center' }} className="metrics-grid">
          {metrics.map((m, i) => (
            <div key={i}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#60a5fa', letterSpacing: '-1px', marginBottom: 4 }}>{m.value}</div>
              <div style={{ fontSize: 12, color: '#334155', fontWeight: 500, lineHeight: 1.4 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div id="features" style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, color: '#0f172a', marginBottom: 10, letterSpacing: '-0.5px' }}>Everything you need to work smarter</h2>
            <p style={{ fontSize: 15, color: '#64748b', maxWidth: 440, margin: '0 auto' }}>Built for professionals who want to spend less time on admin and more time on work that matters.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 20 }} className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feat-card" style={{ background: '#fff', borderRadius: 14, padding: '24px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: `${COLOR}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: COLOR }} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(26px,4vw,36px)', fontWeight: 800, color: '#0f172a', marginBottom: 10, letterSpacing: '-0.5px' }}>Up and running in minutes</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 28 }} className="steps-grid">
            {steps.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 34, fontWeight: 900, color: '#e2e8f0', lineHeight: 1, marginBottom: 10 }}>{s.n}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(26px,4vw,36px)', fontWeight: 800, color: '#0f172a', marginBottom: 10, letterSpacing: '-0.5px' }}>Simple pricing. No surprises.</h2>
            <p style={{ fontSize: 15, color: '#64748b' }}>Start free. Upgrade when you are ready.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, alignItems: 'center' }} className="pricing-grid">
            {pricing.map((p, i) => (
              <div key={i} className="pricing-card" style={{
                borderRadius: 16, padding: '28px 24px', position: 'relative',
                background: p.highlight ? 'linear-gradient(145deg,#1a3a8f,#1a1040)' : '#fff',
                border: p.highlight ? 'none' : '1px solid #e2e8f0',
                boxShadow: p.highlight ? `0 20px 60px ${COLOR}40, 0 0 0 1px rgba(99,102,241,0.2)` : '0 1px 4px rgba(0,0,0,0.04)',
                transform: p.highlight ? 'scale(1.04)' : 'none'
              }}>
                {p.highlight && (
                  <>
                    <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.6),transparent)' }} />
                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg,${COLOR},#8b5cf6)`, color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 20, whiteSpace: 'nowrap' }}>MOST POPULAR</div>
                  </>
                )}
                <div style={{ fontSize: 12, fontWeight: 600, color: p.highlight ? '#93c5fd' : '#64748b', marginBottom: 6 }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
                  <span style={{ fontSize: 38, fontWeight: 900, color: p.highlight ? '#fff' : '#0f172a', letterSpacing: '-1px' }}>{p.price}</span>
                  <span style={{ fontSize: 13, color: p.highlight ? '#93c5fd' : '#94a3b8' }}>{p.period}</span>
                </div>
                <div style={{ fontSize: 13, color: p.highlight ? '#bfdbfe' : '#64748b', marginBottom: 22 }}>{p.desc}</div>
                <div style={{ marginBottom: 24 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                      <span style={{ color: p.highlight ? '#60a5fa' : '#16a34a', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 13, color: p.highlight ? '#e0f2fe' : '#334155' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/signup" style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: 9, background: p.highlight ? 'rgba(255,255,255,0.14)' : COLOR, color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 700, border: p.highlight ? '1px solid rgba(255,255,255,0.18)' : 'none' }}>
                  Start free trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 620, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px,3vw,34px)', fontWeight: 800, color: '#0f172a', marginBottom: 40, textAlign: 'center', letterSpacing: '-0.5px' }}>Questions answered</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{ width: '100%', textAlign: 'left', padding: '17px 0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{faq.q}</span>
                <span style={{ fontSize: 18, color: '#94a3b8', flexShrink: 0, transition: 'transform 0.2s', transform: faqOpen === i ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
              </button>
              {faqOpen === i && <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, paddingBottom: 16 }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '80px 24px', background: 'linear-gradient(135deg,#070b1f,#0d1f5c)', textAlign: 'center' }}>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Logo size={44} color={COLOR} initial={NAME[0]} />
          </div>
          <h2 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 900, color: '#fff', marginBottom: 12, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
            Start working smarter today
          </h2>
          <p style={{ fontSize: 15, color: '#475569', marginBottom: 32, lineHeight: 1.6 }}>
            Join professionals using {NAME} to save time, work smarter and get better results.
          </p>
          <Link href="/signup" style={{ background: `linear-gradient(135deg,${COLOR},${COLOR}cc)`, color: '#fff', padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: `0 4px 24px ${COLOR}44`, display: 'inline-block' }}>
            Start free
          </Link>
          <p style={{ fontSize: 12, color: '#334155', marginTop: 14 }}>No credit card required</p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#030712', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Logo size={22} color={COLOR} initial={NAME[0]} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{NAME}</span>
        </div>
        <span style={{ fontSize: 12, color: '#1e293b' }}>© 2026 {NAME}</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'Support'].map(l => (
            <a key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: 12, color: '#1e293b', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
