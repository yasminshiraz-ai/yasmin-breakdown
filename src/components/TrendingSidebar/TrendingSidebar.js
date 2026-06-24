import Link from 'next/link'
import styles from './TrendingSidebar.module.css'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  })
}

export default function TrendingSidebar({ articles = [] }) {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.heading}>Trending</h2>
      <ol className={styles.list}>
        {articles.slice(0, 5).map((article, i) => (
          <li key={article.slug} className={styles.item}>
            <Link href={`/articles/${article.slug}`} className={styles.link}>
              <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.info}>
                <span className={styles.category}>{article.category}</span>
                <span className={styles.title}>{article.title}</span>
                <span className={styles.date}>{formatDate(article.date)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  )
}
