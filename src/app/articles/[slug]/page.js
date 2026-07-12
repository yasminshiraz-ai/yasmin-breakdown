import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Newsletter from '@/components/Newsletter/Newsletter'
import RelatedArticles from '@/components/RelatedArticles/RelatedArticles'
import AuthorFooter from '@/components/AuthorFooter/AuthorFooter'
import AdSlot from '@/components/AdSlot/AdSlot'
import ShareButtons from '@/components/ShareButtons/ShareButtons'
import { getArticleContent, getAllArticles } from '@/lib/articles'
import { getAuthorBySlug } from '@/lib/authors'
import styles from './page.module.css'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  try {
    const article = await getArticleContent(params.slug)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const ogImage = article.featuredImage
      ? article.featuredImage.startsWith('http')
        ? article.featuredImage
        : `${siteUrl}${article.featuredImage}`
      : null
    return {
      title: article.title,
      description: article.description || '',
      keywords: article.tags.length ? article.tags.join(', ') : undefined,
      openGraph: {
        title: article.title,
        description: article.description || '',
        type: 'article',
        url: `${siteUrl}/articles/${params.slug}`,
        images: ogImage ? [{ url: ogImage, width: 1200, height: 800, alt: article.title }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.description || '',
        images: ogImage ? [ogImage] : [],
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
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/|shorts\/)|youtu\.be\/)([^&\n?#]+)/
  )
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null
}

function injectAdAfterP2(html) {
  let count = 0
  return html.replace(/<\/p>/g, match => {
    count++
    if (count === 2) {
      return `</p><div class="ad-slot" data-slot="after-p2" aria-hidden="true" style="min-height:90px;background:#F5F5F5;border:1px dashed #D0D0D0;display:flex;align-items:center;justify-content:center;color:#AAAAAA;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;margin:2rem 0;"></div>`
    }
    return match
  })
}

function splitAtParagraph(html, n) {
  let count = 0
  let searchFrom = 0
  let splitIndex = html.length
  while (count < n) {
    const idx = html.indexOf('</p>', searchFrom)
    if (idx === -1) break
    count++
    if (count === n) { splitIndex = idx + 4; break }
    searchFrom = idx + 4
  }
  return [html.slice(0, splitIndex), html.slice(splitIndex)]
}

const CATEGORY_SLUG_MAP = {
  Entertainment: 'entertainment',
  Sports: 'sports',
  Crime: 'crime',
  Society: 'society',
  History: 'history',
  Videos: 'videos',
}

export default async function ArticlePage({ params }) {
  let article
  try {
    article = await getArticleContent(params.slug)
  } catch {
    notFound()
  }

  const allArticles = getAllArticles()
  const currentTags = new Set(article.tags || [])
  const related = allArticles
    .filter(a => a.slug !== params.slug)
    .map(a => ({
      ...a,
      _tagOverlap: (a.tags || []).filter(t => currentTags.has(t)).length,
      _categoryBonus: a.category === article.category ? 1 : 0,
    }))
    .sort((a, b) => {
      if (b._tagOverlap !== a._tagOverlap) return b._tagOverlap - a._tagOverlap
      if (b._categoryBonus !== a._categoryBonus) return b._categoryBonus - a._categoryBonus
      return new Date(b.date) - new Date(a.date)
    })
    .slice(0, 3)

  const authorSlug = article.author || 'yasmin-shiraz'
  const author = getAuthorBySlug(authorSlug)

  const categorySlug = CATEGORY_SLUG_MAP[article.category] || ''
  const contentWithAd = injectAdAfterP2(article.contentHtml)
  const embedUrl = getYouTubeEmbedUrl(article.videoUrl)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const articleUrl = `${siteUrl}/articles/${params.slug}`

  let bodyBefore = contentWithAd
  let bodyAfter = ''
  if (embedUrl) {
    ;[bodyBefore, bodyAfter] = splitAtParagraph(contentWithAd, 4)
  }

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
            <ShareButtons url={articleUrl} title={article.title} />
            {article.description && (
              <p className={styles.dek}>{article.description}</p>
            )}
            <div className={styles.meta}>
              <Link href={`/author/${authorSlug}`} className={styles.byline}>
                By {author?.name || 'Yasmin Shiraz'}
              </Link>
              <span className={styles.dot}>·</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              {article.readingTime && (
                <>
                  <span className={styles.dot}>·</span>
                  <span>{article.readingTime} min read</span>
                </>
              )}
            </div>
            {author?.credentials && author.credentials.length > 0 && (
              <p className={styles.authorCredentials}>
                {author.credentials.slice(0, 2).join(' · ')}
              </p>
            )}
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
            dangerouslySetInnerHTML={{ __html: bodyBefore }}
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

          {bodyAfter && (
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: bodyAfter }}
            />
          )}

          <AuthorFooter author={author} />

          <AdSlot slot="above-footer" />

          {article.tags && article.tags.length > 0 && (
            <div className={styles.tagsSection}>
              <span className={styles.tagsLabel}>Tags</span>
              <div className={styles.tagsRow}>
                {article.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`}
                    className={styles.tagPill}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <RelatedArticles articles={related} />
        </article>

        <Newsletter />
      </div>
    </div>
  )
}
