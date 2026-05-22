import Link from 'next/link'
export default function TermsPage() {
  return (
    <div style={{minHeight:'100vh',fontFamily:'Inter,sans-serif',background:'#fff'}}>
      <nav style={{borderBottom:'1px solid #e2e8f0',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/" style={{fontWeight:800,fontSize:16,color:'#0f172a',textDecoration:'none'}}>SharpIQ</Link>
        <Link href="/" style={{fontSize:13,color:'#64748b',textDecoration:'none'}}>← Back</Link>
      </nav>
      <div style={{maxWidth:680,margin:'0 auto',padding:'48px 24px'}}>
        <h1 style={{fontSize:28,fontWeight:800,color:'#0f172a',marginBottom:8}}>Terms of Service</h1>
        <p style={{fontSize:13,color:'#94a3b8',marginBottom:32}}>Last updated: {new Date().toLocaleDateString('en-US',{month:'long',year:'numeric'})}</p>
        {[
          { title:'Acceptance of Terms', body:'By using SharpIQ, you agree to these terms. If you do not agree, please do not use the service.' },
          { title:'Use of Service', body:'SharpIQ provides AI-powered tools for professional use. You may use the service for lawful business purposes only. You are responsible for the content you input.' },
          { title:'Subscription & Billing', body:'Paid plans are billed monthly. You may cancel at any time. Refunds are not provided for partial months. Free plan usage is subject to limits.' },
          { title:'Intellectual Property', body:'You retain ownership of content you create using SharpIQ. We retain ownership of the SharpIQ platform, software, and AI models.' },
          { title:'Limitation of Liability', body:'SharpIQ is provided as-is. We are not liable for any indirect, incidental, or consequential damages arising from use of the service.' },
          { title:'Contact', body:'For questions about these terms, contact legal@sharpiq.app' },
        ].map(s => (
          <div key={s.title} style={{marginBottom:28}}>
            <h2 style={{fontSize:16,fontWeight:700,color:'#0f172a',marginBottom:8}}>{s.title}</h2>
            <p style={{fontSize:14,color:'#475569',lineHeight:1.7}}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
