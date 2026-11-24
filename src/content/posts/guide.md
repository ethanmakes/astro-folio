---
title: 欢迎使用 Folio
date: 2026-11-24
lastMod: 2026-11-25T00:00:00.000Z
summary: Folio 是一款简洁、快速的 Astro 博客主题。本文介绍它的特性、安装方式与基本配置。
category: 教程
tags: [Astro, Folio]
sticky: 1
---

Folio 是一款 Astro 博客主题，追求简洁与快速。它基于上游主题 [astro-gyoza](https://github.com/lxchapu/astro-gyoza) 重构而来，保留了原有的设计与使用体验，技术栈则全面升级到当前最新版本，并移除了全部 React 运行时。在此向原作者表示感谢。

## 特性

- **最新技术栈**：Astro 7 + Tailwind CSS 4，内容集合使用 Content Layer API 管理。
- **零 React 运行时**：所有组件均为 Astro 组件与原生脚本，页面更轻，加载更快。
- **全文搜索**：构建时通过 pagefind 生成索引，无需任何后端服务。
- **明暗双色**：内置亮色与暗色模式，可跟随系统或手动切换。
- **流畅的页面切换**：基于 Astro 内置 View Transitions，翻页不刷新整页。
- **丰富的 Markdown 渲染**：代码高亮、KaTeX 数学公式、脚注、剧透块，以及 CodePen / YouTube / Bilibili 嵌入指令。
- **分类与标签**：文章同时支持 category 与 tags 两种组织方式。
- **开箱即用的页面**：归档、项目、友链、关于页面齐备，内容都是普通的 Markdown 与 YAML 文件。

## 快速开始

### 环境要求

- Node.js >= 22.12
- pnpm（推荐的包管理器）

### 安装

```sh
git clone https://github.com/ethanmakes/astro-folio.git
cd astro-folio
pnpm install
```

### 常用命令

本地开发（带热更新）：

```sh
pnpm dev
```

构建（类型检查 + 静态构建 + 生成搜索索引）：

```sh
pnpm build
```

本地预览构建产物：

```sh
pnpm preview
```

## 配置

绝大部分配置集中在 `src/config.json` 一个文件中，包括站点标题与地址、作者信息、首页社交链接、菜单、配色、页脚起始时间等。开始使用前，请先把 `site.url` 改成你自己的域名，其余项目按需修改即可。

需要特别说明的两项：

- `sponsor.wechat`：微信赞赏码图片地址。留空时，文章页的赞赏入口会自动隐藏。
- `analytics`：网站统计配置，默认关闭；填入对应服务的 ID 并将 `enable` 改为 `true` 后生效。

## 写文章

文章存放在 `src/content/posts/` 目录下，每篇是一个 Markdown 文件，通过 frontmatter 声明标题、日期、分类、标签等信息。也可以运行脚手架命令按提示创建：

```sh
pnpm new-post
```

本站自带的另外三篇文章分别展示了 Markdown 的渲染效果、图标的用法，以及在文章中嵌入外部内容的方法，可以作为写作时的参考。

### 文章系列

连载文章可以在 frontmatter 里声明同一个 `series`（系列名），归为一个系列：

```yaml
series: 我的系列名
seriesOrder: 1
```

当某个系列至少有 2 篇文章时，每篇文末、上/下一篇导航上方会出现系列框，列出全部篇目并高亮当前篇。系列内优先按 `seriesOrder` 升序排列；未填写 `seriesOrder` 的文章按发布日期排在已填写的之后。只有一篇文章的系列不会渲染系列框。

## 部署

构建产物是纯静态文件，可以部署到任何静态托管平台，例如 GitHub Pages、Cloudflare Pages、Vercel，或者你自己的服务器。部署前请确认 `site.url` 已改为正式域名。
