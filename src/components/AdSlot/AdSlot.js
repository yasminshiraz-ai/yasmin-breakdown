import styles from './AdSlot.module.css'

export default function AdSlot({ slot = 'default' }) {
  if (process.env.NEXT_PUBLIC_ADS_ENABLED !== 'true') return null
  return (
    <div
      className={`ad-slot ${styles.adSlot}`}
      data-slot={slot}
      aria-hidden="true"
    />
  )
}
