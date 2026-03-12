'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CategoryFilter from '../components/CategoryFilter';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleCard from '../components/ArticleCard';
import NewsletterStrip from '../components/NewsletterStrip';
import { Post } from '@/lib/blog';

interface InsightsContentProps {
  posts: Post[];
}

export default function InsightsContent({ posts }: InsightsContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Stabilize activeCategory for hydration: start with 'All Articles' 
  // and sync with searchParams in a useEffect.
  const [activeCategory, setActiveCategory] = useState('All Articles');
  const [isFiltering, setIsFiltering] = useState(false);

  // Sync state with URL after mount to avoid hydration mismatch
  useEffect(() => {
    const cat = searchParams.get('category') || 'All Articles';
    if (cat !== activeCategory) {
      setActiveCategory(cat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setIsFiltering(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsFiltering(false);
      const params = new URLSearchParams(window.location.search);
      if (category === 'All Articles') {
        params.delete('category');
      } else {
        params.set('category', category);
      }
      router.push(`/insights?${params.toString()}`, { scroll: false });
    }, 300);
  };

  const counts = useMemo(() => {
    const countsMap: Record<string, number> = { "All Articles": posts.length };
    posts.forEach((post: any) => {
      countsMap[post.category] = (countsMap[post.category] || 0) + 1;
    });
    return countsMap;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All Articles') return posts;
    return posts.filter((post: any) => post.category === activeCategory);
  }, [posts, activeCategory]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);
  const gridRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < remainingPosts.length; i += 3) {
      rows.push(remainingPosts.slice(i, i + 3));
    }
    return rows;
  }, [remainingPosts]);

  return (
    <>
      <CategoryFilter 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
        counts={counts}
      />

      <div id="content" className="p-[0_60px_100px] max-w-[1200px] mx-auto md:px-[60px] px-[24px]">
        
        {/* ── FEATURED ── */}
        <div className={`transition-opacity duration-300 ${isFiltering ? 'opacity-0' : 'opacity-100'}`}>
          {featuredPost && <FeaturedArticle post={featuredPost} />}
        </div>

        {/* ── LATEST ARTICLES ── */}
        <div className={`art-section p-[64px_0_0] transition-opacity duration-300 ${isFiltering ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-baseline justify-between flex-wrap gap-[16px]">
            <h2
              suppressHydrationWarning
              className="grid-heading font-display text-[clamp(22px,3vw,30px)] font-semibold text-[var(--heading-primary)] pb-[12px] border-b-2 border-[var(--mn-burgundy)] inline-block mb-[40px]"
            >
              {activeCategory === 'All Articles' ? 'Latest Articles' : `${activeCategory} Updates`}
            </h2>
            <span
              suppressHydrationWarning
              className="d1 text-[12px] text-[var(--text-secondary)]"
              id="results-count"
            >
              Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {gridRows.length > 0 && (
            <>
              {/* Row 1 */}
              <div className="art-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[rgba(139,28,63,.1)]">
                {gridRows[0].map((post, i) => (
                  <ArticleCard key={post.id} post={post} delayClass={`d${i+1}`} />
                ))}
              </div>

              {/* Newsletter Strip between rows if needed */}
              {gridRows.length > 1 && <NewsletterStrip />}

              {/* Remaining Rows */}
              {gridRows.slice(1).map((row, rowIndex) => (
                <div key={rowIndex} className="art-section mt-[60px]">
                   {rowIndex === 0 && <h2 suppressHydrationWarning className="grid-heading rv font-display text-[clamp(22px,3vw,30px)] font-semibold text-[var(--heading-primary)] pb-[12px] border-b-2 border-[var(--mn-burgundy)] inline-block mb-[40px]">More Insights</h2>}
                   <div className="art-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[rgba(139,28,63,.1)]">
                    {row.map((post, i) => (
                      <ArticleCard key={post.id} post={post} delayClass={`d${i+1}`} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {filteredPosts.length === 0 && (
            <div className="py-32 text-center">
              <p className="font-display italic text-2xl text-[var(--heading-primary)] mb-6">No articles found in this category.</p>
              <button 
                onClick={() => handleCategoryChange('All Articles')}
                className="text-[var(--mn-burgundy)] text-[12px] font-bold uppercase tracking-[2px] border-b border-[var(--mn-burgundy)] pb-1"
              >
                View all articles
              </button>
            </div>
          )}

          {/* PAGINATION */}
          {filteredPosts.length > 0 && (
            <div className="pagination rv flex items-center justify-center gap-[4px] mt-[56px] pt-[40px] border-t border-[var(--mn-cream-dark)]" suppressHydrationWarning>
              <button className="page-btn arrow w-[44px] h-[44px] flex items-center justify-center text-[13px] border border-[var(--mn-gray-light)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-[var(--mn-burgundy)] hover:text-[var(--mn-burgundy)] transition-all">←</button>
              <button className="page-btn active w-[44px] h-[44px] flex items-center justify-center text-[13px] font-medium border border-[var(--mn-burgundy)] bg-[var(--mn-burgundy)] text-white">1</button>
              <button className="page-btn w-[44px] h-[44px] flex items-center justify-center text-[13px] font-medium border border-[var(--mn-gray-light)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-[var(--mn-burgundy)] hover:text-[var(--mn-burgundy)]">2</button>
              <button className="page-btn w-[44px] h-[44px] flex items-center justify-center text-[13px] font-medium border border-[var(--mn-gray-light)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-[var(--mn-burgundy)] hover:text-[var(--mn-burgundy)]">3</button>
              <span className="text-[var(--mn-gray-light)] text-[13px] px-[8px]">…</span>
              <button className="page-btn w-[44px] h-[44px] flex items-center justify-center text-[13px] font-medium border border-[var(--mn-gray-light)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-[var(--mn-burgundy)] hover:text-[var(--mn-burgundy)]">8</button>
              <button className="page-btn arrow w-[44px] h-[44px] flex items-center justify-center text-[13px] border border-[var(--mn-gray-light)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-[var(--mn-burgundy)] hover:text-[var(--mn-burgundy)] transition-all">→</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
