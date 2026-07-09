export async function getYouTubeVideos(maxResults = 36) {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

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
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${videoIds}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    )
    const statsData = await statsRes.json()

    console.log('[youtube] items fetched:', statsData.items?.length, '| sample contentDetails:', statsData.items?.[0]?.contentDetails)

    const videos = (statsData.items || [])
      .filter(v => {
        try {
          const dur = v.contentDetails?.duration || ''
          const m = dur.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
          if (!m) return true
          const seconds = (Number(m[1] || 0) * 3600) + (Number(m[2] || 0) * 60) + Number(m[3] || 0)
          return seconds > 90
        } catch {
          return true
        }
      })
      .map(v => ({
        id: v.id,
        title: v.snippet.title,
        thumbnail: v.snippet.thumbnails?.high?.url || v.snippet.thumbnails?.default?.url,
        viewCount: Number(v.statistics.viewCount).toLocaleString(),
        publishedAt: v.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${v.id}`,
      }))

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
