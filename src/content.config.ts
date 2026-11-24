// Content Layer API（Astro 7）：集合定义从 src/content/config.ts 迁入此文件。
// category 按 Ethan 拍板正式确立为一等字段，与 tags 并存；缺失时默认「未分类」。
import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lastMod: z.date().optional(),
    summary: z.string().optional(),
    cover: z.string().optional(),
    category: z.string().default('未分类'),
    tags: z.array(z.string()).default([]),
    comments: z.boolean().default(true),
    draft: z.boolean().default(false),
    sticky: z.number().default(0),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    link: z.url(),
  }),
})

const spec = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/spec' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    comments: z.boolean().default(true),
  }),
})

const friends = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/friends' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    avatar: z.string(),
    link: z.url(),
  }),
})

export const collections = { posts, projects, spec, friends }
