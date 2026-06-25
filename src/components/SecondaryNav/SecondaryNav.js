import Link from 'next/link'
import styles from './SecondaryNav.module.css'

export default function SecondaryNav() {
  const formId = process.env.MAILERLITE_FORM_ID
  const newsletterUrl = formId
    ? `https://dashboard.mailerlite.com/forms/${formId}`
    : null

  return (
    <div className={styles.bar}>
      <nav className={styles.inner} aria-label="Secondary navigation">
        <Link href="/about" className={styles.link}>About</Link>
        <Link href="/sponsors" className={styles.link}>Sponsors</Link>
        {newsletterUrl ? (
          <a
            href={newsletterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Newsletter
          </a>
        ) : (
          <Link href="/#newsletter" className={styles.link}>Newsletter</Link>
        )}
        <Link href="/contact" className={styles.link}>Contact</Link>
      </nav>
    </div>
  )
}
