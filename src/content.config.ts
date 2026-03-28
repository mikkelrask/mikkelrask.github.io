import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    update: z.coerce.date().optional(),
    category: z.union([z.string(), z.array(z.string())]).default([]).transform(val => Array.isArray(val) ? val : [val]),
    tags: z.array(z.string()).default([]),
    series: z.union([z.string(), z.array(z.string())]).optional().transform(val => val ? (Array.isArray(val) ? val : [val]) : []),
    draft: z.boolean().default(false),
    frontpageImage: z.boolean().optional(),
    image: image().optional(),
  }),
});

export const collections = { posts };
