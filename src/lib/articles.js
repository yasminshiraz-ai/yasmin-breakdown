import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'

const articlesDir = path.join(process.cwd(), 'content/articles')

export function getAllArticles() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))

  return files
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(articlesDir, fileName), 'utf8')
      const { data, content } = matter(raw)
      const stats = readingTime(content)
      return { slug, ...data, readingTime: Math.ceil(stats.minutes) }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getArticlesByCategory(categorySlug) {
  const slugToLabel = {
    sports: 'Sports',
    music: 'Music',
    'tv-film': 'TV & Film',
    love: 'Love',
    history: 'History',
  }
  const label = slugToLabel[categorySlug]
  return getAllArticles().filter(a => a.category === label)
}

export async function getArticleContent(slug) {
  const raw = fs.readFileSync(path.join(articlesDir, `${slug}.md`), 'utf8')
  const { data, content } = matter(raw)
  const stats = readingTime(content)
  const processed = await remark().use(html, { sanitize: false }).process(content)
  const contentHtml = processed.toString()
  return { slug, ...data, contentHtml, readingTime: Math.ceil(stats.minutes) }
}

export function getAllSlugs() {
  return fs
    .readdirSync(articlesDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}

export function getFeaturedArticle() {
  const articles = getAllArticles()
  return articles.find(a => a.featured) || articles[0] || null
}
