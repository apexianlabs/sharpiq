import { NextResponse } from 'next/server'
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get('user_id')
    if (!user_id) return NextResponse.json({ invoices: [] })
    const subRes = await fetch(`${process.env.DB_API_URL}/db/subscriptions/${user_id}/sharpiq`, {
      headers: { 'Authorization': `Bearer ${process.env.DB_API_KEY_SHARPIQ}` }
    })
    if (!subRes.ok) return NextResponse.json({ invoices: [] })
    const subData = await subRes.json()
    const customerId = subData?.data?.stripe_customer_id
    if (!customerId) return NextResponse.json({ invoices: [] })
    const stripeRes = await fetch(`https://api.stripe.com/v1/invoices?customer=${customerId}&limit=10`, {
      headers: { 'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}` }
    })
    const stripeData = await stripeRes.json()
    const invoices = (stripeData.data || []).filter(i => i.status !== 'draft').map(inv => ({
      date: new Date(inv.created * 1000).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
      desc: inv.lines?.data?.[0]?.description || 'SharpIQ subscription',
      amount: `$${(inv.amount_paid/100).toFixed(2)}`,
      status: inv.status === 'paid' ? 'Paid' : inv.status,
      pdf: inv.invoice_pdf
    }))
    return NextResponse.json({ invoices })
  } catch(err) { return NextResponse.json({ invoices: [] }) }
}
