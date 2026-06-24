'use client'
import Link from 'next/link'
import LogoImage from '../LogoImage/LogoImage'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'Sports', href: '/sports' },
  { label: 'Music', href: '/music' },
  { label: 'TV & Film', href: '/tv-film' },
  { label: 'Love', href: '/love' },
  { label: 'History', href: '/history' },
]

// SVG icons as inline components to avoid additional deps
function PatreonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.19-3.22-7.19-7.18 0-3.97 3.22-7.21 7.19-7.21zM2 21.6h3.5V2.41H2V21.6z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

export default function Header({ patreonUrl = '#' }) {
  function scrollToNewsletter(e) {
    e.preventDefault()
    const section = document.getElementById('newsletter')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#newsletter'
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="The Yasmin Breakdown — Home">
          <LogoImage height={60} />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            href={patreonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconBtn}
            aria-label="Support on Patreon"
            title="Support on Patreon"
          >
            <PatreonIcon />
          </a>
          <button
            onClick={scrollToNewsletter}
            className={styles.iconBtn}
            aria-label="Subscribe to newsletter"
            title="Subscribe to newsletter"
          >
            <MailIcon />
          </button>
        </div>
      </div>
    </header>
  )
}
