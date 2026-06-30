import Image from 'next/image'
import Link from 'next/link'
import styles from './PhotoStrip.module.css'

export default function PhotoStrip({ articles }) {
  if (!articles || articles.length === 0) return null

  return (
    <section className={styles.strip}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {articles.map(article => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                {article.featuredImage ? (
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 55vw, 220px"
                  />
                ) : (
                  <div className={styles.placeholder} />
                )}
              </div>
              <p className={styles.title}>{article.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
