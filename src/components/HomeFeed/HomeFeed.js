'use client'
import { useState } from 'react'
import ArticleCard from '../ArticleCard/ArticleCard'
import styles from './HomeFeed.module.css'

const CATEGORIES = ['All', 'Sports', 'Music', 'TV & Film', 'Relationships', 'History']

export default function HomeFeed({ articles = [] }) {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? articles
    : articles.filter(a => a.category === active)

  return (
    <section className={styles.section}>
      <div className={styles.filters} role="tablist" aria-label="Filter by category">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            className={`${styles.pill} ${active === cat ? styles.active : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No articles in this category yet.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </section>
  )
}
