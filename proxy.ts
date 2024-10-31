Deno.serve(async (req) => {
  const url = new URL(req.url)
  url.hostname = 'api.openai.com'
  return fetch(url, {
    method: req.method,
    headers: {
      Authorization: req.headers.get('Authorization'),
      'Content-Type': req.headers.get('Content-Type'),
      'OpenAI-Beta': req.headers.get('OpenAI-Beta'),
    },
    body: req.body,
  })
})
