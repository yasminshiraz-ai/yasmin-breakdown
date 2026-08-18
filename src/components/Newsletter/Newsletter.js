'use client'
import { useState } from 'react'
import styles from './Newsletter.module.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setErrorMsg('')

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
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data.error || 'Something went wrong. Try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Something went wrong. Try again.')
      setStatus('error')
    }
  }

  return (
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
          <p className={styles.error}>{errorMsg}</p>
        )}

        <p className={styles.fine}>No spam. Unsubscribe any time.</p>
      </div>
    </section>
  )
}
