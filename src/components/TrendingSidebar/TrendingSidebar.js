import Image from 'next/image'
import Link from 'next/link'
import styles from './TrendingSidebar.module.css'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function TrendingSidebar({ articles = [] }) {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.heading}>Trending</h2>
      <ol className={styles.list}>
        {articles.slice(0, 5).map(article => (
          <li key={article.slug} className={styles.item}>
            <Link href={`/articles/${article.slug}`} className={styles.link}>
              <div className={styles.photo}>
                {article.featuredImage ? (
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                    sizes="300px"
                  />
                ) : (
                  <div className={styles.placeholder} />
                )}
              </div>
              <span className={styles.category}>{article.category}</span>
              <span className={styles.title}>{article.title}</span>
              <time className={styles.date}>{formatDate(article.date)}</time>
            </Link>
            <div className={styles.divider} />
          </li>
        ))}
      </ol>
    </aside>
  )
}
