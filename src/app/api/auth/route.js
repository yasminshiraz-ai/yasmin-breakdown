export const dynamic = 'force-dynamic'

export async function GET() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID
  if (!clientId) {
    return new Response('GITHUB_OAUTH_CLIENT_ID is not set', { status: 500 })
  }

  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'repo,user',
  })

  return Response.redirect(
    `https://github.com/login/oauth/authorize?${params}`,
    302
  )
}
