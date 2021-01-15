import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
    query MyQuery {
      posts {
        nodes {
          id
          slug
          title
          excerpt
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
    `,
  );
  return data?.posts;
}

export async function getOne(slug) {
  const data = await fetchAPI(`
  query MyQuery($slug: String) {
    posts(where: {name: $slug}) {
      nodes {
        id
        slug
        title
        content
        featuredImage {
          node {
            sourceUrl(size: LARGE)
          }
        }
      }
    }
  }
  `,
  {
    variables: { slug },
  });
  return data?.posts;
}
