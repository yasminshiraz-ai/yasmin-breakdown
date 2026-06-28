import Image from 'next/image'
import styles from './AuthorFooter.module.css'

export default function AuthorFooter() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.photoWrap}>
        <Image
          src="/images/yasmin-author.jpg"
          alt="Yasmin Shiraz"
          width={80}
          height={80}
          className={styles.photo}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>Yasmin Shiraz</p>
        <p className={styles.title}>Author, TV Writer / Producer &amp; Cultural Analyst</p>
        <p className={styles.bio}>
          Yasmin Shiraz is a bestselling author, journalist, and cultural analyst delivering
          sociological breakdowns of hip hop, Black history, sports, and entertainment.
        </p>
        <a
          href="https://www.instagram.com/empowerwithyasmin"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.followLink}
        >
          Follow on Instagram &rarr;
        </a>
      </div>
    </div>
  )
}
