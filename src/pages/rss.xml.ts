import rss from '@astrojs/rss'
import { site } from '@/config.json'
import { getSortedPosts } from '@/utils/content'
import { withBase } from '@/utils/url'

export async function GET() {
  const sortedPosts = await getSortedPosts()

  return rss({
    title: site.title,
    description: site.description,
    // 用 config 的完整站点地址（含 base 子路径）：context.site 只有 origin，
    // 频道 link 会丢子路径；条目 link 经 new URL 绝对路径拼接，不会重复叠加。
    site: site.url,
    items: sortedPosts.map((post) => ({
      // @astrojs/rss 只拼 site 源，条目链接需自带 base 前缀
      link: withBase(`/posts/${post.id}`),
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
    })),
    customData: `<language>${site.lang}</language>`,
  })
}
