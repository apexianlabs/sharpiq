import { NextResponse } from 'next/server'
const PRICE_IDS = {
  starter: process.env.STRIPE_STARTER_PRICE_ID,
  pro:     process.env.STRIPE_PRO_PRICE_ID,
  agency:  process.env.STRIPE_AGENCY_PRICE_ID,
  studio:  process.env.STRIPE_STUDIO_PRICE_ID,
}
export async function POST(request) {
  try {
    const { plan } = await request.json()
    const priceId = PRICE_IDS[plan]
    if (!priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    let userId = '', userEmail = ''
    if (token) {
      try {
        const profileRes = await fetch(`${process.env.AUTH_API_URL}/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const profileData = await profileRes.json()
        userId = profileData?.data?.id || ''
        userEmail = profileData?.data?.email || ''
      } catch(e) {}
    }
    const params = new URLSearchParams({
      mode: 'subscription',
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      'subscription_data[trial_period_days]': '14',
      'subscription_data[metadata][user_id]': userId,
      'subscription_data[metadata][product]': 'sharpiq',
      'subscription_data[metadata][plan]': plan,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
      customer_email: userEmail,
    })
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
    const session = await res.json()
    if (!res.ok) return NextResponse.json({ error: session.error?.message }, { status: 400 })
    return NextResponse.json({ url: session.url })
  } catch(err) { return NextResponse.json({ error: err.message }, { status: 500 }) }
}
