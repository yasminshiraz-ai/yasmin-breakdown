import { getAllArticles } from '@/lib/articles'
import { getAllAuthors } from '@/lib/authors'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yasminbreakdown.com'

const STATIC_PAGES = [
  { path: '',            changeFrequency: 'daily',   priority: 1.0 },
  { path: '/about',      changeFrequency: 'monthly',  priority: 0.7 },
  { path: '/newsletter', changeFrequency: 'monthly',  priority: 0.7 },
  { path: '/contact',    changeFrequency: 'monthly',  priority: 0.6 },
  { path: '/sponsors',   changeFrequency: 'monthly',  priority: 0.6 },
  { path: '/videos',     changeFrequency: 'weekly',   priority: 0.8 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms',      changeFrequency: 'yearly',   priority: 0.3 },
]

const CATEGORY_PAGES = [
  'entertainment',
  'sports',
  'crime',
  'society',
  'history',
  'videos',
]

export default function sitemap() {
  const now = new Date()

  const staticEntries = STATIC_PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const categoryEntries = CATEGORY_PAGES.map(slug => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const articles = getAllArticles()
  const articleEntries = articles.map(article => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const authors = getAllAuthors()
  const authorEntries = authors.map(author => ({
    url: `${SITE_URL}/author/${author.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticEntries, ...categoryEntries, ...articleEntries, ...authorEntries]
}
