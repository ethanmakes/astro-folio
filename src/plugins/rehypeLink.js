import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

// 外链：补 rel/target 并追加外链图标（原行为）。
// 站内根相对链接（以 / 开头）：统一拼上部署 base 前缀，与全站 withBase() 口径一致，
// 内容作者继续写 /posts/... 的根相对地址即可，不需要感知子路径。
export function rehypeLink(options = {}) {
  const base = (options.base || '').replace(/\/$/, '')
  return (tree) => {
    visit(tree, { tagName: 'a' }, (node, index, parent) => {
      const href = node.properties.href
      if (typeof href !== 'string') return
      const isExternal = href.startsWith('http')
      if (isExternal) {
        node.properties = {
          ...node.properties,
          rel: 'noopener noreferrer',
          target: '_blank',
        }
        parent.children[index] = node
        const icon = h('i', { class: 'iconfont icon-external-link' })
        parent.children.splice(index + 1, 0, icon)
      } else if (
        base &&
        href.startsWith('/') &&
        href !== base &&
        !href.startsWith(`${base}/`)
      ) {
        node.properties = { ...node.properties, href: `${base}${href}` }
        parent.children[index] = node
      }
    })
  }
}
