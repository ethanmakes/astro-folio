---
title: Markdown 语法展示
date: 2026-11-24
summary: 这篇文章展示了 Folio 对常用 Markdown 语法的渲染效果，包括标题、列表、表格、代码块、公式等。
category: 例子
tags: [Markdown]
---

下面是一些基本的 Markdown 语法示例，方便你在写作时预览 Folio 的渲染效果。

## 标题

文章标题由 frontmatter 中的 `title` 自动生成，正文中建议从二级标题开始使用，避免层级过深，一般到三级标题就够了。

### 三级标题

#### 四级标题

## 段落与换行

这是第一个段落。段落之间用一个空行分隔。

在行尾加上两个空格，
可以在段落内强制换行。

## 图片

小尺寸图片：

![示例图片](https://picsum.photos/seed/folio/250/400)

大尺寸图片：

![示例图片](https://picsum.photos/seed/folio/1200/900)

带标题的图片：

![示例图片](https://picsum.photos/seed/folio/400/300 '图片标题')

## 强调与删除线

这是**加粗的内容**，这是*斜体的内容*，这是~~被删除的内容~~。

## 引用

> 引用一段来自其他来源的文字。引用内部同样可以使用 **Markdown** 语法。

嵌套引用：

> 外层引用
>
> > 内层引用

带脚注的引用：

> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: 出自 Rob Pike 在 Gopherfest 2015 上的演讲。

## 分割线

---

## 链接

内部链接：[欢迎使用 Folio](/posts/guide)

外部链接：[Astro 文档](https://docs.astro.build/)

自动链接：<https://github.com>

邮箱地址：<mail@example.com>

## 表格

单元格对齐：

| Name  | Age |  Fruit |
| :---- | :-: | -----: |
| Bob   | 27  |  Apple |
| Alice | 23  | Banana |
| John  | 28  | Orange |

单元格内可以使用行内 Markdown：

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |

## 代码块

行内代码使用反引号包裹，例如 `pnpm build`。

带语言标注的代码块会启用语法高亮：

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

```ts
const greeting: string = 'hello, Folio'
console.log(greeting)
```

## KaTeX 公式

使用 `$` 包裹行内公式，例如：$E = mc^2$。

使用 `$$` 包裹独立公式：

$$
e^{i\pi} + 1 = 0
$$

也可以使用 ` ```math ` 代码块：

```math
\oint_{\partial V} \mathbf{E} \cdot d\mathbf{A} = \frac{Q}{\epsilon_0}
```

## 列表

有序列表：

1. 第一项
2. 第二项
3. 第三项

无序列表：

- 列表项
- 另一项
- 再一项

嵌套列表：

- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese

## 其他行内元素

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.

## 剧透

在正文中可以隐藏一段内容，鼠标悬浮时才会显示：||这段内容默认隐藏||

写法如下：

```md
||隐藏的内容||
```
