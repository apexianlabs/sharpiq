import Link from 'next/link'
export default function PrivacyPage() {
  return (
    <div style={{minHeight:'100vh',fontFamily:'Inter,sans-serif',background:'#fff'}}>
      <nav style={{borderBottom:'1px solid #e2e8f0',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/" style={{fontWeight:800,fontSize:16,color:'#0f172a',textDecoration:'none'}}>SharpIQ</Link>
        <Link href="/" style={{fontSize:13,color:'#64748b',textDecoration:'none'}}>← Back</Link>
      </nav>
      <div style={{maxWidth:680,margin:'0 auto',padding:'48px 24px'}}>
        <h1 style={{fontSize:28,fontWeight:800,color:'#0f172a',marginBottom:8}}>Privacy Policy</h1>
        <p style={{fontSize:13,color:'#94a3b8',marginBottom:32}}>Last updated: {new Date().toLocaleDateString('en-US',{month:'long',year:'numeric'})}</p>
        {[
          { title:'Information We Collect', body:'We collect information you provide when creating an account (name, email), and data generated through your use of the service. We do not sell your data.' },
          { title:'How We Use Your Information', body:'We use your information to provide and improve SharpIQ, send important service updates, and process payments. Your data is used solely to provide the service and is never shared with third parties.' },
          { title:'Data Security', body:'We use industry-standard encryption and security measures to protect your data. Your content is stored securely on our infrastructure.' },
          { title:'Data Retention', body:'We retain your data for as long as your account is active. You may request deletion of your account and data at any time by contacting support.' },
          { title:'Contact Us', body:'For privacy-related questions, contact us at privacy@sharpiq.app' },
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
