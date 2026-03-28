import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { title, description } from '../blog-config.js';

export async function GET(context) {
  const posts = await getCollection('posts');
  return rss({
    title: title,
    description: description,
    site: context.site,
    items: posts
      .filter(post => !post.data.draft)
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/${post.id}/`,
      })),
    customData: `<language>da-dk</language>`,
  });
}
