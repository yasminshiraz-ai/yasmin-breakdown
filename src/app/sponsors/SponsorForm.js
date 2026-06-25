'use client'
import { useState } from 'react'
import styles from './page.module.css'

const BUDGETS = [
  'Under $500',
  '$500 - $1,000',
  '$1,000 - $5,000',
  '$5,000+',
]

export default function SponsorForm() {
  const [status, setStatus] = useState('idle')
  const [fields, setFields] = useState({
    name: '', company: '', email: '', budget: BUDGETS[0], message: '',
  })

  function handleChange(e) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'sponsor-inquiry',
          ...fields,
        }).toString(),
      })
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
          Thanks for your interest in partnering with The Yasmin Breakdown. We&rsquo;ll be in touch within 2 business days with our media kit and rate card.
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => { setStatus('idle'); setFields({ name: '', company: '', email: '', budget: BUDGETS[0], message: '' }) }}
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  return (
    <form
      name="sponsor-inquiry"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={styles.sponsorForm}
    >
      <input type="hidden" name="form-name" value="sponsor-inquiry" />
      <input type="hidden" name="bot-field" />

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="sp-name">Your Name</label>
          <input
            id="sp-name"
            name="name"
            type="text"
            required
            value={fields.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Full name"
          />
        </div>
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
            placeholder="Company name"
          />
        </div>
      </div>

      <div className={styles.formRow}>
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
        <div className={styles.field}>
          <label className={styles.label} htmlFor="sp-budget">Monthly Budget</label>
          <select
            id="sp-budget"
            name="budget"
            value={fields.budget}
            onChange={handleChange}
            className={styles.select}
          >
            {BUDGETS.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="sp-message">Tell Us About Your Campaign</label>
        <textarea
          id="sp-message"
          name="message"
          required
          value={fields.message}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="What are your goals, target audience, and preferred sponsorship type?"
          rows={5}
        />
      </div>

      {status === 'error' && (
        <p className={styles.errorMsg}>
          Something went wrong. Please try again or email sponsors@yasminbreakdown.com directly.
        </p>
      )}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
      </button>
    </form>
  )
}
