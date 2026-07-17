import Link from 'next/link'
import VerticalFeed from '@/components/VerticalFeed/VerticalFeed'
import TrendingSidebar from '@/components/TrendingSidebar/TrendingSidebar'
import VisionBoardWidget from '@/components/VisionBoardWidget/VisionBoardWidget'
import { getAllArticles } from '@/lib/articles'
import styles from '../[category]/page.module.css'

export const metadata = {
  title: 'All Stories — Yasmin Breakdown',
  description: 'Every breakdown, analysis, and deep-dive from Yasmin Shiraz.',
}

export default function StoriesPage() {
  const articles = getAllArticles()
  const allArticles = articles
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return (
    <div className={styles.page}>

      <div className={styles.headingContainer}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span>All Stories</span>
        </div>
        <h1 className={styles.heading}>
          <span className={styles.stamp}>With Sociological Analysis</span>
          All Stories
        </h1>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.leftCol}>
          <VerticalFeed articles={allArticles} siteUrl={siteUrl} />
        </div>
        <aside className={styles.rightCol}>
          <VisionBoardWidget />
          <TrendingSidebar articles={allArticles} />
        </aside>
      </div>

    </div>
  )
}
