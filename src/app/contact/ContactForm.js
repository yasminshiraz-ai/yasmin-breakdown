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

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [fields, setFields] = useState({
    name: '', email: '', subject: SUBJECTS[0], message: '',
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
          'form-name': 'contact',
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
        <h2 className={styles.successHeading}>Message Sent!</h2>
        <p className={styles.successText}>
          Thanks for reaching out. We&rsquo;ll get back to you within 2 business days.
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => { setStatus('idle'); setFields({ name: '', email: '', subject: SUBJECTS[0], message: '' }) }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      name="contact"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={styles.form}
    >
      {/* Netlify hidden fields */}
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />

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
          Something went wrong. Please try again or email us directly.
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
