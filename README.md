# astro-folio

A clean, fast blog theme for Astro — rebuilt from [astro-gyoza](https://github.com/lxchapu/astro-gyoza) on the latest stack.

![astro version](https://img.shields.io/badge/astro-7.4-red)
![node version](https://img.shields.io/badge/node-%3E%3D22.12-green)

astro-folio 是在 astro-gyoza 基础上的一次现代化重构：外观与功能保持不变，技术栈全面升级。

## 🔄 与原版的区别

- **Astro 4 → 7**，内容集合迁移到 Content Layer API（glob loader）
- **移除 React 整套**：react / framer-motion / jotai / Radix 全部下线，33 个组件逐项用 Astro 组件 + 原生脚本 / CSS 等价平替，客户端 JS 大幅瘦身
- **Tailwind CSS v3 → v4**（@tailwindcss/vite 插件，CSS 优先配置）
- 页面切换改用 Astro 内置 View Transitions（原 @swup/astro 移除）
- toast 改为自写轻量实现（原 react-toastify 移除）
- 分享二维码改为构建期静态生成（原 qrcode.react 移除）
- 移除 Waline 评论（需单独部署服务端，与纯静态方案冲突；文章 `comments` 字段保留，将来可接 giscus 等零后端方案）
- 文章 `category` 正式确立为一等字段，与 `tags` 并存（缺失时默认「未分类」）

原版小功能全部保留：特殊日期变灰、404 手电筒、运行天数、全站字数统计、归档页年度/今日进度、文章过期提示、相对时间显示、pagefind 全文搜索、夜间模式。

## 🎉 Features

- ✅ 有着规范的 URL 和 OpenGraph 信息，对 SEO 友好
- ✅ 支持站点地图
- ✅ 支持 RSS 订阅
- ✅ 支持夜间模式
- ✅ 特殊日期变灰
- ✅ 简单干净的配色和主题
- ✅ 支持代码高亮

## 🔧 Tech Stack

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pagefind](https://pagefind.app/)

## 🚀 Project Structure

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── pages/
│   ├── plugins/
│   ├── scripts/
│   ├── styles/
│   ├── utils/
│   └── config.json
├── astro.config.js
├── README.md
├── package.json
└── tsconfig.json
```

网站配置保存在 `src/config.json` 文件。文章放在 `src/content/posts/`，frontmatter 字段：`title`、`date`、`lastMod`、`summary`、`cover`、`category`、`tags`、`comments`、`draft`、`sticky`。

## 🧞 Commands

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `pnpm i`       | Installs dependencies                        |
| `pnpm dev`     | Starts local dev server at `localhost:4321`  |
| `pnpm build`   | Build your production site to `./dist/`（含 astro check 与 pagefind 索引） |
| `pnpm preview` | Preview your build locally, before deploying |
| `pnpm new-post` | Create a new post                           |

## 🙏 Acknowledgements

本项目 fork 自 [lxchapu](https://github.com/lxchapu) 的 [astro-gyoza](https://github.com/lxchapu/astro-gyoza)，设计与原始实现归原作者所有，特此致谢。

本主题由 Ethan 与 AI 搭子 Muse 共同重构与设计。

## 📄 License

[MIT](./LICENSE) — 与原项目保持一致。原项目版权归 lxchapu 所有，详见 LICENSE 文件。
