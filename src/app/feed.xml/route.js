import { getAllArticles } from '@/lib/articles'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yasminbreakdown.com'
const SITE_TITLE = 'Yasmin Breakdown'
const SITE_DESCRIPTION =
  'Cultural analysis on hip hop, Black history, sports, and entertainment — through a sociological and criminology lens.'

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const articles = getAllArticles().slice(0, 30) // most recent 30 items

  const items = articles
    .map(article => {
      const url = `${SITE_URL}/articles/${article.slug}`
      const pubDate = article.date ? new Date(article.date).toUTCString() : new Date().toUTCString()
      const image = article.featuredImage ? `${SITE_URL}${article.featuredImage}` : null

      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(article.category || '')}</category>
      <description>${escapeXml(article.description || article.excerpt || '')}</description>
      ${image ? `<enclosure url="${image}" type="image/jpeg" />` : ''}
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
