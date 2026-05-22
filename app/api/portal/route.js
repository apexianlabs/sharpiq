import { NextResponse } from 'next/server'
export async function POST(request) {
  try {
    const { user_id, email } = await request.json()
    const searchRes = await fetch(`https://api.stripe.com/v1/customers/search?query=metadata['user_id']:'${user_id}'&limit=1`, {
      headers: { 'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}` }
    })
    const searchData = await searchRes.json()
    let customerId = searchData?.data?.[0]?.id
    if (!customerId) {
      const createRes = await fetch('https://api.stripe.com/v1/customers', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, 'metadata[user_id]': user_id }).toString()
      })
      customerId = (await createRes.json()).id
    }
    const portalRes = await fetch('https://api.stripe.com/v1/billing_portal/sessions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ customer: customerId, return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing` }).toString()
    })
    const portalData = await portalRes.json()
    return NextResponse.json({ url: portalData.url })
  } catch(err) { return NextResponse.json({ error: err.message }, { status: 500 }) }
}
