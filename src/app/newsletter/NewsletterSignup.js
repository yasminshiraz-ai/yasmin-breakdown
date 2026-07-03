'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

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

  if (status === 'success') {
    return <p className={styles.success}>You&rsquo;re in! Check your inbox for your free download.</p>
  }

  return (
    <>
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
          {status === 'loading' ? 'Subscribing…' : 'Get The Free Guide'}
        </button>
      </form>

      {status === 'error' && (
        <p className={styles.error}>Something went wrong. Please try again.</p>
      )}
    </>
  )
}
