import { Post } from './blog';

export function mapWPPostToPost(wpPost: any): Post {
  const content = wpPost.content || '';
  const wordCount = content.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / 220);
  const readTime = `${readTimeMinutes} min read`;

  return {
    id: wpPost.id,
    slug: wpPost.slug,
    title: wpPost.title,
    excerpt: wpPost.excerpt ? wpPost.excerpt.replace(/<[^>]*>?/gm, '') : '', 
    content: wpPost.content,
    date: new Date(wpPost.date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    category: wpPost.categories?.nodes[0]?.name || 'Insights',
    author: {
      name: wpPost.author?.node?.name || 'MN Legal',
      role: wpPost.author?.node?.description ? 'Senior Advocate' : 'Advocate', 
      avatar: wpPost.author?.node?.avatar?.url || 'https://via.placeholder.com/150',
      bio: wpPost.author?.node?.description || ''
    },
    readTime,
    image: wpPost.featuredImage?.node?.sourceUrl || 'https://via.placeholder.com/1200x630',
    featured: wpPost.sticky || false,
    tags: wpPost.tags?.nodes.map((t: any) => t.name) || []
  };
}
