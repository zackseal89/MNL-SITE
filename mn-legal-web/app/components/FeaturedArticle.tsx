'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/blog';

interface FeaturedArticleProps {
  post: Post;
}

export default function FeaturedArticle({ post }: FeaturedArticleProps) {
  return (
    <div id="featured" className="p-[64px_0] border-b border-[var(--mn-cream-dark)]">
      <div className="sec-label mb-[8px] inline-flex items-center gap-[12px] text-[11px] font-medium tracking-[3px] uppercase text-[var(--mn-burgundy)] before:content-[''] before:w-[24px] before:height-[1px] before:bg-[var(--mn-burgundy)]">Featured Article</div>
      <Link href={`/insights/${post.slug}`} className="feat-grid d1 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-0 border border-[var(--mn-cream-dark)] overflow-hidden group no-underline color-inherit">
        {/* Image Area */}
        <div className="feat-img d1 relative overflow-hidden bg-[linear-gradient(160deg,#2d3e5f,#1a2744)]">
          <div className="feat-img-inner w-full h-full min-h-[340px] flex items-center justify-center font-display text-[80px] color-[rgba(255,255,255,.05)] italic transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.04]">
            MN
          </div>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-opacity duration-700"
          />
          <span className="feat-badge absolute top-[24px] left-[24px] bg-[var(--mn-burgundy)] text-white text-[10px] font-semibold tracking-[2px] uppercase p-[6px_14px]">Featured</span>
        </div>

        {/* Content Area */}
        <div className="feat-body d2 p-[52px] flex flex-col justify-center bg-white">
          <span className="art-tag inline-block bg-[var(--mn-burgundy)] text-white text-[10px] font-semibold tracking-[2px] uppercase p-[5px_12px] mb-[16px]">
            {post.category}
          </span>
          <span className="art-date text-[12px] text-[var(--text-secondary)] tracking-[.5px] mb-[14px] block">
            {post.date}
          </span>
          <h2 className="feat-title font-display text-[clamp(22px,2.5vw,30px)] font-semibold leading-[1.25] text-[var(--mn-navy)] mb-[18px] transition-colors duration-300 group-hover:text-[var(--mn-burgundy)]">
            {post.title}
          </h2>
          <p className="feat-excerpt text-[15px] leading-[1.8] text-[var(--text-secondary)] mb-[32px] line-clamp-3">
            {post.excerpt}
          </p>
          <div className="read-more inline-flex items-center gap-[8px] text-[11px] font-semibold tracking-[1.5px] uppercase text-[var(--mn-burgundy)] border-b border-transparent pb-[2px] transition-all duration-400 ease-[var(--ease-back)] group-hover:gap-[14px] group-hover:border-[var(--mn-burgundy)]">
            Read Full Article <span className="rm-arrow transition-transform duration-400 ease-[var(--ease-back)] group-hover:rotate-[-45deg] text-[13px]">→</span>
          </div>
          <div className="author-row flex items-center gap-[12px] mt-[28px] pt-[28px] border-t border-[var(--mn-cream-dark)]">
            <div className="author-av w-[40px] h-[40px] rounded-full bg-[linear-gradient(135deg,var(--mn-navy),var(--mn-navy-mid))] flex items-center justify-center font-display text-[14px] text-white/60 flex-shrink-0 relative overflow-hidden">
               <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
            </div>
            <div>
              <span className="author-name text-[13px] font-semibold text-[var(--mn-navy)] block">{post.author.name}</span>
              <span className="author-role text-[11px] text-[var(--text-secondary)]">{post.author.role} · {post.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
