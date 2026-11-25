import rehypeShiki from '@shikijs/rehype'

export const rehypeCodeHighlight = [
  rehypeShiki,
  {
    themes: {
      // 浅色用高对比变体：原 github-light 的字符串绿 #22863A 在代码底色上只有 4.2:1，
      // 过不了 WCAG AA（Lighthouse 无障碍扣分）；HC 版同色系、对比达标。
      light: 'github-light-high-contrast',
      dark: 'github-dark',
    },
    defaultColor: false,
  },
]
