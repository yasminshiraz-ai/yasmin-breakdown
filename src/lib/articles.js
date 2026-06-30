import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'

const articlesDir = path.join(process.cwd(), 'content/articles')

function extractSentences(markdown, n) {
  function cleanParagraph(text) {
    return text
      .replace(/#{1,6} .+/g, '')
      .replace(/!?\[([^\]]*)\]\([^)]+\)/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      .replace(/_([^_]+)_/g, '$1')
      .replace(/`[^`]+`/g, '')
      .replace(/^\s*[-*+>]\s*/gm, '')
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  function splitSentences(plain) {
    const safe = plain.replace(
      /\b(Mr|Mrs|Ms|Dr|Prof|Sr|Jr|St|Ave|Blvd|vs|etc|U\.S|i\.e|e\.g|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\./g,
      (m) => m.slice(0, -1) + '\x00'
    )
    return safe
      .split(/(?<=[.!?])\s+(?=[A-Z"'"])/)
      .map((s) => s.replace(/\x00/g, '.').trim())
      .filter(Boolean)
  }

  // Walk paragraphs in order, accumulate sentences until we hit n
  const paragraphs = markdown.split(/\n\n+/)
  const resultParagraphs = []
  let total = 0

  for (const para of paragraphs) {
    if (total >= n) break
    const plain = cleanParagraph(para)
    if (!plain) continue
    const sentences = splitSentences(plain)
    if (!sentences.length) continue
    const needed = n - total
    resultParagraphs.push(sentences.slice(0, needed).join(' '))
    total += Math.min(sentences.length, needed)
  }

  return resultParagraphs.join('\n\n') || markdown.slice(0, 500)
}

export function getAllArticles() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))

  return files
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(articlesDir, fileName), 'utf8')
      const { data, content } = matter(raw)
      const stats = readingTime(content)
      return {
        ...data,
        slug,
        readingTime: Math.ceil(stats.minutes),
        date: data.date ? new Date(data.date).toISOString() : '',
        excerpt: extractSentences(content, 5),
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getArticlesByCategory(categorySlug) {
  const slugToLabel = {
    sports: 'Sports',
    music: 'Music',
    'tv-film': 'TV & Film',
    relationships: 'Relationships',
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
  return { slug, ...data, contentHtml, readingTime: Math.ceil(stats.minutes), date: data.date ? new Date(data.date).toISOString() : '' }
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

export function getArticlesByTag(tag) {
  return getAllArticles().filter(a =>
    Array.isArray(a.tags) && a.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags() {
  const tags = new Set()
  getAllArticles().forEach(a => {
    if (Array.isArray(a.tags)) a.tags.forEach(t => tags.add(t))
  })
  return Array.from(tags)
}
