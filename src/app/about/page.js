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
            <p className={styles.bioParagraph}>
              Yasmin Shiraz is a television writer, producer, author, and sociologist whose work sits at the intersection of pop culture and social analysis. As the creator of The Yasmin Breakdown, she brings a rare combination of academic rigor and industry insider experience to conversations about hip hop, Black history, sports, and entertainment — helping audiences understand the patterns and power structures behind the headlines.
            </p>
            <p className={styles.bioParagraph}>
              Yasmin&rsquo;s path to cultural analysis began in the newsroom of her own making: in the late 1990s, she founded Mad Rhythms, a hip hop magazine that built a substantial readership before she closed it at the height of its success to raise her family with her husband. She went on to write for television, including true crime staple Cold Case Files, sharpening a storytelling instinct that now shapes every breakdown she publishes.
            </p>
            <p className={styles.bioParagraph}>
              Her academic foundation — undergraduate and graduate degrees in sociology and criminology — gives her commentary a depth that goes beyond hot takes. Whether she&rsquo;s unpacking a WNBA controversy, tracing the history behind a viral moment, or examining Black fatherhood and voting rights, Yasmin&rsquo;s work asks the sociological question: what does this really tell us about who we are?
            </p>
            <p className={styles.bioParagraph}>
              Yasmin is also an author of multiple books, including American Library Award-winning nonfiction and Amazon bestsellers, and has built a career as a speaker and podcast producer. Today, through The Yasmin Breakdown — spanning YouTube, podcast, and this platform — she continues the work she&rsquo;s always done: taking culture apart, piece by piece, so we can see it clearly.
            </p>
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
