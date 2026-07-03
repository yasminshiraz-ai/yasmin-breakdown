import Link from 'next/link'
import styles from './SecondaryNav.module.css'

export default function SecondaryNav() {
  return (
    <div className={styles.bar}>
      <nav className={styles.inner} aria-label="Secondary navigation">
        <Link href="/about" className={styles.link}>About</Link>
        <Link href="/sponsors" className={styles.link}>Sponsors</Link>
        <Link href="/newsletter" className={styles.link}>Newsletter</Link>
        <Link href="/contact" className={styles.link}>Contact</Link>
        <Link href="/privacy-policy" className={styles.link}>Privacy Policy</Link>
      </nav>
    </div>
  )
}
