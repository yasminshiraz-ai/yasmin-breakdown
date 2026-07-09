export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

  if (!apiKey || apiKey === 'your_youtube_api_key_here') {
    return Response.json({ error: 'API key not configured' }, { status: 503 })
  }

  try {
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=YasminShiraz&key=${apiKey}`,
      { cache: 'no-store' }
    )
    const channelData = await channelRes.json()
    const uploadsId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null

    if (!uploadsId) {
      return Response.json({ channelData, uploadsId: null, error: 'No uploadsId found' })
    }

    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=36&key=${apiKey}`,
      { cache: 'no-store' }
    )
    const playlistData = await playlistRes.json()
    const playlistItemCount = playlistData.items?.length ?? 0
    const videoIds = playlistData.items?.map(item => item.snippet.resourceId.videoId).join(',') || ''

    if (!videoIds) {
      return Response.json({ channelData, uploadsId, playlistItemCount, error: 'No video IDs from playlist' })
    }

    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${videoIds}&key=${apiKey}`,
      { cache: 'no-store' }
    )
    const statsData = await statsRes.json()
    const statsItemCount = statsData.items?.length ?? 0
    const firstVideoContentDetails = statsData.items?.[0]?.contentDetails ?? null

    return Response.json({
      channelData,
      uploadsId,
      playlistItemCount,
      statsItemCount,
      firstVideoContentDetails,
      error: null,
    })
  } catch (err) {
    return Response.json({ error: err?.message ?? String(err) }, { status: 500 })
  }
}
