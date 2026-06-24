export const revalidate = 3600

import { getYouTubeVideos } from '@/lib/youtube'

export async function GET() {
  const result = await getYouTubeVideos(3)
  return Response.json(result)
}
