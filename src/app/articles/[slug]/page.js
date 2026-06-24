import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Newsletter from '@/components/Newsletter/Newsletter'
import RelatedArticles from '@/components/RelatedArticles/RelatedArticles'
import AdSlot from '@/components/AdSlot/AdSlot'
import { getArticleContent, getAllArticles, getAllSlugs } from '@/lib/articles'
import styles from './page.module.css'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  try {
    const article = await getArticleContent(params.slug)
    return {
      title: article.title,
      description: article.description || '',
      openGraph: {
        title: article.title,
        description: article.description || '',
        images: article.featuredImage ? [article.featuredImage] : [],
      },
    }
  } catch {
    return {}
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

function getYouTubeEmbedUrl(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null
}

function injectAdAfterP2(html) {
  let count = 0
  return html.replace(/<\/p>/g, match => {
    count++
    if (count === 2) {
      return `</p><div class="ad-slot" data-slot="after-p2" aria-hidden="true" style="min-height:90px;background:#111;border:1px dashed #2A2A2A;display:flex;align-items:center;justify-content:center;color:#888;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;margin:2rem 0;" data-label="Advertisement"></div>`
    }
    return match
  })
}

const CATEGORY_SLUG_MAP = {
  Sports: 'sports',
  Music: 'music',
  'TV & Film': 'tv-film',
  Love: 'love',
  History: 'history',
}

export default async function ArticlePage({ params }) {
  let article
  try {
    article = await getArticleContent(params.slug)
  } catch {
    notFound()
  }

  const allArticles = getAllArticles()
  const related = allArticles
    .filter(a => a.category === article.category && a.slug !== params.slug)
    .slice(0, 3)

  const categorySlug = CATEGORY_SLUG_MAP[article.category] || ''
  const contentWithAd = injectAdAfterP2(article.contentHtml)
  const embedUrl = getYouTubeEmbedUrl(article.videoUrl)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          {categorySlug && <Link href={`/${categorySlug}`}>{article.category}</Link>}
          {categorySlug && <span>/</span>}
          <span className={styles.breadcrumbCurrent}>{article.title}</span>
        </div>

        <article className={styles.article}>
          <header className={styles.header}>
            <span className={styles.categoryBadge}>{article.category}</span>
            <h1 className={styles.headline}>{article.title}</h1>
            {article.description && (
              <p className={styles.dek}>{article.description}</p>
            )}
            <div className={styles.meta}>
              <span className={styles.byline}>By Yasmin Shiraz</span>
              <span className={styles.dot}>·</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              {article.readingTime && (
                <>
                  <span className={styles.dot}>·</span>
                  <span>{article.readingTime} min read</span>
                </>
              )}
            </div>
          </header>

          {article.featuredImage && (
            <div className={styles.featuredImage}>
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width: 768px) 100vw, 860px"
              />
            </div>
          )}

          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: contentWithAd }}
          />

          {embedUrl && (
            <div className={styles.videoWrap}>
              <iframe
                src={embedUrl}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.video}
              />
            </div>
          )}

          <AdSlot slot="above-footer" />
        </article>

        <Newsletter />

        <RelatedArticles articles={related} />
      </div>
    </div>
  )
}
