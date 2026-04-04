// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('shiki').ShikiTransformer} */
const transformerLineNumbers = {
  name: 'line-numbers',
  line(node, line) {
    node.properties['data-line'] = line;
  }
};

// https://astro.build/config
export default defineConfig({
  site: "https://mikkelrask.github.io",
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: 'ayu-light',
        dark: 'vesper',
      },
      wrap: true,
      transformers: [
        transformerLineNumbers,
      ],
    }
  },
  vite: {
    ssr: {
      noExternal: ['styled-components', '@emotion/*']
    }
  }
});