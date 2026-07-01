import Link from 'next/link'
import styles from './CategorySidebar.module.css'

const CATEGORIES = [
  { label: 'Entertainment', href: '/entertainment' },
  { label: 'Sports', href: '/sports' },
  { label: 'Crime', href: '/crime' },
  { label: 'Society', href: '/society' },
  { label: 'History', href: '/history' },
  { label: 'Videos', href: '/videos' },
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
