import { notFound } from 'next/navigation'
import Link from 'next/link'
import VerticalFeed from '@/components/VerticalFeed/VerticalFeed'
import TrendingSidebar from '@/components/TrendingSidebar/TrendingSidebar'
import VisionBoardWidget from '@/components/VisionBoardWidget/VisionBoardWidget'
import { getAllArticles } from '@/lib/articles'
import layoutStyles from '../../[category]/page.module.css'
import styles from './page.module.css'

const ARTICLES_PER_PAGE = 16

export async function generateStaticParams() {
  const articles = getAllArticles()
  // totalPages = ceil(total / 16). Page 1 is the homepage; generate 2..totalPages.
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
  return Array.from({ length: totalPages - 1 }, (_, i) => ({ page: String(i + 2) }))
}

export async function generateMetadata({ params }) {
  const page = parseInt(params.page, 10)
  return {
    title: `All Stories — Page ${page} — Yasmin Breakdown`,
    description: `More breakdowns and analysis from Yasmin Shiraz. Page ${page}.`,
  }
}

export default function StoriesPage({ params }) {
  const page = parseInt(params.page, 10)
  const articles = getAllArticles()
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)

  if (isNaN(page) || page < 2 || page > totalPages) notFound()

  const start = (page - 1) * ARTICLES_PER_PAGE
  const pageArticles = articles.slice(start, start + ARTICLES_PER_PAGE)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const prevHref = page === 2 ? '/' : `/stories/${page - 1}`
  const nextHref = page < totalPages ? `/stories/${page + 1}` : null

  return (
    <div className={layoutStyles.page}>

      <div className={layoutStyles.headingContainer}>
        <div className={layoutStyles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/stories/2">All Stories</Link>
          <span>/</span>
          <span>Page {page}</span>
        </div>
        <h1 className={layoutStyles.heading}>
          <span className={layoutStyles.stamp}>With Sociological Analysis</span>
          All Stories
        </h1>
      </div>

      <div className={layoutStyles.wrapper}>
        <div className={layoutStyles.leftCol}>
          <VerticalFeed articles={pageArticles} siteUrl={siteUrl} />
        </div>
        <aside className={layoutStyles.rightCol}>
          <VisionBoardWidget />
          <TrendingSidebar articles={articles} />
        </aside>
      </div>

      <div className={styles.pagination}>
        <Link href={prevHref} className={styles.paginationBtn}>
          ← Previous
        </Link>
        {nextHref && (
          <Link href={nextHref} className={styles.paginationBtn}>
            Read more stories →
          </Link>
        )}
      </div>

    </div>
  )
}
