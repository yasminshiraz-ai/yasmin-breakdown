import Link from 'next/link'
import LogoImage from '../LogoImage/LogoImage'
import { FaYoutube, FaFacebook, FaInstagram, FaPatreon } from 'react-icons/fa'
import { FaThreads } from 'react-icons/fa6'
import { SiApplepodcasts } from 'react-icons/si'
import styles from './Footer.module.css'

const NAV_LINKS = [
  { label: 'Sports', href: '/sports' },
  { label: 'Music', href: '/music' },
  { label: 'TV & Film', href: '/tv-film' },
  { label: 'Relationships', href: '/relationships' },
  { label: 'History', href: '/history' },
]

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Newsletter', href: '/#newsletter' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
]

const SOCIAL = [
  { label: 'YouTube', href: 'https://www.youtube.com/@YasminShiraz', Icon: FaYoutube },
  { label: 'Facebook', href: 'https://www.facebook.com/yasminshiraz', Icon: FaFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/empowerwithyasmin', Icon: FaInstagram },
  { label: 'Threads', href: 'https://www.threads.com/empowerwithyasmin', Icon: FaThreads },
  { label: 'Patreon', href: 'https://www.patreon.com/c/yasminshiraz', Icon: FaPatreon },
  { label: 'Apple Podcasts', href: 'https://podcasts.apple.com/us/podcast/the-yasmin-breakdown/id1884706158', Icon: SiApplepodcasts },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Link href="/" className={styles.logoWrap} aria-label="Home">
            <LogoImage height={40} />
          </Link>

          <nav className={styles.nav} aria-label="Footer navigation">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.social}>
            {SOCIAL.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.secondary}>
          <nav className={styles.companyNav} aria-label="Company links">
            {COMPANY_LINKS.map(link => (
              <Link key={link.href} href={link.href} className={styles.companyLink}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {year} The Yasmin Breakdown. All rights reserved.
          </p>
          <p className={styles.tagline}>With Sociological Analysis</p>
        </div>

        <div className={styles.poweredBy}>
          <p className={styles.poweredByText}>
            All Rights Reserved. Powered By Still Eye Rise Media, LLC.
          </p>
        </div>
      </div>
    </footer>
  )
}
