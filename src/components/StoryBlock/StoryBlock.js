import Image from 'next/image'
import Link from 'next/link'
import ShareButtons from '../ShareButtons/ShareButtons'
import styles from './StoryBlock.module.css'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function StoryBlock({ article, siteUrl }) {
  const articlePath = `/articles/${article.slug}`
  const articleUrl = `${siteUrl}${articlePath}`

  return (
    <article className={styles.block}>
      <Link href={articlePath} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
        <div className={styles.imageWrap}>
          {article.featuredImage ? (
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 820px) 100vw, 780px"
              priority={false}
            />
          ) : (
            <div className={styles.placeholder} />
          )}
        </div>
      </Link>

      <div className={styles.content}>
        <span className={styles.category}>{article.category}</span>

        <Link href={articlePath} className={styles.headlineLink}>
          <h2 className={styles.headline}>{article.title}</h2>
        </Link>

        <ShareButtons url={articleUrl} title={article.title} />

        <div className={styles.meta}>
          <span className={styles.byline}>By Yasmin Shiraz</span>
          <span className={styles.dot}>·</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          {article.readingTime && (
            <>
              <span className={styles.dot}>·</span>
              <span>{article.readingTime} min read</span>
            </>
          )}
        </div>

        {(article.excerpt || article.description) && (
          <p className={styles.dek}>{article.excerpt || article.description}</p>
        )}

        <Link href={articlePath} className={styles.keepReading}>
          Keep Reading
        </Link>
      </div>
    </article>
  )
}
