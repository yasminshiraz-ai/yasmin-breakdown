import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard/ArticleCard'
import { getAuthorContent, getAllAuthorSlugs } from '@/lib/authors'
import { getArticlesByAuthor } from '@/lib/articles'
import styles from './page.module.css'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllAuthorSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const author = await getAuthorContent(params.slug)
  if (!author) return {}
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yasminbreakdown.com'
  const ogImage = author.photo
    ? author.photo.startsWith('http') ? author.photo : `${siteUrl}${author.photo}`
    : null
  return {
    title: `${author.name} — Yasmin Breakdown`,
    description: author.short_bio || `Articles and analysis by ${author.name}.`,
    openGraph: {
      title: `${author.name} — Yasmin Breakdown`,
      description: author.short_bio || `Articles and analysis by ${author.name}.`,
      url: `${siteUrl}/author/${params.slug}`,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${author.name} — Yasmin Breakdown`,
      description: author.short_bio || `Articles and analysis by ${author.name}.`,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function AuthorPage({ params }) {
  const author = await getAuthorContent(params.slug)
  if (!author) notFound()

  const articles = getArticlesByAuthor(params.slug)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span className={styles.breadcrumbCurrent}>{author.name}</span>
        </div>

        <div className={styles.profile}>
          {author.photo && (
            <div className={styles.photoWrap}>
              <Image
                src={author.photo}
                alt={author.name}
                width={140}
                height={140}
                className={styles.photo}
                priority
              />
            </div>
          )}
          <div className={styles.profileInfo}>
            <h1 className={styles.name}>{author.name}</h1>
            {author.title && <p className={styles.title}>{author.title}</p>}
            {author.credentials && author.credentials.length > 0 && (
              <ul className={styles.credentials}>
                {author.credentials.map((c, i) => (
                  <li key={i} className={styles.credential}>{c}</li>
                ))}
              </ul>
            )}
            <div className={styles.social}>
              {author.social_links?.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {link.platform}
                </a>
              ))}
              {author.contact_email && (
                <a href={`mailto:${author.contact_email}`} className={styles.socialLink}>
                  Email
                </a>
              )}
            </div>
          </div>
        </div>

        {author.fullBioHtml && (
          <div
            className={styles.bio}
            dangerouslySetInnerHTML={{ __html: author.fullBioHtml }}
          />
        )}

        <div className={styles.articlesSection}>
          <h2 className={styles.articlesHeading}>
            <span className={styles.stamp}>All Articles By</span>
            {author.name}
          </h2>
          {articles.length > 0 ? (
            <div className={styles.grid}>
              {articles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No articles found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
