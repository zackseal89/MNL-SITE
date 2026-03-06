# MN LEGAL — HEADLESS WORDPRESS INTEGRATION GUIDE
## Render WordPress Content Inside Your Custom Frontend

---

## THE CONCEPT IN ONE DIAGRAM

```
┌─────────────────────────────────────────────────────────┐
│  WORDPRESS (backend only — you never see this)          │
│  mnlegal.net/wp-admin                                   │
│                                                         │
│  ✅ Write articles                                      │
│  ✅ Set categories, tags, authors                       │
│  ✅ Upload featured images                              │
│  ✅ Schedule posts                                      │
│  ✅ Manage team profiles (Custom Post Type)             │
│  ✅ Edit practice areas content                         │
│                                                         │
│  Exposes everything via: REST API                       │
│  URL: mnlegal.net/wp-json/wp/v2/posts                   │
└──────────────────────┬──────────────────────────────────┘
                       │  JSON data (fetch)
                       ▼
┌─────────────────────────────────────────────────────────┐
│  YOUR CUSTOM FRONTEND (the HTML/CSS/JS we built)        │
│  Hosted on: Vercel / Netlify / Custom server            │
│                                                         │
│  ✅ Your exact MN Legal design                          │
│  ✅ All animations (GSAP, IntersectionObserver)         │
│  ✅ Navy/Burgundy brand identity                        │
│  ✅ Playfair Display + Inter typography                 │
│  ✅ Custom cursor, scroll effects                       │
│                                                         │
│  Pulls content from WordPress API                       │
│  Renders it inside YOUR templates                       │
└─────────────────────────────────────────────────────────┘
```

**The key insight:** WordPress becomes your **writing tool only**. Your frontend stays 100% yours. WordPress never controls how anything looks.

---

## STEP 1 — ENABLE THE WORDPRESS REST API

The WordPress REST API is **already built into every WordPress installation since version 4.7**. You do not need to install anything.

Test it right now by visiting:
```
https://mnlegal.net/wp-json/wp/v2/posts
```

You will see a JSON response with all your posts. That is the data your frontend will consume.

### Key API Endpoints You Will Use

| What you want | API URL |
|---|---|
| All blog posts | `/wp-json/wp/v2/posts` |
| Single post by ID | `/wp-json/wp/v2/posts/123` |
| Single post by slug | `/wp-json/wp/v2/posts?slug=companies-act-2026` |
| All categories | `/wp-json/wp/v2/categories` |
| Posts in category | `/wp-json/wp/v2/posts?categories=5` |
| Featured image | `/wp-json/wp/v2/media/456` |
| Authors | `/wp-json/wp/v2/users` |
| Custom post types | `/wp-json/wp/v2/team-members` (after setup) |
| Tags | `/wp-json/wp/v2/tags` |

### Recommended WordPress Plugins to Install

Install these 3 free plugins in your WordPress admin. That is all you need:

```
1. ACF (Advanced Custom Fields) — FREE
   → Adds custom fields to posts (e.g., "Read Time", "Partner Name", "Practice Area")
   → Download: wordpress.org/plugins/advanced-custom-fields/

2. WPGraphQL — FREE (optional but powerful)
   → Gives you a more flexible GraphQL API instead of REST
   → Better for complex queries (get post + author + image in one request)
   → Download: wordpress.org/plugins/wp-graphql/

3. Yoast SEO — FREE
   → Manages meta descriptions, OG tags — exposed via REST API automatically
   → Your frontend reads the SEO data Yoast generates
   → Download: wordpress.org/plugins/wordpress-seo/
```

### Enable CORS (Required for external frontend)

Add this to your WordPress `functions.php` file:

```php
// Allow your frontend domain to access the WordPress REST API
add_action('rest_api_init', function() {
    header('Access-Control-Allow-Origin: https://your-frontend-domain.com');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Credentials: true');
});

// Or allow all origins during development:
add_action('rest_api_init', function() {
    header('Access-Control-Allow-Origin: *');
});
```

---

## STEP 2 — UNDERSTAND WHAT THE API RETURNS

When you fetch `/wp-json/wp/v2/posts?per_page=6`, WordPress returns JSON like this:

