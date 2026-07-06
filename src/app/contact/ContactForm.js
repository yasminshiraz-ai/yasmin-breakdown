'use client'
import { useState } from 'react'
import styles from './page.module.css'

const SUBJECTS = [
  'General Inquiry',
  'Press & Media',
  'Sponsorship',
  'Booking',
  'Other',
]

const EMPTY = { name: '', email: '', subject: SUBJECTS[0], message: '', _honey: '' }

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [fields, setFields] = useState(EMPTY)

  function handleChange(e) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error('Send failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.successBox}>
        <h2 className={styles.successHeading}>Message Sent!</h2>
        <p className={styles.successText}>
          Thanks for reaching out. We&rsquo;ll get back to you within 2 business days.
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => { setStatus('idle'); setFields(EMPTY) }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>

      {/* Honeypot — hidden from humans, filled by bots */}
      <input
        type="text"
        name="_honey"
        value={fields._honey}
        onChange={handleChange}
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', opacity: 0, top: '-9999px', left: '-9999px', width: '1px', height: '1px' }}
      />

      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={fields.name}
          onChange={handleChange}
          className={styles.input}
          placeholder="Your full name"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={fields.email}
          onChange={handleChange}
          className={styles.input}
          placeholder="your@email.com"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="subject">Subject</label>
        <select
          id="subject"
          name="subject"
          value={fields.subject}
          onChange={handleChange}
          className={styles.select}
        >
          {SUBJECTS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          value={fields.message}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="Tell us what's on your mind..."
          rows={6}
        />
      </div>

      {status === 'error' && (
        <p className={styles.errorMsg}>
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
