import VerticalFeed from '@/components/VerticalFeed/VerticalFeed'
import TrendingSidebar from '@/components/TrendingSidebar/TrendingSidebar'
import YouTubeRow from '@/components/YouTubeRow/YouTubeRow'
import Newsletter from '@/components/Newsletter/Newsletter'
import { getAllArticles } from '@/lib/articles'
import styles from './page.module.css'

export const revalidate = 60

async function getYouTubeVideos() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/youtube`, { next: { revalidate: 3600 } })
    if (!res.ok) return { videos: [], configured: false }
    return res.json()
  } catch {
    return { videos: [], configured: false }
  }
}

export default async function HomePage() {
  const articles = getAllArticles()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const { videos, configured } = await getYouTubeVideos()

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.feedCol}>
          <VerticalFeed articles={articles} siteUrl={siteUrl} />
        </div>
        <div className={styles.sidebarCol}>
          <TrendingSidebar articles={articles} />
        </div>
      </div>

      <YouTubeRow videos={videos} configured={configured} />
      <Newsletter />
    </>
  )
}
