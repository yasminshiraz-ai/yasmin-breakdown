import styles from './PatreonBanner.module.css'

export default function PatreonBanner({ patreonUrl = '#' }) {
  return (
    <div className={styles.banner}>
      <p className={styles.text}>
        Go deeper. Join the Breakdown on Patreon.
      </p>
      <a
        href={patreonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
      >
        Join Now
      </a>
    </div>
  )
}
