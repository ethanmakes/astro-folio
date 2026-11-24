// 全站滚动状态：替代原 jotai scrollInfo atoms + PageScrollInfoProvider（lodash throttle 一并平替）。
// 维护 scrollY 与滚动方向，订阅者在每次滚动节流后收到最新状态。
// View Transitions 切换页面后监听器与状态继续有效（文档不重载）。

export interface ScrollState {
  y: number
  direction: 'up' | 'down' | null
}

let state: ScrollState = { y: 0, direction: null }
let prevY = 0
let started = false
const listeners = new Set<(s: ScrollState) => void>()

function emit() {
  listeners.forEach((cb) => cb(state))
}

function update() {
  let currentTop = document.documentElement.scrollTop

  if (currentTop === 0) {
    const bodyStyle = document.body.style
    if (bodyStyle.position === 'fixed') {
      const bodyTop = bodyStyle.top
      currentTop = Math.abs(parseInt(bodyTop, 10))
    }
  }

  const direction = prevY - currentTop > 0 ? 'up' : 'down'
  prevY = currentTop
  state = { y: currentTop, direction }
  emit()
}

// trailing 节流（与原 lodash throttle { leading: false } 行为一致）
let trailingTimer: number | null = null
function onScroll() {
  if (trailingTimer !== null) return
  trailingTimer = window.setTimeout(() => {
    trailingTimer = null
    update()
  }, 16)
}

export function getScrollState(): ScrollState {
  return state
}

export function onScrollStateChange(cb: (s: ScrollState) => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

export function startScrollTracking() {
  if (started) return
  started = true
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('astro:page-load', update)
}
