'use client'
import { useState } from 'react'
import Script from 'next/script'
import styles from './Newsletter.module.css'

// MailerLite embedded signup form.
// Set MAILERLITE_FORM_ID in .env.local to activate.
// The MailerLite universal script initializes ml('account', ...) automatically
// when you paste your Account ID below OR you can use the ml-embedded div approach.
//
// HOW TO WIRE UP:
// 1. Log in to MailerLite → Forms → Embedded
// 2. Create a form and copy the Form ID
// 3. Copy your Account ID from MailerLite → Integrations → API
// 4. Add to .env.local:
//      MAILERLITE_FORM_ID=your_form_id
//      MAILERLITE_API_KEY=your_api_key (for server-side use)
// 5. Replace REPLACE_WITH_YOUR_ACCOUNT_ID below with your MailerLite Account ID

const MAILERLITE_FORM_ID = process.env.NEXT_PUBLIC_MAILERLITE_FORM_ID || 'REPLACE_WITH_YOUR_FORM_ID'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    // Using MailerLite's JS API via the ml() function injected by the universal script
    if (typeof window !== 'undefined' && window.ml) {
      window.ml('show', MAILERLITE_FORM_ID, true)
      setStatus('success')
      return
    }

    // Fallback: direct API call via our own backend
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* MailerLite Universal JS — replace REPLACE_WITH_YOUR_ACCOUNT_ID */}
      <Script
        id="mailerlite-universal"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,e,u,f,l,n){
              w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};
              l=d.createElement(e),l.async=1,l.src=u,n=d.getElementsByTagName(e)[0],
              n.parentNode.insertBefore(l,n);
            })(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
            ml('account', 'REPLACE_WITH_YOUR_ACCOUNT_ID');
          `,
        }}
      />

      <section id="newsletter" className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.heading}>Get The Breakdown In Your Inbox</h2>
          <p className={styles.sub}>
            Sociological analysis of sports, music, love, and culture — straight to you, weekly.
          </p>

          {status === 'success' ? (
            <p className={styles.success}>You&apos;re in. Welcome to the Breakdown.</p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                className={styles.input}
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                className={styles.btn}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe Free'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className={styles.error}>Something went wrong. Try again.</p>
          )}

          <p className={styles.fine}>No spam. Unsubscribe any time.</p>

          {/* MailerLite embedded form target — activate by uncommenting and setting your form ID */}
          {/* <div className="ml-embedded" data-form={MAILERLITE_FORM_ID} /> */}
        </div>
      </section>
    </>
  )
}
