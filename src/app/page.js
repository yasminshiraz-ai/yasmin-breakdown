import Hero from '@/components/Hero/Hero'
import TrendingSidebar from '@/components/TrendingSidebar/TrendingSidebar'
import HomeFeed from '@/components/HomeFeed/HomeFeed'
import YouTubeRow from '@/components/YouTubeRow/YouTubeRow'
import Newsletter from '@/components/Newsletter/Newsletter'
import { getAllArticles, getFeaturedArticle } from '@/lib/articles'
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
  const allArticles = getAllArticles()
  const featured = getFeaturedArticle()
  const { videos, configured } = await getYouTubeVideos()

  return (
    <>
      <section className={styles.heroRow}>
        <div className={styles.heroWrap}>
          <Hero article={featured} />
        </div>
        <div className={styles.sidebarWrap}>
          <TrendingSidebar articles={allArticles} />
        </div>
      </section>

      <div className={styles.container}>
        <HomeFeed articles={allArticles} />
      </div>

      <YouTubeRow videos={videos} configured={configured} />

      <Newsletter />
    </>
  )
}