```json
[
  {
    "id": 142,
    "date": "2026-02-12T09:00:00",
    "slug": "navigating-kenya-companies-act-2026",
    "status": "publish",
    "title": {
      "rendered": "Navigating Kenya&#8217;s New Companies Act"
    },
    "excerpt": {
      "rendered": "<p>The amended Companies Act introduces sweeping changes...</p>"
    },
    "content": {
      "rendered": "<p>Full article HTML here...</p><h2>The Legal Background</h2>..."
    },
    "featured_media": 89,
    "categories": [5],
    "tags": [12, 14, 19],
    "author": 3,
    "acf": {
      "read_time": "8 min read",
      "practice_area": "Corporate Law",
      "author_name": "M. Mwangi",
      "author_role": "Senior Partner"
    },
    "_embedded": {
      "wp:featuredmedia": [
        {
          "source_url": "https://mnlegal.net/wp-content/uploads/2026/02/companies-act.jpg",
          "media_details": {
            "sizes": {
              "medium": { "source_url": "...companies-act-300x200.jpg" },
              "large":  { "source_url": "...companies-act-1024x576.jpg" }
            }
          }
        }
      ],
      "author": [
        { "name": "M. Mwangi", "description": "Senior Partner..." }
      ]
    }
  }
]
```

**Important:** Always add `?_embed` to your API requests to get the featured image and author embedded in a single request:
```
/wp-json/wp/v2/posts?per_page=6&_embed
```

---

## STEP 3 — SET UP CUSTOM FIELDS IN WORDPRESS (ACF)

In WordPress Admin → Custom Fields → Add New Field Group:

### Field Group: "Article Meta"
Apply to: Post Type = Post

| Field Label | Field Name | Field Type | Notes |
|---|---|---|---|
| Read Time | `read_time` | Text | e.g., "8 min read" |
| Practice Area | `practice_area` | Select | Options: Corporate, Litigation, etc. |
| Author Name | `author_display_name` | Text | Override WP author |
| Author Role | `author_role` | Text | e.g., "Senior Partner" |
| Author Initials | `author_initials` | Text | e.g., "M" for avatar |
| Article Subtitle | `article_subtitle` | Textarea | Deck below headline |
| Is Featured | `is_featured` | True/False | Show in featured slot |

### Field Group: "Team Member" (Custom Post Type)
Create a new Custom Post Type called `team-members` (use plugin: CPT UI)

| Field Label | Field Name | Field Type |
|---|---|---|
| Partner Role | `partner_role` | Text |
| Practice Area | `practice_area_focus` | Text |
| LinkedIn URL | `linkedin_url` | URL |
| Phone | `direct_phone` | Text |
| Full Bio | `full_bio` | Textarea |
| Bar Admission Year | `admitted_year` | Number |

---

## STEP 4 — THE JAVASCRIPT INTEGRATION CODE

This is the core code that connects your frontend to WordPress. Add this to your existing HTML pages.

### 4.1 — Blog Listing Page (fetch and render articles)

