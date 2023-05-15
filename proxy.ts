import { serve } from "https://deno.land/std/http/server.ts";

const PORT = 80;
const TARGET = "https://example.com";

const server = serve({ port: PORT });

console.log(`Proxy listening on port ${PORT}`);

for await (const req of server) {
  const url = new URL(req.url);
  const targetUrl = new URL(TARGET + url.pathname + url.search);

  const targetReq = await fetch(targetUrl.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  const headers = new Headers(targetReq.headers);
  headers.set("access-control-allow-origin", "*");

  const body = new Uint8Array(await targetReq.arrayBuffer());

  req.respond({
    status: targetReq.status,
    headers: headers,
    body: body,
  });
}