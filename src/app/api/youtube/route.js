export const revalidate = 3600 // re-fetch every hour

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey || apiKey === 'your_youtube_api_key_here') {
    return Response.json({ videos: [], configured: false })
  }

  try {
    // Resolve channel ID from the @YasminShiraz handle
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=YasminShiraz&key=${apiKey}`
    )
    const channelData = await channelRes.json()
    const uploadsId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsId) {
      return Response.json({ videos: [], error: 'Channel not found' }, { status: 404 })
    }

    // Get 3 most recent video IDs from uploads playlist
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=3&key=${apiKey}`
    )
    const playlistData = await playlistRes.json()
    const videoIds = playlistData.items
      ?.map(item => item.snippet.resourceId.videoId)
      .join(',')

    if (!videoIds) {
      return Response.json({ videos: [] })
    }

    // Fetch statistics + snippet for each video
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`
    )
    const statsData = await statsRes.json()

    const videos = statsData.items?.map(v => ({
      id: v.id,
      title: v.snippet.title,
      thumbnail: v.snippet.thumbnails?.high?.url || v.snippet.thumbnails?.default?.url,
      viewCount: Number(v.statistics.viewCount).toLocaleString(),
      url: `https://www.youtube.com/watch?v=${v.id}`,
    })) || []

    return Response.json({ videos, configured: true })
  } catch (err) {
    console.error('YouTube API error:', err)
    return Response.json({ videos: [], error: 'API error' }, { status: 500 })
  }
}
