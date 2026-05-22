import Link from 'next/link'

const FEATURES = [
  { icon: '⚡', title: 'AI-Powered in Seconds', desc: 'Claude AI generates professional results instantly — no templates, no blank pages, no wasted time.' },
  { icon: '📄', title: 'Export Ready', desc: 'Download as DOCX or PDF instantly. Ready to use, send, or customise to your brand.' },
  { icon: '📊', title: 'Track Everything', desc: 'Save your history, track performance, and improve over time from your personal dashboard.' },
  { icon: '🔒', title: 'Private & Secure', desc: 'Your data is encrypted and never shared. Everything stays between you and your clients.' },
]

const TESTIMONIALS = [
  { quote: 'SharpIQ saves me at least 3 hours a week. It handles the work I used to dread.', name: 'Sarah K.', role: 'Freelance Designer' },
  { quote: 'The quality is remarkable. I customise slightly and it\'s better than what I wrote myself.', name: 'James T.', role: 'Agency Owner' },
  { quote: 'Pays for itself with the first use. I don\'t know how I worked without it.', name: 'Maria L.', role: 'Marketing Consultant' },
]

export default function HomePage() {
  return (
    <div style={{minHeight:'100vh',fontFamily:'Inter,system-ui,sans-serif',background:'#fff',color:'#0f172a'}}>

      {/* Nav */}
      <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.92)',backdropFilter:'blur(12px)',borderBottom:'1px solid rgba(0,0,0,0.06)',padding:'0 24px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:30,height:30,borderRadius:8,background:'#7c3aed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:800,color:'#fff',letterSpacing:'-0.5px'}}>{{PRODUCT_NAME_INITIAL}}</div>
          <span style={{fontWeight:800,fontSize:17,color:'#0f172a',letterSpacing:'-0.3px'}}>SharpIQ</span>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <Link href="/login" style={{padding:'7px 16px',fontSize:13,color:'#64748b',textDecoration:'none',fontWeight:500,borderRadius:8}}>Sign in</Link>
          <Link href="/signup" style={{padding:'8px 18px',fontSize:13,background:'#7c3aed',color:'#fff',textDecoration:'none',borderRadius:8,fontWeight:600,letterSpacing:'-0.2px'}}>Start free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{padding:'96px 24px 80px',textAlign:'center',background:'linear-gradient(180deg,#fafbff 0%,#fff 60%)'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(0,0,0,0.04)',border:'1px solid rgba(0,0,0,0.08)',borderRadius:20,padding:'5px 14px',fontSize:12,color:'#64748b',fontWeight:600,marginBottom:24,letterSpacing:'0.02em',textTransform:'uppercase'}}>
          ✦ AI-Powered · Built for Professionals
        </div>
        <h1 style={{fontSize:'clamp(36px,5.5vw,64px)',fontWeight:900,lineHeight:1.05,letterSpacing:'-2px',marginBottom:20,maxWidth:760,margin:'0 auto 20px',color:'#0f172a'}}>
          {{PRODUCT_HEADLINE}}
        </h1>
        <p style={{fontSize:'clamp(16px,2vw,19px)',color:'#64748b',maxWidth:520,margin:'0 auto 36px',lineHeight:1.65,fontWeight:400}}>
          AI sports betting tracker and picks analyser
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:20}}>
          <Link href="/generate" style={{padding:'14px 28px',background:'#7c3aed',color:'#fff',textDecoration:'none',borderRadius:10,fontWeight:700,fontSize:15,letterSpacing:'-0.2px',boxShadow:'0 4px 14px rgba(0,0,0,0.15)'}}>
            Try it free →
          </Link>
          <Link href="/signup" style={{padding:'14px 28px',background:'#fff',color:'#0f172a',textDecoration:'none',borderRadius:10,fontWeight:600,fontSize:15,border:'1.5px solid #e2e8f0'}}>
            Create account
          </Link>
        </div>
        <p style={{fontSize:12,color:'#94a3b8',letterSpacing:'0.01em'}}>
          ✓ No credit card &nbsp;·&nbsp; ✓ 3 free uses &nbsp;·&nbsp; ✓ Setup in 30 seconds
        </p>

        {/* Product visual */}
        <div style={{maxWidth:860,margin:'56px auto 0',borderRadius:16,border:'1px solid #e8ecf0',boxShadow:'0 24px 64px rgba(0,0,0,0.08)',overflow:'hidden',background:'#fff'}}>
          <div style={{background:'#f8fafc',borderBottom:'1px solid #e8ecf0',padding:'12px 20px',display:'flex',alignItems:'center',gap:8}}>
            <div style={{display:'flex',gap:6}}>
              {['#fca5a5','#fde68a','#86efac'].map(c => <div key={c} style={{width:11,height:11,borderRadius:'50%',background:c}}/>)}
            </div>
            <div style={{flex:1,background:'#fff',borderRadius:6,height:26,margin:'0 12px',display:'flex',alignItems:'center',padding:'0 12px',border:'1px solid #e8ecf0'}}>
              <span style={{fontSize:11,color:'#94a3b8'}}>app.sharpiq.app/generate</span>
            </div>
          </div>
          <div style={{padding:'32px',background:'#fff',minHeight:200,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{width:'100%',maxWidth:600}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
                <div style={{background:'#f8fafc',borderRadius:10,border:'1px solid #e8ecf0',padding:20}}>
                  <p style={{fontSize:10,fontWeight:700,color:'#7c3aed',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:12}}>Input</p>
                  {['Client details','Project description','Requirements'].map((f,i) => (
                    <div key={i} style={{background:'#fff',border:'1px solid #e8ecf0',borderRadius:6,padding:'8px 10px',marginBottom:8,fontSize:12,color:'#64748b'}}>{f}</div>
                  ))}
                  <div style={{background:'#7c3aed',color:'#fff',borderRadius:7,padding:'9px',textAlign:'center',fontWeight:700,fontSize:12,marginTop:12}}>Generate →</div>
                </div>
                <div style={{background:'#f8fafc',borderRadius:10,border:'1px solid #e8ecf0',padding:20}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                    <p style={{fontSize:10,fontWeight:700,color:'#7c3aed',textTransform:'uppercase',letterSpacing:'0.06em'}}>Result</p>
                    <span style={{background:'#dcfce7',color:'#15803d',fontSize:9,fontWeight:700,padding:'2px 7px',borderRadius:8}}>Ready</span>
                  </div>
                  {['Professional output','Fully structured','Ready to use'].map((f,i) => (
                    <div key={i} style={{background:'#fff',border:'1px solid #e8ecf0',borderRadius:6,padding:'8px 10px',marginBottom:8,fontSize:12,color:'#374151',display:'flex',alignItems:'center',gap:6}}>
                      <span style={{color:'#7c3aed',fontSize:10}}>✓</span>{f}
                    </div>
                  ))}
                  <div style={{display:'flex',gap:8,marginTop:12}}>
                    <div style={{flex:1,background:'#7c3aed',color:'#fff',borderRadius:6,padding:'7px',textAlign:'center',fontSize:10,fontWeight:700}}>DOCX</div>
                    <div style={{flex:1,background:'#dc2626',color:'#fff',borderRadius:6,padding:'7px',textAlign:'center',fontSize:10,fontWeight:700}}>PDF</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section style={{padding:'20px 24px',borderTop:'1px solid #f1f5f9',borderBottom:'1px solid #f1f5f9',background:'#fafafa'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',gap:40,flexWrap:'wrap'}}>
          {[['2+ hrs','Saved per task'],['30 sec','To first result'],['3 free','No card needed']].map(([stat,label]) => (
            <div key={stat} style={{textAlign:'center'}}>
              <p style={{fontSize:22,fontWeight:800,color:'#7c3aed',letterSpacing:'-0.5px',marginBottom:2}}>{stat}</p>
              <p style={{fontSize:11,color:'#94a3b8',fontWeight:500}}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{padding:'80px 24px',maxWidth:1000,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:52}}>
          <p style={{fontSize:11,fontWeight:700,color:'#7c3aed',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:12}}>WHY {{PRODUCT_NAME_UPPER}}</p>
          <h2 style={{fontSize:'clamp(28px,4vw,42px)',fontWeight:800,letterSpacing:'-1px',marginBottom:12,color:'#0f172a'}}>
            Everything you need.<br/>Nothing you don't.
          </h2>
          <p style={{fontSize:16,color:'#64748b',maxWidth:460,margin:'0 auto'}}>Built for professionals who need results fast, not another tool to learn.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16}}>
          {FEATURES.map(f => (
            <div key={f.title} style={{background:'#fafafa',borderRadius:14,border:'1px solid #f1f5f9',padding:24,transition:'all 0.2s'}}>
              <div style={{width:40,height:40,borderRadius:10,background:'#fff',border:'1px solid #e8ecf0',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,marginBottom:14,boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>{f.icon}</div>
              <h3 style={{fontSize:14,fontWeight:700,color:'#0f172a',marginBottom:6,letterSpacing:'-0.2px'}}>{f.title}</h3>
              <p style={{fontSize:13,color:'#64748b',lineHeight:1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{padding:'80px 24px',background:'#0f172a'}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <p style={{fontSize:11,fontWeight:700,color:'#7c3aed',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:12}}>TRUSTED BY PROS</p>
            <h2 style={{fontSize:'clamp(28px,4vw,42px)',fontWeight:800,color:'#fff',letterSpacing:'-1px'}}>
              Real results from real users.
            </h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16}}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{background:'rgba(255,255,255,0.05)',borderRadius:14,border:'1px solid rgba(255,255,255,0.08)',padding:24}}>
                <div style={{color:'#fbbf24',fontSize:14,marginBottom:14,letterSpacing:'2px'}}>★★★★★</div>
                <p style={{fontSize:14,color:'#cbd5e1',lineHeight:1.7,marginBottom:16,fontStyle:'italic'}}>"{t.quote}"</p>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:32,height:32,borderRadius:'50%',background:'#7c3aed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#fff'}}>{t.name[0]}</div>
                  <div>
                    <p style={{fontSize:13,fontWeight:600,color:'#fff'}}>{t.name}</p>
                    <p style={{fontSize:11,color:'#64748b'}}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{padding:'80px 24px',maxWidth:900,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <p style={{fontSize:11,fontWeight:700,color:'#7c3aed',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:12}}>PRICING</p>
          <h2 style={{fontSize:'clamp(28px,4vw,42px)',fontWeight:800,letterSpacing:'-1px',marginBottom:8,color:'#0f172a'}}>
            Start free. Scale when ready.
          </h2>
          <p style={{fontSize:15,color:'#64748b'}}>One saved hour pays for months of SharpIQ.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:14}}>
          {[
            { name:'Free', price:'$0', desc:'Try it out', features:['3 uses/month','AI generation','Export results'], cta:'Get started', highlight:false },
            { name:'Starter', price:'$19', desc:'For solo pros', features:['50 uses/month','All features','Email support'], cta:'Start free trial', highlight:false },
            { name:'Pro', price:'$39', desc:'For agencies', features:['Unlimited','Priority support','API access'], cta:'Start free trial', highlight:true },
            { name:'Studio', price:'$99', desc:'For teams', features:['Unlimited','Team seats','Dedicated support'], cta:'Start free trial', highlight:false },
          ].map(plan => (
            <div key={plan.name} style={{borderRadius:14,border: plan.highlight ? '2px solid #7c3aed' : '1px solid #e8ecf0',padding:22,background: plan.highlight ? '#fafbff' : '#fff',position:'relative'}}>
              {plan.highlight && <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#7c3aed',color:'#fff',fontSize:10,fontWeight:700,padding:'3px 12px',borderRadius:10,whiteSpace:'nowrap',letterSpacing:'0.03em'}}>Most Popular</div>}
              <p style={{fontSize:14,fontWeight:700,color:'#0f172a',marginBottom:2,letterSpacing:'-0.2px'}}>{plan.name}</p>
              <p style={{fontSize:11,color:'#94a3b8',marginBottom:12}}>{plan.desc}</p>
              <div style={{display:'flex',alignItems:'baseline',gap:2,marginBottom:16}}>
                <span style={{fontSize:30,fontWeight:800,color:'#0f172a',letterSpacing:'-1px'}}>{plan.price}</span>
                <span style={{fontSize:12,color:'#94a3b8'}}>/mo</span>
              </div>
              <Link href="/signup" style={{display:'block',textAlign:'center',padding:'10px',borderRadius:8,
                background: plan.highlight ? '#7c3aed' : '#f8fafc',
                color: plan.highlight ? '#fff' : '#0f172a',
                textDecoration:'none',fontWeight:600,fontSize:12,marginBottom:14,
                border: plan.highlight ? 'none' : '1px solid #e8ecf0'}}>
                {plan.cta}
              </Link>
              <div style={{borderTop:'1px solid #f1f5f9',paddingTop:12}}>
                {plan.features.map(f => (
                  <div key={f} style={{display:'flex',gap:8,marginBottom:7,alignItems:'flex-start'}}>
                    <span style={{color:'#7c3aed',fontSize:12,marginTop:1,flexShrink:0}}>✓</span>
                    <span style={{fontSize:12,color:'#475569',lineHeight:1.4}}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{padding:'80px 24px',textAlign:'center',background:'linear-gradient(135deg,#7c3aed 0%,#7c3aeddd 100%)'}}>
        <h2 style={{fontSize:'clamp(26px,4vw,42px)',fontWeight:800,color:'#fff',letterSpacing:'-1px',marginBottom:12}}>
          Start saving time today.
        </h2>
        <p style={{fontSize:16,color:'rgba(255,255,255,0.8)',marginBottom:32,maxWidth:400,margin:'0 auto 32px'}}>
          Join professionals who use SharpIQ to work faster and earn more.
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:16}}>
          <Link href="/signup" style={{padding:'14px 28px',background:'#fff',color:'#7c3aed',textDecoration:'none',borderRadius:10,fontWeight:700,fontSize:15,letterSpacing:'-0.2px'}}>
            Start free →
          </Link>
          <Link href="/generate" style={{padding:'14px 28px',background:'rgba(255,255,255,0.15)',color:'#fff',textDecoration:'none',borderRadius:10,fontWeight:600,fontSize:15,border:'1px solid rgba(255,255,255,0.3)'}}>
            Try demo
          </Link>
        </div>
        <p style={{fontSize:12,color:'rgba(255,255,255,0.6)'}}>✓ No credit card &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ 3 free uses</p>
      </section>

      {/* Footer */}
      <footer style={{padding:'28px 24px',borderTop:'1px solid #f1f5f9',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12,background:'#fff'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:22,height:22,borderRadius:5,background:'#7c3aed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,color:'#fff'}}>{{PRODUCT_NAME_INITIAL}}</div>
          <span style={{fontWeight:700,fontSize:13,color:'#0f172a'}}>SharpIQ</span>
        </div>
        <p style={{fontSize:12,color:'#94a3b8'}}>© {new Date().getFullYear()} SharpIQ. Built on Claude AI.</p>
        <div style={{display:'flex',gap:20}}>
          {[['Privacy','/privacy'],['Terms','/terms'],['Support','/support']].map(([l,h]) => (
            <a key={l} href={h} style={{fontSize:12,color:'#64748b',textDecoration:'none'}}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
