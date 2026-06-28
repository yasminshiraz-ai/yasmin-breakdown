import SponsorForm from './SponsorForm'
import styles from './page.module.css'

export const metadata = {
  title: 'Partner With Us — The Yasmin Breakdown',
  description: 'Partner with The Yasmin Breakdown and reach a highly engaged, culturally conscious audience.',
}

const OFFER_ITEMS = [
  'Sponsored Yasmin Breakdown Post featuring Your Brand or Story',
  'YouTube Integrations',
  'Podcast Sponsorships',
  'Newsletter Sponsorships',
  'Social Media Campaigns',
  'Full Brand Partnerships',
]

export default function SponsorsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.hero}>
          <h1 className={styles.heading}>Partner with the Yasmin Breakdown</h1>
          <p className={styles.subheading}>Reaching the culture. Reaching the conversation.</p>
        </div>

        <section className={styles.introSection}>
          <p className={styles.introText}>
            The Yasmin Breakdown is a premium media brand delivering sociological analysis of hip hop, Black history, sports, and entertainment to a highly engaged, culturally conscious audience.
          </p>
          <p className={styles.introText}>
            Our audience doesn&rsquo;t just consume content &mdash; they share it, discuss it, and act on it. They are tastemakers, thought leaders, and loyal brand advocates.
          </p>
        </section>

        <section className={styles.offerSection}>
          <h2 className={styles.sectionHeading}>What We Offer</h2>
          <div className={styles.pillGrid}>
            {OFFER_ITEMS.map(item => (
              <span key={item} className={styles.pill}>{item}</span>
            ))}
          </div>
        </section>

        <section className={styles.whoSection}>
          <h2 className={styles.sectionHeading}>Who We Work With</h2>
          <p className={styles.whoText}>
            We partner with brands that respect Black culture, support women in media, and want to reach an audience that pays attention.
          </p>
        </section>

        <section className={styles.contactSection}>
          <h2 className={styles.sectionHeading}>Let&rsquo;s Work Together</h2>
          <SponsorForm />
        </section>

      </div>
    </div>
  )
}
