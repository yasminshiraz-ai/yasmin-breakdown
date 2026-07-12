import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
  title: 'About',
  description: 'Yasmin Breakdown is a media brand built to break down culture, sports, and entertainment with sociological and criminological depth — and to elevate the stories of women who deserve more than a passing mention.',
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* 1. Brand intro */}
        <div className={styles.heroText}>
          <h1 className={styles.heading}>About Yasmin Breakdown</h1>
        </div>

        <div className={styles.missionSection}>
          <div className={styles.missionGrid}>
            <div className={styles.missionText}>
              <p className={styles.bioParagraph}>
                Yasmin Breakdown was created to solve a simple problem: too much of what circulates online about culture, sports, and entertainment is miscommunication dressed up as fact. Half-truths spread faster than context. Narratives get flattened before anyone asks why. Yasmin Breakdown exists to be a beacon of truth — breaking down the stories everyone&rsquo;s talking about with the sociological and criminological grounding they&rsquo;re rarely given.
              </p>
              <p className={styles.bioParagraph}>
                But truth-telling is only half the mission. In building this brand, it became impossible to ignore how few real outlets exist for Black women in sports, entertainment, and business to have their stories told with depth and accuracy — rather than reduced to a headline or a soundbite. Yasmin Breakdown is a media brand built to close that gap: elevating the stories of women whose work and impact too often go under-covered, and doing it through content that creates positive, accurate narratives rather than recycling the same shallow ones.
              </p>
              <p className={styles.bioParagraph}>
                That&rsquo;s the throughline across every video, article, and live: break down what&rsquo;s actually happening, give credit and context where it&rsquo;s due, and make room for the stories — especially women&rsquo;s stories — that deserve more than a passing mention.
              </p>
            </div>
            <div className={styles.heroImageWrap}>
              <Image
                src="/images/about-hero-viral-moment.png"
                alt="Yasmin Breakdown viral video moment on Facebook."
                width={540}
                height={600}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority
              />
            </div>
          </div>
        </div>

        {/* 2. About the founder — photo alongside text */}
        <div className={styles.founderSection}>
          <h2 className={styles.founderHeading}>About the founder</h2>
          <div className={styles.founderGrid}>
            <div className={styles.founderPhotoWrap}>
              <Image
                src="/images/yasmin-shiraz-writer-producer-sociologist.jpg"
                alt="Yasmin Shiraz, founder of Yasmin Breakdown"
                width={400}
                height={400}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                priority
              />
            </div>
            <div className={styles.founderBody}>
              <p className={styles.bioParagraph}>
                Yasmin Breakdown was founded by Yasmin Shiraz, a professional TV, film, and podcast writer with a background in sociology and criminology. She is the author of the groundbreaking, genre-defining book <em>The Blueprint For My Girls: How To Build A Life Full Of Encouragement, Determination &amp; Self-Love</em> (Simon &amp; Schuster), and the American Library Award&ndash;winning author of <em>Retaliation: A Novel</em>. Her versatile work includes writing for <em>Cold Case Files</em>, producing the award-winning podcasts <em>Killer Psyche</em> and <em>Scamfluencers</em>, as well as founding Mad Rhythms hip hop magazine and creating The How To Get Into The Entertainment Business tour. She created Yasmin Breakdown to apply that same rigor — asking not just what happened, but why it happened and who it actually affects — to the culture conversations everyone else covers on the surface.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Ownership */}
        <div className={styles.ownershipSection}>
          <h2 className={styles.sectionHeading}>Ownership</h2>
          <p className={styles.bioParagraph}>
            YasminBreakdown.com is owned and operated by Still Eye Rise Media, LLC.
          </p>
        </div>

        {/* 4. Contact Us */}
        <div className={styles.contactSection}>
          <h2 className={styles.sectionHeading}>Contact Us</h2>
          <p className={styles.bioParagraph}>
            Below you&rsquo;ll find some helpful links needed when contacting us.
          </p>
          <ul className={styles.contactList}>
            <li>
              <Link href="/contact?type=story-suggestion" className={styles.contactLink}>
                Have a story, suggestion or comment?
              </Link>
            </li>
            <li>
              <Link href="/contact?type=media-inquiry" className={styles.contactLink}>
                Media Inquiry
              </Link>
            </li>
            <li>
              <Link href="/contact?type=advertising-inquiry" className={styles.contactLink}>
                Advertise on YasminBreakdown.com
              </Link>
            </li>
          </ul>
        </div>

        {/* Social links */}
        <div className={styles.social}>
          <h2 className={styles.socialHeading}>Follow the Breakdown</h2>
          <div className={styles.socialLinks}>
            <a
              href="https://www.youtube.com/@YasminShiraz"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              YouTube
            </a>
            <a
              href="https://www.instagram.com/yasminbreakdown"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/yasminshiraz"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              Facebook
            </a>
            <a
              href="https://podcasts.apple.com/us/podcast/the-yasmin-breakdown/id1884706158"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              Podcast
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
