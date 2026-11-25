/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// 跨组件的 window 全局总线。各组件脚本会随 View Transitions 重复执行，
// 状态与「只绑定一次」守卫必须挂在 window 上跨闭包存活；在此集中声明，
// 让键名拼错在编译期就暴露，而不是运行时静默失效。

/** Header 顶栏二态的迟滞状态（见 Header.astro 的 getHeaderMetaState） */
interface FolioHeaderMetaState {
  meta: boolean
  minY: number
  maxY: number
}

/** ImageLightbox 的当前图片列表与索引（见 ImageLightbox.astro 的 getState） */
interface FolioLightboxState {
  items: { src: string; alt: string }[]
  index: number
}

/** Layout 注入的轻量 toast，形状与 src/scripts/toast.ts 的导出一致 */
interface FolioToast {
  success: (message: string) => void
  info: (message: string) => void
  error: (message: string) => void
}

declare global {
  /** pagefind 单条搜索结果的数据（SearchPanel 渲染实际用到的字段） */
  interface PagefindResultData {
    url: string
    excerpt: string
    meta: { title: string }
  }

  /** pagefind 单条结果句柄，data() 异步取出完整数据 */
  interface PagefindSearchResult {
    data: () => Promise<PagefindResultData>
  }

  /** pagefind 运行时模块（构建后生成于 /pagefind/pagefind.js，官方无类型声明） */
  interface Pagefind {
    search: (term: string) => Promise<{ results: PagefindSearchResult[] }>
  }

  interface Window {
    /** SearchPanel 注册，Header 的搜索按钮调用 */
    __openSearch?: () => void
    toast?: FolioToast
    __headerMetaState?: FolioHeaderMetaState
    __lightboxState?: FolioLightboxState
    /* 以下为各组件「全局监听只绑定一次」的守卫标志 */
    __searchHotkeyBound?: boolean
    __headerScrollBound?: boolean
    __themeMediaBound?: boolean
    __tocScrollBound?: boolean
    __readingProgressBound?: boolean
    __readingProgressBarBound?: boolean
    __lightboxGlobalBound?: boolean
    __backToTopBound?: boolean
    __postCardHoverBound?: boolean
  }
}

export {}
