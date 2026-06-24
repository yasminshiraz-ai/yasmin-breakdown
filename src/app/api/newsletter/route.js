// MailerLite API v3 subscriber endpoint.
// Used as fallback when MailerLite's embedded JS is not loaded.
// Requires MAILERLITE_API_KEY and MAILERLITE_FORM_ID in .env.local

export async function POST(request) {
  const apiKey = process.env.MAILERLITE_API_KEY
  const groupId = process.env.MAILERLITE_FORM_ID // use your MailerLite group/form ID

  if (!apiKey || apiKey === 'your_api_key_here') {
    return Response.json({ error: 'Newsletter not configured' }, { status: 503 })
  }

  const { email } = await request.json()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    const body = { email }
    if (groupId && groupId !== 'your_form_id_here') {
      body.groups = [groupId]
    }

    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('MailerLite error:', err)
      return Response.json({ error: 'Subscription failed' }, { status: 500 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Newsletter route error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
