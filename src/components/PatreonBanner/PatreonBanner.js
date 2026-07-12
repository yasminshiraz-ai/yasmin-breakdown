'use client'
import { useState, useEffect } from 'react'
import styles from './PatreonBanner.module.css'

const STORAGE_KEY = 'patreon_banner_dismissed'

export default function PatreonBanner({ patreonUrl = 'https://patreon.com/c/yasminshiraz' }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="complementary" aria-label="Patreon membership">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.brandRow}>
            <img
              src="/images/patreon-symbol.png"
              alt=""
              aria-hidden="true"
              className={styles.patreonLogo}
            />
            <p className={styles.headline}>Get more from Yasmin Breakdown</p>
          </div>
          <p className={styles.sub}>Join our Patreon for exclusive content starting at $5/month</p>
        </div>
        <div className={styles.actions}>
          <a
            href={patreonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btn}
          >
            Membership options
          </a>
          <button
            className={styles.dismiss}
            onClick={dismiss}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
