'use client'
import { useState } from 'react'
import styles from './LogoImage.module.css'

export default function LogoImage({ height = 60, src = '/images/logo.svg' }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <span className={styles.fallback} style={{ fontSize: height > 50 ? '1.4rem' : '1rem' }}>
        Yasmin Breakdown
      </span>
    )
  }

  return (
    <img
      src={src}
      alt="Yasmin Breakdown"
      style={{ display: 'block', height: `${height}px`, width: 'auto' }}
      onError={() => setError(true)}
    />
  )
}
