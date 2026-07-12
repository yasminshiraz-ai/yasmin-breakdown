import ContactForm from './ContactForm'
import styles from './page.module.css'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with The Yasmin Breakdown.',
}

const TYPE_CONFIG = {
  'story-suggestion':   { heading: 'Story Suggestion',   defaultSubject: 'Story Suggestion' },
  'media-inquiry':      { heading: 'Media Inquiry',       defaultSubject: 'Media Inquiry' },
  'advertising-inquiry':{ heading: 'Advertising Inquiry', defaultSubject: 'Advertising Inquiry' },
}

export default function ContactPage({ searchParams }) {
  const config = TYPE_CONFIG[searchParams?.type] || {}

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Get in Touch</h1>

        <div className={styles.layout}>
          <div className={styles.formCol}>
            <ContactForm heading={config.heading} defaultSubject={config.defaultSubject} />
          </div>

          <div className={styles.infoCol}>
            <div className={styles.infoBox}>
              <div className={styles.infoDivider} />

              <h2 className={styles.infoHeading}>Response Time</h2>
              <p className={styles.infoText}>
                We aim to respond to all messages within 2 business days.
                For urgent press or media inquiries, please indicate that in the subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