```javascript
// ─────────────────────────────────────────────
// MN Legal — WordPress API Integration
// Blog Listing Page
// ─────────────────────────────────────────────

const WP_API = 'https://mnlegal.net/wp-json/wp/v2'

// Category ID map (get these from /wp-json/wp/v2/categories)
const CATEGORY_MAP = {
  'corporate':   5,
  'litigation':  6,
  'property':    7,
  'employment':  8,
  'banking':     9,
  'ip':          10,
  'regulatory':  11,
}

// ── Fetch posts from WordPress ──
async function fetchPosts(options = {}) {
  const {
    perPage = 6,
    page = 1,
    categoryId = null,
    search = null,
    featured = false
  } = options

  let url = `${WP_API}/posts?per_page=${perPage}&page=${page}&_embed`

  if (categoryId) url += `&categories=${categoryId}`
  if (search)     url += `&search=${encodeURIComponent(search)}`
  if (featured)   url += `&meta_key=is_featured&meta_value=1`

  try {
    const response = await fetch(url)
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0')
    const posts = await response.json()
    return { posts, totalPages, totalPosts }
  } catch (error) {
    console.error('WordPress API error:', error)
    return { posts: [], totalPages: 0, totalPosts: 0 }
  }
}

// ── Extract featured image from embedded data ──
function getFeaturedImage(post) {
  try {
    const media = post._embedded?.['wp:featuredmedia']?.[0]
    if (!media) return null
    // Try to get large size, fall back to full
    return media.media_details?.sizes?.large?.source_url
      || media.media_details?.sizes?.medium_large?.source_url
      || media.source_url
      || null
  } catch { return null }
}

// ── Get formatted date ──
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  // Returns: "12 February 2026"
}

// ── Strip HTML tags from excerpt ──
function stripHtml(html) {
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

// ── Get ACF custom fields ──
function getACF(post) {
  return post.acf || {}
}

// ── Get category name from post ──
function getCategoryName(post) {
  const acf = getACF(post)
  if (acf.practice_area) return acf.practice_area
  // Fall back to embedded category
  const cats = post._embedded?.['wp:term']?.[0]
  if (cats && cats.length > 0) return cats[0].name
  return 'Legal Insights'
}

// ── Build article card HTML ──
function buildArticleCard(post, delay = 0) {
  const acf = getACF(post)
  const imgUrl = getFeaturedImage(post)
  const category = getCategoryName(post)
  const title = post.title.rendered
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 160) + '…'
  const date = formatDate(post.date)
  const readTime = acf.read_time || '5 min'
  const authorName = acf.author_display_name
    || post._embedded?.author?.[0]?.name
    || 'MN Legal'
  const slug = post.slug
  const authorInitial = (acf.author_initials || authorName.charAt(0)).toUpperCase()

  return `
    <article class="art-card rv" style="transition-delay:${delay}s"
             data-cat="${category.toLowerCase().replace(/[^a-z]/g,'-')}">

      <div class="art-card-img">
        ${imgUrl
          ? `<img src="${imgUrl}" alt="${title}" loading="lazy" decoding="async" width="400" height="225">`
          : `<div class="art-card-img-inner">${authorInitial}</div>`
        }
        <span class="art-card-tag">${category}</span>
      </div>

      <div class="art-card-body">
        <span class="art-card-date">${date}</span>
        <h3 class="art-card-title">${title}</h3>
        <p class="art-card-exc">${excerpt}</p>
        <div class="art-card-footer">
          <span class="art-card-author">${authorName}</span>
          <span class="art-card-time">${readTime}</span>
        </div>
        <a href="article.html?slug=${slug}" class="art-card-link">
          Read Article →
        </a>
      </div>

    </article>
  `
}

// ── Render articles into grid ──
async function renderBlogGrid(options = {}) {
  const grid = document.getElementById('art-grid')
  const countEl = document.getElementById('results-count')
  if (!grid) return

  // Show loading state
  grid.innerHTML = `
    <div style="grid-column:1/-1;padding:80px;text-align:center;color:var(--text-secondary)">
      <div style="font-family:var(--font-display);font-size:1.5rem;font-style:italic;color:var(--mn-navy)">
        Loading…
      </div>
    </div>
  `

  const { posts, totalPosts } = await fetchPosts(options)

  if (!posts.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;padding:80px;text-align:center">
        <p style="font-family:var(--font-display);font-size:1.5rem;color:var(--mn-navy);font-style:italic">
          No articles found
        </p>
        <p style="color:var(--text-secondary);margin-top:12px">
          Try a different category or search term.
        </p>
      </div>
    `
    return
  }

  // Build and inject HTML
  grid.innerHTML = posts
    .map((post, i) => buildArticleCard(post, i * 0.08))
    .join('')

  // Update count
  if (countEl) countEl.textContent = `Showing ${posts.length} of ${totalPosts} articles`

  // Re-run reveal observer on new cards
  document.querySelectorAll('.art-card').forEach(el => revealObserver.observe(el))

  // Re-attach cursor hover
  document.querySelectorAll('.art-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('ch'))
    el.addEventListener('mouseleave', () => document.body.classList.remove('ch'))
  })
}

// ── Category filter click handler ──
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')

    const cat = btn.dataset.cat
    const categoryId = cat === 'all' ? null : CATEGORY_MAP[cat]

    await renderBlogGrid({ categoryId, perPage: 6 })
  })
})

// ── Search handler ──
document.getElementById('search-btn')?.addEventListener('click', async () => {
  const q = document.getElementById('search-input')?.value.trim()
  if (q) await renderBlogGrid({ search: q, perPage: 6 })
})

