import { serve } from "https://deno.land/std/http/server.ts";

const TARGET = "https://api.openai.com";

serve(async (request: Request) => {
  const url = new URL(request.url);
  url.host = TARGET

  return await fetch(url, request)
})
