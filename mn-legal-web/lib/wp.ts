const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query: string, { variables }: any = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (!API_URL) {
    console.warn('WORDPRESS_API_URL is not defined in environment variables. Returning empty data.');
    return { data: {} };
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 } // Adding revalidation for ISR
    });

    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error('Failed to fetch API');
    }
    return json.data;
  } catch (error) {
    console.error('Error fetching from WordPress API:', error);
    return null; 
  }
}

export async function getAllPosts() {
  const data = await fetchAPI(`
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          slug
          title
          excerpt
          content
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          author {
            node {
              name
              description
              avatar {
                url
              }
            }
          }
          categories {
            nodes {
              name
            }
          }
          tags {
            nodes {
              name
            }
          }
        }
      }
    }
  `);
  return data?.posts?.nodes || [];
}

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(`
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        id
        title
        excerpt
        content
        date
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
            description
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  `, {
    variables: { id: slug, idType: 'SLUG' },
  });
  return data?.post;
}
