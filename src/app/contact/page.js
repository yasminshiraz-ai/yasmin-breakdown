import ContactForm from './ContactForm'
import styles from './page.module.css'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with The Yasmin Breakdown.',
}

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Get in Touch</h1>

        <div className={styles.layout}>
          <div className={styles.formCol}>
            <ContactForm />
          </div>

          <div className={styles.infoCol}>
            <div className={styles.infoBox}>
              <h2 className={styles.infoHeading}>Direct Contact</h2>
              <p className={styles.infoText}>You can also reach us at:</p>
              <a
                href="mailto:hello@yasminbreakdown.com"
                className={styles.emailLink}
              >
                {/* Replace with Yasmin's real email address */}
                hello@yasminbreakdown.com
              </a>

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
