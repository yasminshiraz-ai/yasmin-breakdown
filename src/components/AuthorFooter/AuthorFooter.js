import Image from 'next/image'
import Link from 'next/link'
import styles from './AuthorFooter.module.css'

const FALLBACK = {
  slug: 'yasmin-shiraz',
  name: 'Yasmin Shiraz',
  title: 'Founder, Yasmin Breakdown',
  photo: '/images/yasmin-shiraz-writer-producer-sociologist.jpg',
  short_bio: 'Yasmin Shiraz is a bestselling author, journalist, and cultural analyst delivering sociological breakdowns of hip hop, Black history, sports, and entertainment.',
}

export default function AuthorFooter({ author }) {
  const a = author || FALLBACK
  const slug = a.slug || FALLBACK.slug
  const name = a.name || FALLBACK.name
  const photo = a.photo || FALLBACK.photo
  const title = a.title || FALLBACK.title
  const bio = a.short_bio || FALLBACK.short_bio

  return (
    <div className={styles.wrapper}>
      <div className={styles.photoWrap}>
        <Link href={`/author/${slug}`} tabIndex={-1} aria-hidden="true">
          <Image
            src={photo}
            alt={name}
            width={80}
            height={80}
            className={styles.photo}
          />
        </Link>
      </div>
      <div className={styles.info}>
        <Link href={`/author/${slug}`} className={styles.name}>{name}</Link>
        <p className={styles.title}>{title}</p>
        <p className={styles.bio}>{bio}</p>
        <Link href={`/author/${slug}`} className={styles.followLink}>
          View all articles by {name} &rarr;
        </Link>
      </div>
    </div>
  )
}
