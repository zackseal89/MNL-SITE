export interface Author {
  name: string;
  role: string;
  roleLink?: string;
  avatar: string;
  bio?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  author: Author;
  readTime: string;
  image: string;
  featured?: boolean;
  tags?: string[];
}

export const authors: Record<string, Author> = {};

export const posts: Post[] = [];
