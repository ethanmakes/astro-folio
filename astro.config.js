import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import { remarkReadingTime } from './src/plugins/remarkReadingTime'
import { rehypeCodeBlock } from './src/plugins/rehypeCodeBlock'
import { rehypeTableBlock } from './src/plugins/rehypeTableBlock'
import { rehypeCodeHighlight } from './src/plugins/rehypeCodeHighlight'
import { rehypeImage } from './src/plugins/rehypeImage'
import { rehypeLink } from './src/plugins/rehypeLink'
import { rehypeHeading } from './src/plugins/rehypeHeading'
import remarkDirective from 'remark-directive'
import { remarkSpoiler } from './src/plugins/remarkSpoiler'
import { remarkEmbed } from './src/plugins/remarkEmbed'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// 站点地址的唯一事实源是 src/config.json 的 site.url（含子路径的完整地址）。
// 这里用 URL 拆分：origin 喂给 site，pathname 喂给 base——Astro 的 site 若再带路径
// 会与 base 重复拼接，所以必须拆开。更换部署地址只需改 config.json 的 site.url
// 一处：部署到根路径就写不带子路径的地址，base 会自动变为 '/'。
import { readFileSync } from 'node:fs'
const { site: siteConfig } = JSON.parse(
  readFileSync(new URL('./src/config.json', import.meta.url), 'utf-8'),
)
const siteUrl = new URL(siteConfig.url)
const SITE_ORIGIN = siteUrl.origin
const BASE = siteUrl.pathname.replace(/\/+$/, '') || '/'

// https://astro.build/config
export default defineConfig({
  site: SITE_ORIGIN,
  base: BASE,
  // Astro 7 起默认 'jsx' 会吞掉行内空格，显式恢复 v4 的 true 行为
  compressHTML: true,
  integrations: [sitemap()],
  markdown: {
    // 必须关掉 Astro 内置高亮：它排在用户 rehype 插件之前执行，会吃掉 code 上的
    // language-* 类名，rehypeCodeBlock 读不到语言只能兜底显示 text。
    // 注意 unified() 工厂不接收 syntaxHighlight，写在里面会被静默忽略。
    syntaxHighlight: false,
    // Astro 7 默认 Sätteri 处理器不支持自定义 remark/rehype 插件，显式切回 unified 管线
    processor: unified({
      smartypants: false,
      remarkPlugins: [remarkMath, remarkDirective, remarkEmbed, remarkSpoiler, remarkReadingTime],
      rehypePlugins: [
        rehypeHeadingIds,
        rehypeKatex,
        [rehypeLink, { base: BASE }],
        rehypeImage,
        rehypeHeading,
        rehypeCodeBlock,
        rehypeCodeHighlight,
        rehypeTableBlock,
      ],
      remarkRehype: { footnoteLabel: '参考', footnoteBackLabel: '返回正文' },
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        // pagefind 运行时由构建后 CLI 生成到 dist/pagefind，不参与打包；
        // 客户端以「base + pagefind/pagefind.js」动态加载，此处按后缀放行任意 base 前缀
        external: [/\/pagefind\/pagefind\.js$/],
      },
    },
  },
})
