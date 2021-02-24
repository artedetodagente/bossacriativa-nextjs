import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(`
    query MyQuery {
      posts(last: 100) {
        nodes {
          id
          slug
          title
          acf_chamada_post {
            chamadaHome
          }
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }`);
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
        excerpt
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
