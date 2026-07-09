// One-time script to generate public/images/logo-og.png
// Usage: node scripts/generate-og-logo.mjs

import sharp from 'sharp'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const CANVAS_W = 1200
const CANVAS_H = 630
// Logo scaled to 1000px wide, height derived from SVG viewBox ratio (2250:750 = 3:1)
const LOGO_W = 1000
const LOGO_H = Math.round(LOGO_W * 750 / 2250) // 333px

const svgBuffer = readFileSync(join(root, 'public/images/logo.svg'))

const logoBuffer = await sharp(svgBuffer)
  .resize(LOGO_W, LOGO_H, { fit: 'fill' })
  .toBuffer()

await sharp({
  create: {
    width: CANVAS_W,
    height: CANVAS_H,
    channels: 3,
    background: { r: 0, g: 0, b: 0 },
  },
})
  .composite([{
    input: logoBuffer,
    left: Math.round((CANVAS_W - LOGO_W) / 2),
    top: Math.round((CANVAS_H - LOGO_H) / 2),
  }])
  .png()
  .toFile(join(root, 'public/images/logo-og.png'))

console.log(`Generated public/images/logo-og.png (${CANVAS_W}x${CANVAS_H}, logo ${LOGO_W}x${LOGO_H} centered)`)