// ── Initial load ──
renderBlogGrid({ perPage: 6 })
```

---

### 4.2 — Single Article Page (fetch one post by slug)

```javascript
// ─────────────────────────────────────────────
// MN Legal — Single Article Page
// Reads ?slug= from URL, fetches from WordPress
// ─────────────────────────────────────────────

const WP_API = 'https://mnlegal.net/wp-json/wp/v2'

// ── Get slug from URL ──
function getSlugFromURL() {
  const params = new URLSearchParams(window.location.search)
  return params.get('slug')
}

// ── Fetch single post by slug ──
async function fetchPostBySlug(slug) {
  const url = `${WP_API}/posts?slug=${slug}&_embed`
  const response = await fetch(url)
  const posts = await response.json()
  return posts[0] || null
}

// ── Render the article ──
async function renderArticle() {
  const slug = getSlugFromURL()
  if (!slug) { window.location.href = 'blog.html'; return }

  const post = await fetchPostBySlug(slug)
  if (!post) { window.location.href = 'blog.html'; return }

  const acf = post.acf || {}
  const title = post.title.rendered
  const content = post.content.rendered   // ← This is your WordPress body HTML
  const date = formatDate(post.date)
  const category = getCategoryName(post)
  const imgUrl = getFeaturedImage(post)
  const authorName = acf.author_display_name || post._embedded?.author?.[0]?.name || 'MN Legal'
  const authorRole = acf.author_role || 'Advocate'
  const authorBio = post._embedded?.author?.[0]?.description || ''
  const readTime = acf.read_time || calcReadTimeFromHTML(content)
  const subtitle = acf.article_subtitle || ''

  // ── Inject into page ──
  document.title = `${stripHtml(title)} | MN Legal`
  document.querySelector('.ah-title-inner.l1').textContent = stripHtml(title)
  document.querySelector('.ah-subtitle').textContent = subtitle
  document.querySelector('.art-tag').textContent = category
  document.querySelector('.ah-author-name').textContent = authorName
  document.querySelector('.ah-author-role').textContent = `${authorRole} · ${category}`
  document.getElementById('read-time').textContent = readTime
  document.querySelector('.art-date-display').textContent = date

  // Featured image
  if (imgUrl) {
    const imgWrap = document.querySelector('.ah-feat-img-inner')
    imgWrap.innerHTML = `
      <img src="${imgUrl}" alt="${stripHtml(title)}"
           loading="eager" decoding="sync"
           width="900" height="506"
           style="width:100%;height:100%;object-fit:cover">
    `
  }

  // ── INJECT ARTICLE BODY ──
  // WordPress returns fully-formed HTML — inject directly into .prose
  // Your CSS handles all the styling (h2 borders, table styles, etc.)
  const proseEl = document.getElementById('article-prose')
  proseEl.innerHTML = content

  // Author bio
  document.querySelector('.bio-name').textContent = authorName
  document.querySelector('.bio-role').textContent = authorRole
  document.querySelector('.bio-text').textContent = authorBio

  // ── Re-run interactive features on new content ──
  buildTOC()       // Auto-generate TOC from injected H2s
  calcReadTime()   // Recalculate from actual word count
  initSectionObserver()  // TOC active state on scroll

  // Fetch related posts in same category
  const catId = post.categories[0]
  renderRelatedPosts(catId, post.id)
}

// ── Auto-calculate read time from HTML string ──
function calcReadTimeFromHTML(html) {
  const words = stripHtml(html).split(/\s+/).length
  const mins = Math.max(1, Math.ceil(words / 220))
  return `${mins} min read`
}

