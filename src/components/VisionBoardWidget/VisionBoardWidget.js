import Image from 'next/image'
import TrackedLink from '@/components/TrackedLink/TrackedLink'
import styles from './VisionBoardWidget.module.css'

const BOOKS = [
  {
    label: 'For Black Women',
    image: '/images/vision-board/blackwomen.jpg',
    url: 'https://amzn.to/3WVxPGC',
  },
  {
    label: 'For Black Men',
    image: '/images/vision-board/blackmen.jpg',
    url: 'https://amzn.to/3V9p35v',
  },
  {
    label: 'For Black Girls',
    image: '/images/vision-board/blackgirls.jpg',
    url: 'https://amzn.to/4p7oBCY',
  },
  {
    label: 'For Black Boys',
    image: '/images/vision-board/blackboys.jpg',
    url: 'https://amzn.to/4u2zSX0',
  },
]

export default function VisionBoardWidget() {
  return (
    <div className={styles.widget}>
      <h2 className={styles.heading}>Vision Board Clip Art Books</h2>
      <p className={styles.subheading}>Curated by Yasmin Breakdown</p>
      <div className={styles.grid}>
        {BOOKS.map(book => (
          <TrackedLink
            key={book.label}
            href={book.url}
            eventLabel={`Vision Board - ${book.label.replace('For ', '')}`}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={styles.card}
            aria-label={book.label}
          >
            <div className={styles.cover}>
              <Image
                src={book.image}
                alt={book.label}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center', borderRadius: '4px' }}
                sizes="130px"
              />
            </div>
            <span className={styles.badge}>{book.label}</span>
          </TrackedLink>
        ))}
      </div>
    </div>
  )
}
