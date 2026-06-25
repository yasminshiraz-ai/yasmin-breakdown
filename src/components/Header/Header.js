'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaYoutube, FaFacebook, FaPatreon } from 'react-icons/fa'
import LogoImage from '../LogoImage/LogoImage'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'Sports', href: '/sports' },
  { label: 'Music', href: '/music' },
  { label: 'TV & Film', href: '/tv-film' },
  { label: 'Relationships', href: '/relationships' },
  { label: 'History', href: '/history' },
  { label: 'Videos', href: '/videos' },
]

const SOCIAL_LINKS = [
  { Icon: FaYoutube, href: 'https://www.youtube.com/@YasminShiraz', label: 'YouTube' },
  { Icon: FaFacebook, href: 'https://www.facebook.com/yasminshiraz', label: 'Facebook' },
  { Icon: FaPatreon, href: 'https://www.patreon.com/c/yasminshiraz', label: 'Patreon' },
]

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
  const pathname = usePathname()

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
      {/* Social icons left, logo center, search right */}
      <div className={styles.logoRow}>
        <div className={styles.socialIcons}>
          {SOCIAL_LINKS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={label}
              title={label}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>

        <Link href="/" className={styles.logoLink} aria-label="The Yasmin Breakdown — Home">
          <LogoImage height={210} src="/images/logo.svg" />
        </Link>

        <div className={styles.searchWrap}>
          <SearchBar />
        </div>
      </div>

      {/* Nav bar */}
      <nav className={styles.navBar} aria-label="Main navigation">
        <div className={styles.navInner}>
          <div className={styles.navLinks}>
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

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
      </nav>
    </header>
  )
}
