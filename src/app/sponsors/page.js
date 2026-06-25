import styles from './page.module.css'

export const metadata = {
  title: 'Sponsors',
  description: 'Partner with The Yasmin Breakdown and reach an engaged audience passionate about culture, sports, and sociological analysis.',
}

const STATS = [
  { label: 'Monthly Reach', value: '000,000+', note: 'across all platforms' },
  { label: 'YouTube Subscribers', value: '00,000+', note: 'and growing' },
  { label: 'Social Following', value: '00,000+', note: 'engaged followers' },
]

export default function SponsorsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Heading */}
        <div className={styles.hero}>
          <h1 className={styles.heading}>Partner with The Yasmin Breakdown</h1>
          <p className={styles.subheading}>
            Reach a highly engaged audience of readers and viewers who care deeply about culture,
            sports, music, history, and relationships — analyzed through a sociological lens.
          </p>
        </div>

        {/* Stat boxes */}
        <section className={styles.statsSection}>
          <h2 className={styles.sectionHeading}>By the Numbers</h2>
          <div className={styles.statsGrid}>
            {STATS.map(stat => (
              <div key={stat.label} className={styles.statBox}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statNote}>{stat.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* What we offer */}
        <section className={styles.offerSection}>
          <h2 className={styles.sectionHeading}>Sponsorship Opportunities</h2>
          <ul className={styles.offerList}>
            <li>Newsletter sponsorships — weekly email to a subscribed audience</li>
            <li>YouTube pre-roll and mid-roll integrations</li>
            <li>Sponsored article features with sociological framing</li>
            <li>Social media shoutouts and story placements</li>
            <li>Podcast sponsorships and host-read ads</li>
          </ul>
        </section>

        {/* Contact */}
        <section className={styles.contactSection}>
          <h2 className={styles.sectionHeading}>Get in Touch</h2>
          <p className={styles.contactText}>
            Interested in sponsoring? We&rsquo;d love to hear from you. Reach out directly:
          </p>
          <a
            href="mailto:sponsors@yasminbreakdown.com"
            className={styles.emailLink}
          >
            {/* Replace with Yasmin's real sponsorship email */}
            sponsors@yasminbreakdown.com
          </a>
          <p className={styles.contactNote}>
            We typically respond within 2 business days with a full media kit and rate card.
          </p>
        </section>

      </div>
    </div>
  )
}
