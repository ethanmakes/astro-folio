// 文章阅读进度的唯一口径：顶栏进度线（ReadingProgressBar）与侧栏百分比
// （ReadingProgress）共用此函数，保证两处显示永远一致。
// 以 #markdown-wrapper 为正文：可滚动距离 = 正文顶部偏移 + 正文高度 − 视口高度。
// 正文不存在时退回整页口径；正文短于视口（无可滚距离）时视为已读完，返回 1。
export function getReadingProgress(): number {
  const y = window.scrollY
  const article = document.querySelector<HTMLElement>('#markdown-wrapper')

  if (!article) {
    const total = document.documentElement.scrollHeight - window.innerHeight
    return total > 0 ? Math.min(1, Math.max(0, y / total)) : 0
  }

  const total = article.offsetTop + article.offsetHeight - window.innerHeight
  if (total <= 0) return 1
  return Math.min(1, Math.max(0, y / total))
}
