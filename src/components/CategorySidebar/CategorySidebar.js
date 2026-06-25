import Link from 'next/link'
import styles from './CategorySidebar.module.css'

const CATEGORIES = [
  { label: 'Sports', href: '/sports' },
  { label: 'Music', href: '/music' },
  { label: 'TV & Film', href: '/tv-film' },
  { label: 'Relationships', href: '/relationships' },
  { label: 'History', href: '/history' },
]

export default function CategorySidebar() {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.heading}>Browse by Category</h2>
      <div className={styles.buttons}>
        {CATEGORIES.map(cat => (
          <Link key={cat.href} href={cat.href} className={styles.btn}>
            {cat.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
