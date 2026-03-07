import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/wp';
import { mapWPPostToPost } from '@/lib/mapper';
import { Post } from '@/lib/blog';

export default async function NewsSection() {
  const wpPosts = await getAllPosts();
  const allPosts: Post[] = wpPosts?.map(mapWPPostToPost) || [];
  
  if (allPosts.length === 0) {
    return null; // Or show a placeholder if desired
  }

  const latestPosts = allPosts.slice(0, 3);
  const featured = latestPosts[0];

  return (
    <section id="news" className="bg-[var(--mn-cream)] py-24 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-[600px]">
            <span className="text-[var(--mn-burgundy)] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 block">
              Legal Insights
            </span>
            <h2 className="text-[clamp(32px,4vw,42px)] font-display text-[var(--mn-navy)] leading-tight border-none pb-0">
              Latest News & Briefings
            </h2>
          </div>
          <Link href="/insights" className="text-[13px] uppercase font-bold text-[var(--mn-burgundy)] tracking-widest border-b-2 border-[var(--mn-burgundy)] pb-2 hover:opacity-70 transition-opacity">
            View All Insights
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Featured Post */}
          <div className="lg:col-span-2 group">
            <Link href={`/insights/${featured.slug}`} className="block h-full bg-white transition-all duration-500 hover:shadow-2xl">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={featured.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={featured.title} />
                <div className="absolute top-6 left-6 bg-[var(--mn-burgundy)] px-4 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
                  {featured.category}
                </div>
              </div>
              <div className="p-10">
                <span className="block text-[12px] text-gray-400 mb-4">{featured.date}</span>
                <h3 className="text-[28px] font-display text-[var(--mn-navy)] mb-6 leading-snug group-hover:text-[var(--mn-burgundy)] transition-colors">
                  {featured.title}
                </h3>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-8 max-w-[600px]">
                  {featured.excerpt}
                </p>
                <div className="inline-flex items-center text-[13px] uppercase font-bold text-[var(--mn-burgundy)] tracking-widest group/link">
                  Read Analysis <ArrowRight size={16} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          {/* Side Posts */}
          <div className="space-y-12">
            {latestPosts.slice(1).map((post, i) => (
              <Link key={i} href={`/insights/${post.slug}`} className="group block">
                <div className="relative aspect-[16/8] overflow-hidden mb-6">
                   <img src={post.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={post.title} />
                </div>
                <div>
                   <span className="block text-[11px] font-bold text-[var(--mn-burgundy)] uppercase tracking-wider mb-2">{post.category}</span>
                   <h3 className="text-[20px] font-display text-[var(--mn-navy)] leading-tight group-hover:text-[var(--mn-burgundy)] transition-colors line-clamp-2">
                      {post.title}
                   </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
