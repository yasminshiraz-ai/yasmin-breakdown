import Image from 'next/image'
import styles from './YouTubeRow.module.css'

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

export default function YouTubeRow({ videos = [], configured = true }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.ytIcon}><YouTubeIcon /></span>
          <h2 className={styles.heading}>Watch on YouTube</h2>
          <a
            href="https://www.youtube.com/@YasminShiraz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channelLink}
          >
            @YasminShiraz →
          </a>
        </div>

        {!configured && (
          <p className={styles.notice}>
            Add your <code>YOUTUBE_API_KEY</code> to <code>.env.local</code> to display latest videos.
          </p>
        )}

        {configured && videos.length === 0 && (
          <p className={styles.notice}>No videos found. Check your YouTube API key.</p>
        )}

        {videos.length > 0 && (
          <div className={styles.grid}>
            {videos.map(video => (
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
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className={styles.playBtn} aria-hidden="true">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div className={styles.info}>
                  <p className={styles.title}>{video.title}</p>
                  <span className={styles.views}>{video.viewCount} views</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
