import React from 'react'
import StoryBlock from '@/components/StoryBlock/StoryBlock'
import { getAllArticles } from '@/lib/articles'
import styles from './page.module.css'

export function generateMetadata({ searchParams }) {
  const q = searchParams?.q || ''
  return {
    title: q ? `Search: "${q}"` : 'Search',
    description: `Search results for ${q} on The Yasmin Breakdown.`,
  }
}

export default function SearchPage({ searchParams }) {
  const q = (searchParams?.q || '').trim()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const results = q
    ? getAllArticles().filter(a => {
        const term = q.toLowerCase()
        return (
          a.title?.toLowerCase().includes(term) ||
          a.category?.toLowerCase().includes(term) ||
          a.description?.toLowerCase().includes(term)
        )
      })
    : []

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {q ? (
          <h1 className={styles.heading}>
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{q}&rdquo;
          </h1>
        ) : (
          <h1 className={styles.heading}>Search</h1>
        )}

        {q && results.length === 0 && (
          <p className={styles.empty}>
            No results found for &ldquo;{q}&rdquo;. Try a different search term.
          </p>
        )}

        {!q && (
          <p className={styles.empty}>Enter a search term above to find articles.</p>
        )}

        <div className={styles.feed}>
          {results.map((article, i) => (
            <React.Fragment key={article.slug}>
              <StoryBlock article={article} siteUrl={siteUrl} />
              {i < results.length - 1 && (
                <div className={styles.divider} aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
