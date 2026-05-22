'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const params = new URLSearchParams(hash.substring(1))
      const access_token = params.get('access_token')
      if (access_token) {
        fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/auth/me`, {
          headers: { 'Authorization': `Bearer ${access_token}` }
        })
        .then(r => r.json())
        .then(data => {
          const user = data?.data
          if (user) {
            document.cookie = `sha_token=${access_token}; path=/; max-age=2592000; SameSite=Lax`
            document.cookie = `sha_user=${encodeURIComponent(JSON.stringify({ id: user.id, email: user.email, name: user.full_name || '' }))}; path=/; max-age=2592000; SameSite=Lax`
          }
          router.push('/dashboard')
        })
        .catch(() => router.push('/login'))
      } else {
        router.push('/login')
      }
    } else {
      router.push('/dashboard')
    }
  }, [])

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter,sans-serif',background:'#f8fafc'}}>
      <div style={{textAlign:'center'}}>
        <div style={{width:40,height:40,border:'3px solid #7c3aed',borderTop:'3px solid transparent',borderRadius:'50%',margin:'0 auto 16px',animation:'spin 1s linear infinite'}}/>
        <p style={{color:'#64748b',fontSize:14}}>Signing you in...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
