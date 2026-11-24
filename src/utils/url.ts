// 链接生成的单一事实源：所有站内根相对路径统一经此拼上部署 base。
// import.meta.env.BASE_URL 在本版本为 '/astro-folio'（无尾斜杠，根部署时为 '/'），
// 这里先剥尾斜杠归一化，调用方无需关心。
// config.json 与内容数据里的路径保持根相对语义（如 '/posts/guide'），
// 只在最终生成 href/src 的位置调用本函数补前缀，避免双重拼接。
const basePrefix = import.meta.env.BASE_URL.replace(/\/$/, '')

export function withBase(path: string): string {
  if (!path.startsWith('/')) return path
  if (!basePrefix) return path
  if (path === basePrefix || path.startsWith(`${basePrefix}/`)) return path
  return `${basePrefix}${path}`
}
