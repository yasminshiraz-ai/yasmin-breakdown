import Image from 'next/image'
import Link from 'next/link'
import styles from './RelatedArticles.module.css'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function RelatedArticles({ articles = [] }) {
  if (!articles.length) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>More Breakdowns</h2>
      <div className={styles.grid}>
        {articles.map(article => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className={styles.card}>
            <div className={styles.thumb}>
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
              <h3 className={styles.title}>{article.title}</h3>
              <time className={styles.date}>{formatDate(article.date)}</time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
