import Image from 'next/image'
import styles from './page.module.css'

export const metadata = {
  title: 'Newsletter',
  description: 'Get the free Mindset Guide PDF and join The Yasmin Breakdown — weekly sociological analysis of culture, sports, music, and relationships delivered to your inbox.',
}

export default function NewsletterPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* What You'll Get — two image blocks */}
        <div className={styles.previewGrid}>
          <div className={styles.previewItem}>
            <div className={styles.imageWrap}>
              <Image
                src="/images/yasmin-breakdown-newsletter-preview.png"
                alt="Preview of The Yasmin Breakdown newsletter"
                width={1702}
                height={630}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority
              />
            </div>
            <p className={styles.caption}>The Newsletter</p>
          </div>

          <div className={styles.previewItem}>
            <div className={styles.imageWrap}>
              <Image
                src="/images/yasmin-shiraz-free-mindset-guide.png"
                alt="Free Mindset Guide by Yasmin Shiraz"
                width={600}
                height={600}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority
              />
            </div>
            <p className={styles.caption}>Your Free Gift</p>
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
