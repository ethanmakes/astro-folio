// 轻量 toast：替代 react-toastify。
// 行为与原版保持一致：右下角、3s 自动消失、带关闭按钮、bg-primary/text-primary + border 样式。
// 用法与 react-toastify 相同：toast.success('已复制到剪贴板')

const AUTO_CLOSE = 3000

function getContainer() {
  let container = document.getElementById('toast-container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'toast-container'
    container.className = 'fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-2'
    document.body.appendChild(container)
  }
  return container
}

function showToast(message: string) {
  const container = getContainer()

  const el = document.createElement('div')
  el.className =
    'bg-primary text-primary text-sm border border-primary shadow-lg rounded-lg pl-4 pr-2 py-3 flex items-center gap-3 toast-enter'
  el.setAttribute('role', 'status')

  const text = document.createElement('span')
  text.textContent = message
  el.appendChild(text)

  const closeBtn = document.createElement('button')
  closeBtn.type = 'button'
  closeBtn.setAttribute('aria-label', 'Close Toast')
  closeBtn.className = 'text-lg opacity-50 hover:opacity-100 leading-none'
  closeBtn.innerHTML = '<i class="iconfont icon-close"></i>'
  el.appendChild(closeBtn)

  let timer = window.setTimeout(dismiss, AUTO_CLOSE)
  function dismiss() {
    window.clearTimeout(timer)
    el.classList.add('toast-leave')
    el.addEventListener('animationend', () => el.remove(), { once: true })
    // 动画缺失时兜底移除
    window.setTimeout(() => el.remove(), 350)
  }
  closeBtn.addEventListener('click', dismiss)

  container.appendChild(el)
}

export const toast = {
  success: showToast,
  info: showToast,
  error: showToast,
}
