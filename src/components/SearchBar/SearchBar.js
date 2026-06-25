'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './SearchBar.module.css'

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  )
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)
  const inputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [expanded])

  function handleSubmit(e) {
    e.preventDefault()
    const term = query.trim()
    if (term) {
      router.push(`/search?q=${encodeURIComponent(term)}`)
      setExpanded(false)
      setQuery('')
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setExpanded(false)
      setQuery('')
    }
  }

  return (
    <div className={`${styles.wrapper} ${expanded ? styles.expanded : ''}`}>
      {/* Desktop: always visible form */}
      <form onSubmit={handleSubmit} className={styles.form} role="search">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search The Breakdown..."
          className={styles.input}
          aria-label="Search articles"
        />
        <button type="submit" className={styles.searchBtn} aria-label="Submit search">
          <SearchIcon />
        </button>
      </form>

      {/* Mobile: icon-only toggle shown when not expanded */}
      <button
        className={styles.mobileToggle}
        onClick={() => setExpanded(true)}
        aria-label="Open search"
        aria-expanded={expanded}
      >
        <SearchIcon />
      </button>

      {/* Mobile: expanded overlay form */}
      {expanded && (
        <form onSubmit={handleSubmit} className={styles.mobileForm} role="search">
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search The Breakdown..."
            className={styles.mobileInput}
            aria-label="Search articles"
            autoFocus
          />
          <button type="submit" className={styles.mobileSearchBtn} aria-label="Submit search">
            <SearchIcon />
          </button>
          <button
            type="button"
            className={styles.mobileClose}
            onClick={() => { setExpanded(false); setQuery('') }}
            aria-label="Close search"
          >
            ✕
          </button>
        </form>
      )}
    </div>
  )
}
