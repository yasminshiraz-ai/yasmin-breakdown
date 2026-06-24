'use client'
import Image from 'next/image'
import { useState } from 'react'
import styles from './LogoImage.module.css'

export default function LogoImage({ height = 60 }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <span className={styles.fallback} style={{ fontSize: height > 50 ? '1.4rem' : '1rem' }}>
        The Yasmin Breakdown
      </span>
    )
  }

  return (
    <Image
      src="/images/logo.png"
      alt="The Yasmin Breakdown"
      width={240}
      height={height}
      style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }}
      onError={() => setError(true)}
      priority
    />
  )
}
