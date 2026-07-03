import styles from './page.module.css'

export const metadata = {
  title: 'Newsletter',
  description: 'Get the free Mindset Guide PDF and join The Yasmin Breakdown — weekly sociological analysis of culture, sports, music, and relationships delivered to your inbox.',
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
          <h1 className={styles.heading}>Get Your Free Mindset Guide</h1>
          <p className={styles.sub}>
            Subscribe and instantly receive the free Mindset Guide PDF — plus the weekly Yasmin
            Breakdown newsletter with sociological analysis of culture, sports, music, and
            relationships that you won&rsquo;t find anywhere else.
          </p>
        </div>

        {/* CTA */}
        <div className={styles.ctaWrap}>
          <a
            href="https://preview.mailerlite.io/forms/925592/172436536958125375/share"
            rel="noopener"
            className={styles.ctaBtn}
          >
            Sign Up &amp; Get The Guide
          </a>
          <p className={styles.fine}>No spam. Unsubscribe any time.</p>
        </div>

      </div>
    </div>
  )
}
