# Deno OpenAI proxy

很多VPS代理OpenAI api被封，可以采用Deno Deploy免费服务来做代理，可以在国内直接访问。

## 一键部署

[![](https://res.vekun.com/uploads/default-1684132897262.svg)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/wenyikun/deno-proxy/master/proxy.ts)

## 调用示例

```js
const axios = require('axios')

axios.post("https://xxx.deno.dev/v1/chat/completions", {
  "model": "gpt-3.5-turbo",
  "messages": [{ "role": "user", "content": "Hello!" }],
  "stream": true
}, {
  responseType: "stream",
  headers: {
    "Authorization": 'Bearer $OPENAI_API_KEY'
  }
}).then(resp => {
  resp.data.on("data", (chunk) => {
    console.log(chunk.toString())
  })
})
```
