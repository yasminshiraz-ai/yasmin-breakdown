import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const authorsDir = path.join(process.cwd(), 'content/authors')

export function getAllAuthors() {
  if (!fs.existsSync(authorsDir)) return []
  return fs.readdirSync(authorsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const raw = fs.readFileSync(path.join(authorsDir, f), 'utf8')
      const { data } = matter(raw)
      return data
    })
}

export function getAuthorBySlug(slug) {
  const filePath = path.join(authorsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const { data } = matter(fs.readFileSync(filePath, 'utf8'))
  return data
}

export async function getAuthorContent(slug) {
  const filePath = path.join(authorsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
  const processed = await remark().use(html, { sanitize: false }).process(content)
  return { ...data, fullBioHtml: processed.toString() }
}

export function getAllAuthorSlugs() {
  if (!fs.existsSync(authorsDir)) return []
  return fs.readdirSync(authorsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}
