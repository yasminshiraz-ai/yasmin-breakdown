import Image from 'next/image'
import Link from 'next/link'
import { getYouTubeVideos, formatPublishedDate } from '@/lib/youtube'
import styles from './page.module.css'

export const metadata = {
  title: 'Videos',
  description: 'Watch the latest videos from Yasmin Breakdown.',
}

const TOTAL_PAGES = 3
const PER_PAGE = 12

export default async function VideosPage({ searchParams }) {
  const rawPage = parseInt(searchParams?.page, 10)
  const currentPage = rawPage >= 1 && rawPage <= TOTAL_PAGES ? rawPage : 1

  const { videos, configured } = await getYouTubeVideos(36)

  const start = (currentPage - 1) * PER_PAGE
  const pageVideos = videos.slice(start, start + PER_PAGE)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>VIDEOS</h1>

        {!configured && (
          <p className={styles.notice}>
            Add your <code>NEXT_PUBLIC_YOUTUBE_API_KEY</code> to <code>.env.local</code> to display videos.
          </p>
        )}

        {configured && videos.length === 0 && (
          <p className={styles.notice}>No videos found. Check your YouTube API key.</p>
        )}

        {configured && videos.length > 0 && pageVideos.length === 0 && (
          <p className={styles.notice}>No more videos.</p>
        )}

        {pageVideos.length > 0 && (
          <div className={styles.grid}>
            {pageVideos.map(video => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <div className={styles.thumb}>
                  {video.thumbnail && (
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <div className={styles.playOverlay} aria-hidden="true">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div className={styles.info}>
                  <p className={styles.title}>{video.title}</p>
                  <span className={styles.meta}>{formatPublishedDate(video.publishedAt)}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {configured && (
          <nav className={styles.pagination} aria-label="Video pages">
            {[1, 2, 3].map(page => (
              <Link
                key={page}
                href={`/videos?page=${page}`}
                className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`}
              >
                {page}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}
