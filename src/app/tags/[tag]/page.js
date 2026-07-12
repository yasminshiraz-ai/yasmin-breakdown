import { notFound } from 'next/navigation'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard/ArticleCard'
import { getArticlesByTag, getAllTags } from '@/lib/articles'
import styles from './page.module.css'

export const dynamicParams = false

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map(tag => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }) {
  const displayTag = decodeURIComponent(params.tag).replace(/-/g, ' ')
  return {
    title: `${displayTag} — Yasmin Breakdown`,
    description: `Articles tagged "${displayTag}" with sociological analysis by Yasmin Shiraz.`,
  }
}

export default function TagPage({ params }) {
  const rawTag = decodeURIComponent(params.tag).replace(/-/g, ' ')
  const articles = getArticlesByTag(rawTag)

  if (articles.length === 0) notFound()

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Tags</span>
          <span>/</span>
          <span className={styles.breadcrumbCurrent}>{rawTag}</span>
        </div>

        <h1 className={styles.heading}>
          <span className={styles.stamp}>Tagged</span>
          {rawTag}
        </h1>

        <div className={styles.grid}>
          {articles.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
