export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error || !code) {
    return postMessageResponse('error', null, error || 'No code received')
  }

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        code,
      }),
    })

    const data = await res.json()

    if (data.error || !data.access_token) {
      return postMessageResponse('error', null, data.error_description || 'Token exchange failed')
    }

    return postMessageResponse('success', data.access_token)
  } catch (err) {
    return postMessageResponse('error', null, err.message)
  }
}

function postMessageResponse(status, token, error) {
  // Decap CMS listens for a two-step handshake:
  // 1. popup sends "authorizing:github" to opener
  // 2. opener replies; popup sends the final auth message using e.origin
  const content = status === 'success'
    ? JSON.stringify({ token, provider: 'github' })
    : String(error)

  const message = `authorization:github:${status}:${content}`

  const html = `<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body>
<script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(${JSON.stringify(message)}, e.origin);
    window.close();
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body>
</html>`

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
