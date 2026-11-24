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
import { site } from './src/config.json'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// https://astro.build/config
export default defineConfig({
  site: site.url,
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
        rehypeLink,
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
        external: ['/pagefind/pagefind.js'],
      },
    },
  },
})