// ── Render related posts ──
async function renderRelatedPosts(categoryId, excludeId) {
  const url = `${WP_API}/posts?categories=${categoryId}&exclude=${excludeId}&per_page=3&_embed`
  const response = await fetch(url)
  const posts = await response.json()
  const grid = document.querySelector('.related-grid')
  if (!grid || !posts.length) return

  grid.innerHTML = posts.map(post => {
    const img = getFeaturedImage(post)
    const cat = getCategoryName(post)
    const initial = (post.acf?.author_initials || cat.charAt(0)).toUpperCase()
    return `
      <article class="rel-card rv">
        <div class="rel-img">
          <div class="rel-img-inner">
            ${img
              ? `<img src="${img}" alt="${stripHtml(post.title.rendered)}" loading="lazy" style="width:100%;height:100%;object-fit:cover">`
              : initial
            }
          </div>
          <span class="rel-tag">${cat}</span>
        </div>
        <div class="rel-body">
          <span class="rel-date">${formatDate(post.date)}</span>
          <h3 class="rel-title">${post.title.rendered}</h3>
          <a href="article.html?slug=${post.slug}" class="rel-link">Read Article →</a>
        </div>
      </article>
    `
  }).join('')

  document.querySelectorAll('.rel-card').forEach(el => revealObserver.observe(el))
}

// ── Boot ──
renderArticle()
```

---

### 4.3 — WordPress Content Styling Override

When WordPress injects `post.content.rendered` into your `.prose` div, the HTML will include standard WordPress tags (`<h2>`, `<p>`, `<ul>`, `<table>`, `<blockquote>`, `<figure>`, `<img>`).

**Your existing `.prose` CSS already handles all of this** — because we wrote it to style standard HTML elements. But add these extra rules to handle WordPress-specific classes:

```css
/* WordPress default classes — map to MN Legal styles */
.prose .wp-block-image img { width: 100%; height: auto; }
.prose .wp-block-quote { border-left: 3px solid var(--mn-burgundy); padding: 20px 0 20px 32px; margin: 44px 0; }
.prose .wp-block-quote p { font-family: var(--font-display); font-style: italic; font-size: 22px; color: var(--mn-navy); }
.prose .wp-block-quote cite { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--mn-burgundy); }
.prose .wp-block-table table { width: 100%; border-collapse: collapse; }
.prose .wp-block-table th { background: var(--mn-navy); color: #fff; padding: 14px 16px; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; border-bottom: 2px solid var(--mn-burgundy); }
.prose .wp-block-table td { padding: 12px 16px; border-bottom: 1px solid var(--mn-gray-light); }
.prose .wp-block-table tr:nth-child(even) td { background: var(--mn-cream); }

/* WordPress callout — use the "Custom HTML" block in WordPress with class="callout" */
.prose .callout { background: var(--mn-cream); border-left: 4px solid var(--mn-burgundy); padding: 22px 28px; margin: 36px 0; }
.prose .callout-label { font-size: 10px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--mn-burgundy); display: block; margin-bottom: 10px; }

/* WordPress image captions */
.prose figcaption, .prose .wp-element-caption { font-size: 13px; font-style: italic; color: var(--text-secondary); margin-top: 12px; }

/* Gutenberg paragraph block */
.prose .wp-block-paragraph { margin-bottom: 24px; }

/* Remove WordPress default margins that conflict */
.prose .wp-block-heading { margin-top: 0; }
```

---

## STEP 5 — WRITING IN WORDPRESS FOR YOUR FRONTEND

### How to write an article in WordPress that renders perfectly on your frontend:

**In WordPress Admin → Posts → Add New:**

#### Title field
Type your article title exactly — no HTML. It becomes your `<h1>`.

#### Body (Gutenberg blocks to use)
```
Paragraph block    → becomes <p> — styled by your .prose p
Heading H2 block   → becomes <h2> — gets burgundy border-bottom automatically  
Heading H3 block   → becomes <h3> — styled automatically
Quote block        → becomes <blockquote> — Playfair italic + burgundy left border
Table block        → becomes <table> — navy header, alternating cream rows
List block         → becomes <ul>/<ol> — burgundy bullets/numbers
Image block        → becomes <figure><img><figcaption>
```

#### Creating a Callout Box (Key Insight box)
In WordPress, use the **Custom HTML block** and type:
```html
<div class="callout">
  <span class="callout-label">Key Takeaway</span>
  <p>Your callout text here. This will render with the cream background and burgundy left border.</p>
