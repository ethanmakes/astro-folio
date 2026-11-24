import type { APIRoute } from 'astro'

// import.meta.env.SITE 只有源（origin），sitemap 地址要再拼部署 base 子路径；
// 本版本 BASE_URL 为 '/astro-folio'（无尾斜杠），先归一化再拼接。
const base = import.meta.env.BASE_URL.replace(/\/$/, '')

const robotsTxt = `
User-agent: *
Allow: /

Disallow: ${base}/_astro/
Disallow: ${base}/fonts/

Sitemap: ${import.meta.env.SITE}${base}/sitemap-index.xml
`.trim()

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
