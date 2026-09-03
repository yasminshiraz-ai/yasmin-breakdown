const PLAYLIST_ID = 'PL6MibiTEez58kGrd2wX9FoGRzOdWlQpGR'

function extractDescription(raw) {
  if (!raw) return ''
  const lines = raw.split('\n').filter(line => {
    const t = line.trim()
    if (!t) return false
    if (/^https?:\/\/\S*$/.test(t)) return false   // URL-only line
    if (/^(#\w+\s*)+$/.test(t)) return false        // hashtag-only line
    if (/^\d{1,2}:\d{2}/.test(t)) return false      // timestamp line (e.g. "0:00 Intro")
    if (/^@\w+$/.test(t)) return false              // bare handle line
    return true
  })
  const text = lines.join(' ')
    .replace(/https?:\/\/\S+/g, '')  // strip inline URLs
    .replace(/\s{2,}/g, ' ')
    .trim()
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  return sentences.slice(0, 3).join(' ').trim()
}

export async function getYouTubeVideos(maxResults = 36) {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

  if (!apiKey || apiKey === 'your_youtube_api_key_here') {
    return { videos: [], configured: false }
  }

  try {
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=${maxResults}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    )
    const playlistData = await playlistRes.json()
    const videoIds = playlistData.items?.map(item => item.snippet.resourceId.videoId).join(',')

    if (!videoIds) return { videos: [], configured: true }

    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    )
    const statsData = await statsRes.json()

    const videos = statsData.items?.map(v => ({
      id: v.id,
      title: v.snippet.title,
      thumbnail: v.snippet.thumbnails?.high?.url || v.snippet.thumbnails?.default?.url,
      viewCount: Number(v.statistics.viewCount).toLocaleString(),
      publishedAt: v.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${v.id}`,
      description: extractDescription(v.snippet.description),
    })) || []

    return { videos, configured: true }
  } catch (err) {
    console.error('YouTube API error:', err)
    return { videos: [], configured: true }
  }
}

export function formatPublishedDate(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
