import React from 'react'
import StoryBlock from '../StoryBlock/StoryBlock'
import AdSlot from '../AdSlot/AdSlot'
import styles from './VerticalFeed.module.css'

export default function VerticalFeed({ articles = [], siteUrl }) {
  return (
    <div className={styles.feed}>
      {articles.map((article, i) => (
        <React.Fragment key={article.slug}>
          <StoryBlock article={article} siteUrl={siteUrl} />

          {/* Insert after every 3rd story (indices 2, 5, 8…) */}
          {(i + 1) % 3 === 0 && i < articles.length - 1 && (
            <AdSlot slot="feed" />
          )}

          {/* Red divider between every story */}
          {i < articles.length - 1 && (
            <div className={styles.divider} aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
