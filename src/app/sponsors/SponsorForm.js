'use client'
import { useState } from 'react'
import styles from './page.module.css'

const SPONSOR_TYPES = [
  'Sponsored Article',
  'YouTube Integration',
  'Podcast Sponsorship',
  'Newsletter Sponsorship',
  'Social Media Campaign',
  'Full Brand Partnership',
  'Other',
]

const EMPTY = {
  name: '',
  email: '',
  company: '',
  subject: '',
  sponsorType: SPONSOR_TYPES[0],
  message: '',
  _honey: '',
}

export default function SponsorForm() {
  const [status, setStatus] = useState('idle')
  const [fields, setFields] = useState(EMPTY)

  function handleChange(e) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/sponsor', {
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
        <h3 className={styles.successHeading}>Inquiry Received!</h3>
        <p className={styles.successText}>
          Thanks for your interest in partnering with Yasmin Breakdown. We&rsquo;ll be in touch within 2 business days with our media kit and rate card.
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => { setStatus('idle'); setFields(EMPTY) }}
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.sponsorForm} noValidate>

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

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="sp-name">Name</label>
          <input
            id="sp-name"
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
          <label className={styles.label} htmlFor="sp-email">Email</label>
          <input
            id="sp-email"
            name="email"
            type="email"
            required
            value={fields.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="sp-company">Company / Brand</label>
          <input
            id="sp-company"
            name="company"
            type="text"
            required
            value={fields.company}
            onChange={handleChange}
            className={styles.input}
            placeholder="Company or brand name"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="sp-subject">Subject</label>
          <input
            id="sp-subject"
            name="subject"
            type="text"
            required
            value={fields.subject}
            onChange={handleChange}
            className={styles.input}
            placeholder="Brief subject line"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="sp-type">Type of Sponsorship</label>
        <select
          id="sp-type"
          name="sponsorType"
          value={fields.sponsorType}
          onChange={handleChange}
          className={styles.select}
        >
          {SPONSOR_TYPES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="sp-message">Message</label>
        <textarea
          id="sp-message"
          name="message"
          required
          value={fields.message}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="Tell us about your brand, goals, and target audience."
          rows={5}
        />
      </div>

      {status === 'error' && (
        <p className={styles.errorMsg}>
          Something went wrong. Please refresh the page and try again.
        </p>
      )}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Submit Sponsorship Inquiry'}
      </button>
    </form>
  )
}
