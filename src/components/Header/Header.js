'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaYoutube, FaFacebook, FaPatreon } from 'react-icons/fa'
import LogoImage from '../LogoImage/LogoImage'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'Entertainment', href: '/entertainment' },
  { label: 'Sports', href: '/sports' },
  { label: 'Crime', href: '/crime' },
  { label: 'Society', href: '/society' },
  { label: 'History', href: '/history' },
  { label: 'Videos', href: '/videos' },
]

const SOCIAL_LINKS = [
  { Icon: FaYoutube, href: 'https://www.youtube.com/@YasminShiraz', label: 'YouTube' },
  { Icon: FaFacebook, href: 'https://www.facebook.com/yasminshiraz', label: 'Facebook' },
  { Icon: FaPatreon, href: 'https://www.patreon.com/c/yasminshiraz', label: 'Patreon' },
]

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

export default function Header({ patreonUrl = '#' }) {
  const pathname = usePathname()
  const [logoHeight, setLogoHeight] = useState(210)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setLogoHeight(mq.matches ? 80 : 210)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

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
          <button
            onClick={scrollToNewsletter}
            className={styles.socialLink}
            aria-label="Subscribe to newsletter"
            title="Subscribe to newsletter"
          >
            <MailIcon />
          </button>
        </div>

        <Link href="/" className={styles.logoLink} aria-label="Yasmin Breakdown — Home">
          <LogoImage height={logoHeight} src="/images/logo.svg" />
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
        </div>
      </nav>
    </header>
  )
}
