import { serve } from "https://deno.land/std/http/server.ts";

const targetUrl = "https://vekun.com";
const port = 80;

const server = serve({ port });
console.log(`HTTP proxy server running on http://localhost:${port}`);

for await (const req of server) {
  const url = new URL(targetUrl + req.url);
  const proxyReqInit: RequestInit = {
    method: req.method,
    headers: req.headers,
    body: req.body,
  };

  try {
    const response = await fetch(url, proxyReqInit);
    const responseHeaders = new Headers(response.headers);

    req.respond({
      status: response.status,
      headers: responseHeaders,
      body: response.body,
    });
  } catch (error) {
    console.error("Error proxying request:", error);

    req.respond({
      status: 500,
      body: "Internal Server Error",
    });
  }
}