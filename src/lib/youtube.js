const PLAYLIST_ID = 'PL6MibiTEez58kGrd2wX9FoGRzOdWlQpGR'

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
