// Homepage v2 - two column layout with YouTube row
import VerticalFeed from '@/components/VerticalFeed/VerticalFeed'
import TrendingSidebar from '@/components/TrendingSidebar/TrendingSidebar'
import VisionBoardWidget from '@/components/VisionBoardWidget/VisionBoardWidget'
import YouTubeRow from '@/components/YouTubeRow/YouTubeRow'
import MoreFromBreakdown from '@/components/MoreFromBreakdown/MoreFromBreakdown'
import Newsletter from '@/components/Newsletter/Newsletter'
import PhotoStrip from '@/components/PhotoStrip/PhotoStrip'
import { getAllArticles } from '@/lib/articles'
import { getYouTubeVideos } from '@/lib/youtube'
import styles from './page.module.css'

export const revalidate = 3600

export default async function HomePage() {
  const articles = getAllArticles()
  const mainArticles = articles.slice(0, 4)
  const stripArticles = articles.slice(5, 10)
  const moreArticles = articles.slice(4, 11)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const { videos, configured } = await getYouTubeVideos(3)

  return (
    <>
      {/* 0. Photo strip — 5 articles offset by 5, directly below secondary nav */}
      <PhotoStrip articles={stripArticles} />

      {/* 1. First two-column wrapper */}
      <div className={styles.wrapper}>
        <div className={styles.leftCol}>
          <VerticalFeed articles={mainArticles} siteUrl={siteUrl} />
        </div>
        <aside className={styles.rightCol}>
          <VisionBoardWidget />
          <TrendingSidebar articles={articles} />
        </aside>
      </div>

      {/* 2. YouTube row — full width, no wrapper */}
      <YouTubeRow videos={videos} configured={configured} />

      {/* 3. Second two-column wrapper */}
      <div className={styles.wrapper}>
        <div className={`${styles.leftCol} ${styles.moreCol}`}>
          <MoreFromBreakdown articles={moreArticles} siteUrl={siteUrl} />
        </div>
        <aside className={`${styles.rightCol} ${styles.moreSidebar}`}>
          <VisionBoardWidget />
          <TrendingSidebar articles={articles} />
        </aside>
      </div>

      {/* 4. Newsletter — full width */}
      <Newsletter />
    </>
  )
}
