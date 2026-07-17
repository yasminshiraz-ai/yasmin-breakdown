'use client'
import { useState, useEffect } from 'react'
import styles from './CookieConsent.module.css'

const STORAGE_KEY = 'cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' })
    }
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <p className={styles.text}>
        We use cookies to understand how readers engage with our content.{' '}
        <a href="/privacy-policy" className={styles.policyLink}>Privacy Policy</a>
      </p>
      <div className={styles.actions}>
        <button className={styles.accept} onClick={accept}>Accept</button>
        <button className={styles.decline} onClick={decline}>Decline</button>
      </div>
    </div>
  )
}
