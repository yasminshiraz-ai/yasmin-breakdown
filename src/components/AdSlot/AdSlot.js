import styles from './AdSlot.module.css'

export default function AdSlot({ slot = 'default' }) {
  return (
    <div
      className={`ad-slot ${styles.adSlot}`}
      data-slot={slot}
      aria-hidden="true"
    />
  )
}
