import { fetchAPI } from '@/services/api';

export async function getPosts() {
  const data = await fetchAPI(
    `
    query MyQuery {
      posts {
        nodes {
          id
          slug
          title
        }
      }
    }
    `,
  );
  return data?.posts;
}

export async function getSinglePost(slug) {
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
