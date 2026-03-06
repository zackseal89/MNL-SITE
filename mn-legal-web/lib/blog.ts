export interface Author {
  name: string;
  role: string;
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

export const authors: Record<string, Author> = {
  m_mwangi: {
    name: "M. Mwangi",
    role: "Senior Partner",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop",
    bio: "M. Mwangi is the Managing Partner at MN Legal with over 20 years of experience in Corporate Law and Strategic Dispute Resolution across East Africa."
  },
  s_karania: {
    name: "S. Karanja",
    role: "Partner",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop",
    bio: "S. Karanja specializes in Conveyancing and Property Law, advising developers and investors on large-scale real estate projects in Nairobi and Mombasa."
  }
};

export const posts: Post[] = [
  {
    id: '1',
    slug: 'navigating-kenyas-new-companies-act-2026',
    title: "Navigating Kenya's New Companies Act: What Directors Must Know in 2026",
    excerpt: "An analysis of the newly introduced amendments to the Companies Act and their implications on corporate governance and director liability in Kenya.",
    date: "12 February 2026",
    category: "Corporate & Commercial Law",
    author: authors.m_mwangi,
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1582408921715-18e7806367c1?q=80&w=1470&auto=format&fit=crop",
    featured: true,
    tags: ["Corporate Law", "Kenya Law", "Director Liability", "2026 Amendments"],
    content: `
      <h2>Introduction</h2>
      <p>The landscape of corporate governance in Kenya is undergoing a significant transformation. With the commencement of the Companies (Amendment) Act 2026, directors of both private and public companies face a new set of compliance requirements that prioritize transparency and accountability.</p>
      
      <div class="callout">
        <p><strong>Key Takeaway:</strong> Directors can now be held personally liable for environmental non-compliance by their companies under Section 214(3) of the amended Act.</p>
      </div>

      <h2>Primary Changes in Governance</h2>
      <p>The amendment introduces several critical shifts that every boardroom in Nairobi must address immediately:</p>
      
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Old Regulation</th>
            <th>2026 Amendment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Annual General Meetings</td>
            <td>Physical attendance mandatory</td>
            <td>Hybrid/Virtual meetings legally recognized</td>
          </tr>
          <tr>
            <td>Beneficial Ownership</td>
            <td>Disclosure to Registrar only</td>
            <td>Enhanced public transparency requirements</td>
          </tr>
          <tr>
            <td>Reporting Timelines</td>
            <td>6 months post-FY</td>
            <td>Reduced to 4 months post-FY</td>
          </tr>
        </tbody>
      </table>

      <h2>Enhanced Director Duties</h2>
      <p>The Act expands the fiduciary duties of directors, specifically regarding environmental and social governance (ESG). It is no longer sufficient to focus solely on shareholder profit; the welfare of employees and the environmental impact of operations are now statutory considerations.</p>

      <blockquote>
        "Precision in corporate governance is no longer an option—it is a survival mechanism in Kenya's evolving legal ecosystem."
        <cite>MN Legal Editorial Board</cite>
      </blockquote>

      <h2>Practical Action Steps</h2>
      <ol>
        <li>Review current Articles of Association to ensure virtual meeting clauses are compliant.</li>
        <li>Update the Register of Beneficial Owners to reflect recent changes in shareholding.</li>
        <li>Conduct an ESG audit to mitigate new director liability risks.</li>
      </ol>

      <h2>How MN Legal Can Help</h2>
      <p>Our Corporate and Commercial team provides comprehensive audit services to ensure your board is fully compliant with the 2026 amendments. We offer bespoke training for directors on their expanded roles and liabilities.</p>
    `
  },
  {
    id: '2',
    slug: 'arbitration-vs-litigation-choosing-right-path',
    title: "Arbitration vs. Litigation: Choosing the Right Path for Business Disputes",
    excerpt: "Why more Kenyan businesses are opting for ADR mechanisms over the traditional court system in 2025.",
    date: "28 January 2026",
    category: "Litigation & Dispute",
    author: authors.m_mwangi,
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1453948575181-75aa0574ed38?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: '3',
    slug: 'intellectual-property-rights-digital-age',
    title: "Protecting Intellectual Property in the East African Digital Economy",
    excerpt: "A guide for tech startups in Nairobi on securing trademarks and patents in a cross-border digital landscape.",
    date: "15 January 2026",
    category: "Intellectual Property",
    author: authors.s_karania,
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: '4',
    slug: 'real-estate-trends-nairobi-2026',
    title: "Real Estate Investment in Nairobi: Navigating Sectional Properties Act",
    excerpt: "Understanding the shift from traditional title deeds to sectional titles for apartment owners in urban Kenya.",
    date: "05 January 2026",
    category: "Conveyancing & Property Law",
    author: authors.s_karania,
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1373&auto=format&fit=crop"
  },
  {
    id: '5',
    slug: 'employment-contracts-remote-work',
    title: "Modernizing Employment Contracts for the Remote Workforce",
    excerpt: "Legal considerations for Kenyan employers managing distributed teams under the Employment Act.",
    date: "20 December 2025",
    category: "Employment & Labour Law",
    author: authors.m_mwangi,
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1470&auto=format&fit=crop"
  }
];
