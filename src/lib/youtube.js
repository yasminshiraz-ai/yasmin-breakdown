export async function getYouTubeVideos(maxResults = 12) {
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey || apiKey === 'your_youtube_api_key_here') {
    return { videos: [], configured: false }
  }

  try {
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=YasminShiraz&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    )
    const channelData = await channelRes.json()
    const uploadsId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsId) return { videos: [], configured: true }

    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=${maxResults}&key=${apiKey}`,
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
