import { fetchAPI } from '@/services/api';

export async function getAll({ page = 1, end = '' }) {
  const data = await fetchAPI(
    `
    query MyQuery {
      lives(last: ${100 * page}, before: "${end}") {
        nodes {
          id
          slug
          title
          excerpt
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
