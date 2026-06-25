import styles from './page.module.css'

export const metadata = {
  title: 'About',
  description: 'Learn about Yasmin Shiraz and The Yasmin Breakdown — sociological analysis of culture, sports, music, and relationships.',
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Hero heading */}
        <div className={styles.heroText}>
          <h1 className={styles.heading}>About The Yasmin Breakdown</h1>
          <p className={styles.subheading}>With Sociological Analysis</p>
        </div>

        {/* Two-column: photo + bio */}
        <div className={styles.bio}>
          <div className={styles.photoWrap}>
            <div className={styles.photoPlaceholder}>
              {/* Replace this div with an <Image> component once Yasmin's photo is added */}
              <span className={styles.photoLabel}>Photo Coming Soon</span>
            </div>
          </div>

          <div className={styles.bioText}>
            {/*
              ============================================================
              BIO TEXT — PASTE YASMIN'S BIO HERE
              Replace the placeholder paragraphs below with the real bio.
              You can use multiple <p> tags for separate paragraphs.
              ============================================================
            */}
            <p className={styles.bioParagraph}>
              [Yasmin&rsquo;s bio goes here. This is the first paragraph — introduce who you are, your background, and what drives your work.]
            </p>
            <p className={styles.bioParagraph}>
              [Second paragraph — your sociological approach, education, or methodology.]
            </p>
            <p className={styles.bioParagraph}>
              [Third paragraph — your audience, why this work matters, or a personal note.]
            </p>
            {/* ============================================================ */}
          </div>
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
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              {/* Replace href with Yasmin's Instagram URL */}
              Instagram
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              {/* Replace href with Yasmin's Facebook URL */}
              Facebook
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              {/* Replace href with Yasmin's Podcast URL */}
              Podcast
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
