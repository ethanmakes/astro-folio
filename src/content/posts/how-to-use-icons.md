---
title: 如何在 Folio 中使用图标？
date: 2026-11-24
tags: [Icon]
category: 教程
comments: true
draft: false
---

Folio 使用 font-class 的方式引用图标。图标主要来源于 [Remix Icon](https://remixicon.com/)，通过 [iconfont](https://www.iconfont.cn/) 管理并导出为字体文件，随项目一起发布，不依赖任何外部图标服务。

## 在配置中使用

首页的社交链接、顶部菜单等位置都通过配置指定图标。在 `src/config.json` 对应条目的 `icon` 字段中，填写以 `icon-` 开头的图标类名即可，例如：

```json
{
  "name": "Github",
  "icon": "icon-github",
  "url": "https://github.com/ethanmakes/astro-folio"
}
```

## 在组件中使用

在 Astro 组件或文章的 HTML 中，直接写一个带类名的 `<i>` 元素：

```html
<i class="iconfont icon-github"></i>
```

图标会以当前文字颜色与字号渲染，可以像普通文字一样通过 CSS 调整大小和颜色。

## 为什么用字体图标？

- **不依赖外部服务**：图标字体随站点一起部署，加载不经过第三方服务器。
- **用法统一**：Astro 组件、原生脚本与 Markdown 注入的内容都只需要一个类名，不需要在页面里内联大量 SVG 代码。
- **体积可控**：主题用到的图标数量不多，打包成一个字体文件足够轻量，HTML 也更干净。

代价是图标集合变更时需要同步更新字体文件与样式文件，管理上不如图标库灵活。如果你的站点需要大量图标，可以自行评估其他方案。

## 自定义图标

如需替换整套图标，请修改以下文件：

```text
public/fonts/iconfont.ttf
public/fonts/iconfont.woff
public/fonts/iconfont.woff2
src/styles/iconfont.css
```

注意，这会替换项目中使用的全部图标。替换前请确认新图标的类名与现有配置对应，否则相关位置的图标将无法显示。
