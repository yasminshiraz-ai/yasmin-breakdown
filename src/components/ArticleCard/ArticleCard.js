import Image from 'next/image'
import Link from 'next/link'
import styles from './ArticleCard.module.css'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function ArticleCard({ article }) {
  return (
    <Link href={`/articles/${article.slug}`} className={styles.card}>
      <div className={styles.thumbnail}>
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{article.category}</span>
        <h3 className={styles.headline}>{article.title}</h3>
        <div className={styles.meta}>
          <span className={styles.byline}>Yasmin Shiraz</span>
          <span className={styles.dot}>·</span>
          <time>{formatDate(article.date)}</time>
          {article.readingTime && (
            <>
              <span className={styles.dot}>·</span>
              <span>{article.readingTime} min</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
