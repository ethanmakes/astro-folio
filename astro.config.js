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

// GitHub Pages 项目页部署：站点根为 ethanmakes.github.io，主题挂在 /astro-folio 子路径下。
// site 只写源（origin），子路径由 base 承担；config.json 的 site.url 是含子路径的完整地址，
// 两者不要混用（Astro 的 site 配置若再带路径会与 base 重复拼接）。
const SITE_ORIGIN = 'https://ethanmakes.github.io'
const BASE = '/astro-folio'

// https://astro.build/config
export default defineConfig({
  site: SITE_ORIGIN,
  base: BASE,
  // Astro 7 起默认 'jsx' 会吞掉行内空格，显式恢复 v4 的 true 行为
  compressHTML: true,
  integrations: [sitemap()],
  markdown: {
    // Astro 7 默认 Sätteri 处理器不支持自定义 remark/rehype 插件，显式切回 unified 管线
    processor: unified({
      syntaxHighlight: false,
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
