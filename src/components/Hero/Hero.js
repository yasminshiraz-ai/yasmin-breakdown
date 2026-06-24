import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function Hero({ article }) {
  if (!article) return null

  return (
    <Link href={`/articles/${article.slug}`} className={styles.hero}>
      <div className={styles.imageWrap}>
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
        <div className={styles.overlay} />
      </div>

      <div className={styles.stamp}>
        With Sociological Analysis
      </div>

      <div className={styles.content}>
        <span className={styles.categoryBadge}>{article.category}</span>
        <h1 className={styles.headline}>{article.title}</h1>
        {article.description && (
          <p className={styles.dek}>{article.description}</p>
        )}
        <div className={styles.meta}>
          <span className={styles.byline}>By Yasmin Shiraz</span>
          <span className={styles.dot}>·</span>
          <time className={styles.date}>{formatDate(article.date)}</time>
          {article.readingTime && (
            <>
              <span className={styles.dot}>·</span>
              <span>{article.readingTime} min read</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