</div>
```

#### Custom Fields (ACF panel, appears below the editor)
Fill in:
- `read_time` → "8 min read"
- `practice_area` → "Corporate Law"  
- `author_display_name` → "M. Mwangi"
- `author_role` → "Senior Partner"
- `author_initials` → "M"
- `article_subtitle` → "A comprehensive analysis of…"
- `is_featured` → ✓ (check this for the featured article slot)

#### Featured Image
Set it in the sidebar → **Featured Image** → Upload your 1200×675px image.

#### Category
Assign to the correct Practice Area category (Corporate Law, Litigation, etc.)

#### Tags
Add: Companies Act, Director Liability, Kenya, 2026, etc.

#### Publish / Schedule
Hit Publish or schedule for a future date — your frontend will only show `status: "publish"` posts.

---

## STEP 6 — COMPLETE WORKING EXAMPLE

Here is the complete, drop-in JavaScript for your `blog.html` page that fetches real WordPress data:

```html
<!-- Add to <head> of blog.html -->
<script>
const WP_BASE = 'https://mnlegal.net/wp-json/wp/v2'

// Utility functions
const stripHtml = html => {
  const d = document.createElement('div'); d.innerHTML = html; return d.textContent || ''
}
const fmtDate = d => new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })
const getImg = post => {
  try { return post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.large?.source_url
    || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null } catch { return null }
}
const getCat = post => post.acf?.practice_area || post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Insights'

// Build single card HTML
function cardHTML(post, delay = 0) {
  const img = getImg(post)
  const cat = getCat(post)
  const author = post.acf?.author_display_name || post._embedded?.author?.[0]?.name || 'MN Legal'
  const initial = (post.acf?.author_initials || cat[0]).toUpperCase()
  return `
    <article class="art-card rv" style="transition-delay:${delay}s" data-cat="${cat.toLowerCase().replace(/\s+/g,'-')}">
      <div class="art-card-img">
        ${img ? `<img src="${img}" alt="${stripHtml(post.title.rendered)}" loading="lazy" decoding="async" width="400" height="225" style="width:100%;height:100%;object-fit:cover">`
               : `<div class="art-card-img-inner">${initial}</div>`}
        <span class="art-card-tag">${cat}</span>
      </div>
      <div class="art-card-body">
        <span class="art-card-date">${fmtDate(post.date)}</span>
        <h3 class="art-card-title">${post.title.rendered}</h3>
        <p class="art-card-exc">${stripHtml(post.excerpt.rendered).slice(0,155)}…</p>
        <div class="art-card-footer">
          <span class="art-card-author">${author}</span>
          <span class="art-card-time">${post.acf?.read_time || '5 min'}</span>
        </div>
        <a href="article.html?slug=${post.slug}" class="art-card-link">Read Article →</a>
      </div>
    </article>`
}

// Fetch and render
async function loadPosts(opts = {}) {
  const grid = document.getElementById('art-grid')
  if (!grid) return
  grid.innerHTML = '<div style="grid-column:1/-1;padding:60px;text-align:center;font-family:var(--font-display);font-style:italic;color:var(--mn-navy);font-size:1.3rem">Loading insights…</div>'
  let url = `${WP_BASE}/posts?per_page=${opts.perPage||6}&page=${opts.page||1}&_embed`
  if (opts.cat)    url += `&categories=${opts.cat}`
  if (opts.search) url += `&search=${encodeURIComponent(opts.search)}`
  try {
    const res = await fetch(url)
    const posts = await res.json()
    const total = res.headers.get('X-WP-Total')
    grid.innerHTML = posts.length
      ? posts.map((p,i) => cardHTML(p, i*0.08)).join('')
      : '<div style="grid-column:1/-1;padding:60px;text-align:center;color:var(--text-secondary)">No articles found.</div>'
    const cnt = document.getElementById('results-count')
    if (cnt) cnt.textContent = `Showing ${posts.length} of ${total} articles`
    // Re-observe new cards
    document.querySelectorAll('.art-card').forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(32px)'
      revealObserver?.observe(el)
    })
  } catch(e) {
    console.error(e)
    grid.innerHTML = '<div style="grid-column:1/-1;padding:60px;text-align:center;color:var(--text-secondary)">Could not load articles. Please try again.</div>'
  }
}

// Load on page ready
document.addEventListener('DOMContentLoaded', () => loadPosts())

// Category filter
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    const catMap = { corporate:5, litigation:6, property:7, employment:8, banking:9, ip:10, regulatory:11 }
    const catId = btn.dataset.cat === 'all' ? null : catMap[btn.dataset.cat]
    loadPosts({ cat: catId })
  })
})

