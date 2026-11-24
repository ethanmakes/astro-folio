---
title: 在文章中嵌入视频和代码
date: 2026-11-24
lastMod: 2026-11-24T00:00:00.000Z
tags: [Video, Markdown]
category: 例子
summary: 这篇文章介绍了如何使用嵌入指令，在文章中插入 CodePen、YouTube 与 Bilibili 的内容。
---

Folio 支持一组嵌入指令（directive），在 Markdown 中写一行就能把外部内容嵌进文章。下面是三种常用的嵌入方式。

## CodePen

写法：

```md
::codepen{#PrQKgo author="simeydotme"}
```

效果（simeydotme 的 Pokemon Card Holo Effect）：

::codepen{#PrQKgo author="simeydotme"}

## YouTube

写法：

```md
::youtube{#dQw4w9WgXcQ}
```

效果（Rick Astley - Never Gonna Give You Up）：

::youtube{#dQw4w9WgXcQ}

## Bilibili

写法：

```md
::bilibili{#BV1GJ411x7h7}
```

效果（罗翔说刑法）：

::bilibili{#BV1GJ411x7h7}
