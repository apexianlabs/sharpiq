import Link from 'next/link'
export default function SupportPage() {
  return (
    <div style={{minHeight:'100vh',fontFamily:'Inter,sans-serif',background:'#fff'}}>
      <nav style={{borderBottom:'1px solid #e2e8f0',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/" style={{fontWeight:800,fontSize:16,color:'#0f172a',textDecoration:'none'}}>SharpIQ</Link>
        <Link href="/" style={{fontSize:13,color:'#64748b',textDecoration:'none'}}>← Back</Link>
      </nav>
      <div style={{maxWidth:680,margin:'0 auto',padding:'48px 24px'}}>
        <h1 style={{fontSize:28,fontWeight:800,color:'#0f172a',marginBottom:8}}>Support</h1>
        <p style={{fontSize:15,color:'#64748b',marginBottom:32}}>We're here to help. Reach out and we'll get back to you within 24 hours.</p>
        <div style={{background:'#f8fafc',borderRadius:12,padding:24,marginBottom:16,border:'1px solid #e2e8f0'}}>
          <h2 style={{fontSize:15,fontWeight:700,color:'#0f172a',marginBottom:8}}>Contact Support</h2>
          <p style={{fontSize:13,color:'#475569'}}>Email us at <strong>support@sharpiq.app</strong> and we'll respond within 24 hours.</p>
        </div>
        <div style={{background:'#f0f4ff',borderRadius:12,padding:24,border:'1px solid #bfdbfe'}}>
          <h2 style={{fontSize:15,fontWeight:700,color:'#7c3aed',marginBottom:8}}>Getting Started</h2>
          <p style={{fontSize:13,color:'#475569',lineHeight:1.6}}>SharpIQ is designed to be simple. If you run into any issues, our team is ready to help you get the most out of the product.</p>
        </div>
      </div>
    </div>
  )
}
