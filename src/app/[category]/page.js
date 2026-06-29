import { notFound } from 'next/navigation'
import Link from 'next/link'
import VerticalFeed from '@/components/VerticalFeed/VerticalFeed'
import TrendingSidebar from '@/components/TrendingSidebar/TrendingSidebar'
import { getArticlesByCategory, getAllArticles } from '@/lib/articles'
import styles from './page.module.css'

const CATEGORY_MAP = {
  sports: 'Sports',
  music: 'Music',
  'tv-film': 'TV & Film',
  relationships: 'Relationships',
  history: 'History',
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map(slug => ({ category: slug }))
}

export async function generateMetadata({ params }) {
  const label = CATEGORY_MAP[params.category]
  if (!label) return {}
  return {
    title: `${label} — The Yasmin Breakdown`,
    description: `All ${label} breakdowns with sociological analysis by Yasmin Shiraz.`,
  }
}

export default function CategoryPage({ params }) {
  const label = CATEGORY_MAP[params.category]
  if (!label) notFound()

  const articles = getArticlesByCategory(params.category)
  const allArticles = getAllArticles()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return (
    <div className={styles.page}>

      <div className={styles.headingContainer}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{label}</span>
        </div>
        <h1 className={styles.heading}>
          <span className={styles.stamp}>With Sociological Analysis</span>
          {label}
        </h1>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.leftCol}>
          {articles.length === 0 ? (
            <p className={styles.empty}>No articles yet in this category.</p>
          ) : (
            <VerticalFeed articles={articles} siteUrl={siteUrl} />
          )}
        </div>
        <aside className={styles.rightCol}>
          <TrendingSidebar articles={allArticles} />
        </aside>
      </div>

    </div>
  )
}
