import React from 'react'
import StoryBlock from '@/components/StoryBlock/StoryBlock'
import AdSlot from '@/components/AdSlot/AdSlot'
import styles from './MoreFromBreakdown.module.css'

export default function MoreFromBreakdown({ articles = [], siteUrl }) {
  if (articles.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>More from the Breakdown</h2>
        <div className={styles.feed}>
          {articles.map((article, i) => (
            <React.Fragment key={article.slug}>
              <StoryBlock article={article} siteUrl={siteUrl} />

              {(i + 1) % 3 === 0 && i < articles.length - 1 && (
                <AdSlot slot="more-feed" />
              )}

              {i < articles.length - 1 && (
                <div className={styles.divider} aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
