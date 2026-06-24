import styles from './BreakingNewsTicker.module.css'

export default function BreakingNewsTicker({ headlines = [] }) {
  if (!headlines.length) return null
  const repeated = [...headlines, ...headlines] // duplicate for seamless loop

  return (
    <div className={styles.bar} aria-label="Breaking news ticker">
      <span className={styles.label}>BREAKING</span>
      <div className={styles.track}>
        <div className={styles.inner}>
          {repeated.map((h, i) => (
            <span key={i} className={styles.item}>
              {h}
              <span className={styles.divider}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
