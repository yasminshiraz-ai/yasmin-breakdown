import styles from './page.module.css'
import NewsletterSignup from './NewsletterSignup'

export const metadata = {
  title: 'Newsletter',
  description: 'Subscribe to The Yasmin Breakdown and get a free digital guide — plus weekly sociological analysis of culture, sports, music, and relationships delivered to your inbox.',
}

export default function NewsletterPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Cover image area */}
        <div className={styles.coverWrap}>
          {/* TODO: Replace this placeholder div with a next/image component once the cover image is uploaded to /public/images/ */}
          <div className={styles.coverPlaceholder}>
            <span className={styles.coverLabel}>Newsletter Cover Coming Soon</span>
          </div>
        </div>

        {/* Headline + description */}
        <div className={styles.copy}>
          <h1 className={styles.heading}>Get The Free Guide + Join The Breakdown</h1>
          <p className={styles.sub}>
            Subscribe and instantly receive a free digital guide — plus the weekly Yasmin Breakdown
            newsletter with sociological analysis of culture, sports, music, and relationships
            that you won&rsquo;t find anywhere else.
          </p>
        </div>

        {/* Email capture */}
        <div className={styles.formWrap}>
          <NewsletterSignup />
          <p className={styles.fine}>No spam. Unsubscribe any time.</p>
        </div>

      </div>
    </div>
  )
}
