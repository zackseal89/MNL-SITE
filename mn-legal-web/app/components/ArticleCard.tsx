'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/blog';

interface ArticleCardProps {
  post: Post;
  delayClass?: string;
}

export default function ArticleCard({ post, delayClass = "d1" }: ArticleCardProps) {
  return (
    <article className={`group art-card rv ${delayClass} bg-white overflow-hidden flex flex-col transition-[transform,opacity] duration-400 ease-[var(--ease-expo)] hover:-translate-y-1`}>
      <Link href={`/insights/${post.slug}`} className="block h-full flex flex-col no-underline color-inherit">
        <div className="art-card-img relative overflow-hidden bg-[linear-gradient(160deg,#e8e4dc,#f0ece4)] aspect-[16/9]">
          <div className="art-card-img-inner w-full h-full flex items-center justify-center font-display text-[40px] text-black/5 italic transition-transform duration-600 ease-[var(--ease-expo)] group-hover:scale-[1.05]">
            §
          </div>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-opacity duration-600"
          />
          <span className="art-card-tag absolute top-[16px] left-[16px] bg-[var(--mn-burgundy)] text-white text-[9px] font-semibold tracking-[2px] uppercase p-[4px_10px]">
            {post.category}
          </span>
        </div>
        
        <div className="art-card-body p-[24px_26px_32px] flex-1 flex flex-col">
          <span className="art-card-date text-[11px] text-[var(--text-secondary)] tracking-[.5px] mb-[10px] block">
            {post.date}
          </span>
          <h3 className="art-card-title font-display text-[18px] font-semibold leading-[1.3] text-[var(--mn-navy)] mb-[12px] transition-colors duration-300 group-hover:text-[var(--mn-burgundy)] line-clamp-2">
            {post.title}
          </h3>
          <p className="art-card-exc text-[13.5px] leading-[1.7] text-[var(--text-secondary)] line-clamp-3 flex-1">
            {post.excerpt}
          </p>
          <div className="art-card-footer flex items-center justify-between mt-[20px] pt-[16px] border-t border-[var(--mn-cream-dark)]">
            <span className="art-card-author text-[11px] text-[var(--mn-gray)]">{post.author.name}</span>
            <span className="art-card-time text-[10px] text-[var(--text-secondary)] bg-[var(--mn-cream)] p-[3px_8px]">{post.readTime}</span>
          </div>
          <div className="art-card-link text-[10px] font-semibold tracking-[1.5px] uppercase text-[var(--mn-burgundy)] inline-flex items-center gap-[6px] mt-[14px] border-b border-transparent pb-[2px] transition-all duration-350 ease-[var(--ease-back)] group-hover:gap-[10px] group-hover:border-[var(--mn-burgundy)]">
            Read Article →
          </div>
        </div>
      </Link>
    </article>
  );
}