// Search
document.getElementById('search-btn')?.addEventListener('click', () => {
  const q = document.getElementById('search-input')?.value.trim()
  if (q) loadPosts({ search: q })
})
document.getElementById('search-input')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = e.target.value.trim()
    if (q) loadPosts({ search: q })
  }
})
</script>
```

---

## STEP 7 — HOSTING ARCHITECTURE

### Option A — Simplest (Same WordPress Host)
```
mnlegal.net/           → WordPress (wp-admin, API)
mnlegal.net/insights/  → Your custom blog.html served as a WordPress page template

Pros:  No separate hosting needed
Cons:  WordPress still loads for every page (slight slowdown)
How:   Create a WordPress Page Template PHP file that loads your HTML/CSS/JS
       and fetches from the API client-side
```

### Option B — Recommended (Headless, Best Performance)
```
mnlegal.net (or api.mnlegal.net)  → WordPress (backend only, no frontend)
app.mnlegal.net (or Vercel)       → Your custom frontend HTML/JS files

Pros:  Blazing fast frontend (CDN-served static HTML)
       Full design control
       WordPress just stores data
Cons:  Slightly more setup
Cost:  Vercel free tier handles this easily
```

### Option C — WordPress Template Override (Easiest Transition)
```
Keep WordPress running normally
Override specific page templates with your custom HTML/CSS
WordPress renders the shell, your JS fetches the content

Steps:
1. In your WordPress theme, create:
   - page-insights.php  (blog listing template)
   - single-insights.php (article template)
2. In these PHP files, output your full HTML/CSS/JS
3. The PHP only provides the <head> WordPress hooks (for plugins/SEO)
4. Everything else is your custom code
```

---

## STEP 8 — PHP TEMPLATE APPROACH (Option C — Easiest)

If you want to keep things simple and stay within WordPress, create these two files in your theme folder:

### `page-insights.php`
```php
<?php
/**
 * Template Name: MN Legal Insights Page
 * This template replaces WordPress's default blog page
 * with our custom frontend design
 */
get_header(); // WordPress <head> with SEO plugins
?>

<!-- YOUR ENTIRE blog.html code goes here — all the HTML, CSS, JS -->
<!-- The JavaScript will fetch from the WordPress REST API -->
<!-- WordPress handles: SEO meta tags, plugin hooks -->
<!-- Your code handles: everything visual -->

<?php get_footer(); // WordPress admin bar for logged-in users ?>
```

### WordPress Admin Setup for Option C:
1. Upload the PHP file to `/wp-content/themes/your-theme/`
2. WordPress Admin → Pages → Add New
3. Set Template to "MN Legal Insights Page"
4. Publish the page at URL: `mnlegal.net/insights`

---

## STEP 9 — QUICK REFERENCE CHEAT SHEET

```
WHAT YOU DO IN WORDPRESS ADMIN:
  ✅ Write article title
  ✅ Write body using Gutenberg (H2, H3, paragraph, quote, table, list, image)
  ✅ Add callout: Custom HTML block → <div class="callout">...</div>
  ✅ Fill in ACF fields (read time, practice area, author, subtitle)
  ✅ Set featured image (1200×675px, WebP preferred)
  ✅ Assign category (Corporate Law, Litigation, etc.)
  ✅ Add tags (Companies Act, Kenya, 2026, etc.)
  ✅ Click Publish (or Schedule)

WHAT HAPPENS AUTOMATICALLY:
  ✅ Post appears in REST API at /wp-json/wp/v2/posts
  ✅ Your frontend fetches it on next page load
  ✅ MN Legal CSS styles it: navy H2 borders, burgundy bullets, cream tables
  ✅ TOC auto-generates from H2 tags in the content
  ✅ Read time auto-calculates from word count
  ✅ Related articles show posts from same category
  ✅ OG/Twitter cards use WordPress featured image (via Yoast)

WHAT YOU NEVER TOUCH:
  ❌ Your HTML/CSS/JS frontend files (design stays intact forever)
  ❌ Fonts, colors, animations (locked in your CSS variables)
  ❌ Page layout (fixed in your template)
```

---

*MN Legal — Headless WordPress Integration Guide*
*Part of the MN Legal Website Development Series*
*Version 1.0 — March 2026*
