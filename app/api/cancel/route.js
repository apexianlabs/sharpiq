import { NextResponse } from 'next/server'
export async function POST(request) {
  try {
    const { user_id } = await request.json()
    const subRes = await fetch(`${process.env.DB_API_URL}/db/subscriptions/${user_id}/sharpiq`, {
      headers: { 'Authorization': `Bearer ${process.env.DB_API_KEY_SHARPIQ}` }
    })
    const subData = await subRes.json()
    const subscriptionId = subData?.data?.stripe_subscription_id
    if (!subscriptionId) return NextResponse.json({ error: 'No active subscription' }, { status: 404 })
    await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'cancel_at_period_end=true'
    })
    return NextResponse.json({ success: true })
  } catch(err) { return NextResponse.json({ error: err.message }, { status: 500 }) }
}
