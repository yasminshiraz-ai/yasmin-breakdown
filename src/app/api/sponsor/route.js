import nodemailer from 'nodemailer'

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { name, email, company, subject, sponsorType, message, _honey } = body

  // Honeypot: bots fill this, humans never see it — silently accept to avoid bot fingerprinting
  if (_honey) return Response.json({ ok: true })

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 })
  }

  const user = process.env.ZOHO_SMTP_USER
  const pass = process.env.ZOHO_SMTP_PASSWORD

  if (!user || !pass) {
    console.error('ZOHO_SMTP_USER or ZOHO_SMTP_PASSWORD not configured')
    return Response.json({ error: 'Email not configured' }, { status: 503 })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `"Yasmin Breakdown" <${user}>`,
      to: 'team@yasminbreakdown.com',
      replyTo: email.trim(),
      subject: `[Sponsor Inquiry] ${subject?.trim() || sponsorType || 'New inquiry'} — from ${name.trim()}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\nSubject: ${subject || '—'}\nSponsorship Type: ${sponsorType || '—'}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || '—'}</p>
        <p><strong>Subject:</strong> ${subject || '—'}</p>
        <p><strong>Sponsorship Type:</strong> ${sponsorType || '—'}</p>
        <hr>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Sponsor form SMTP error:', err)
    return Response.json({ error: 'Failed to send' }, { status: 500 })
  }
}
