import styles from './InArticleBanner.module.css'

export default function InArticleBanner({ patreonUrl = 'https://patreon.com/c/yasminshiraz' }) {
  return (
    <div className={styles.banner}>
      <div className={styles.copy}>
        <p className={styles.headline}>Enjoying this breakdown?</p>
        <p className={styles.sub}>Join our Patreon for exclusive content starting at $5/month</p>
      </div>
      <a
        href={patreonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
      >
        Membership options
      </a>
    </div>
  )
}
