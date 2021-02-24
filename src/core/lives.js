import { fetchAPI } from '@/services/api';

export async function getAll(order) {
  const data = await fetchAPI(
    `
    query MyQuery {
      lives(last: 100, ${order || 'before'}: "") {
        nodes {
          id
          slug
          title
          excerpt
          categories {
            nodes {
              name
            }
          }
          acf_data {
            videoUrl
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    `,
  );
  return data?.lives;
}

export async function getOne(slug) {
  const data = await fetchAPI(`
  query MyQuery {
    lives(where: {name: "${slug}"}) {
      nodes {
        id
        slug
        title
        excerpt
        acf_data {
          videoUrl
        }
      }
    }
  }
  `,
  {
    variables: {},
  });
  return data?.lives;
}
