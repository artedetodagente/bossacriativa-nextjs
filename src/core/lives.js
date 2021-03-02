import { fetchAPI } from '@/services/api';

export async function getAll(quant, search) {
  const data = await fetchAPI(
    `
      query MyQuery ($quant: Int, $search: String) {
        lives(last: $quant, before: "", where: { search: $search }) {
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
    {
      variables: {
        quant: quant || 100,
        search: search || '',
      },
    },
  );
  return data?.lives;
}

export async function getOne(slug) {
  const data = await fetchAPI(`
  query MyQuery ($slug: String!) {
    lives(where: {name: $slug}) {
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
    variables: { slug },
  });
  return data?.lives;
}

export async function getLast(last = 100) {
  const data = await fetchAPI(`
  query ($qtd: Int!){
    lives(last: $qtd){
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
    }
  }`, {
    variables: { qtd: last },
  });
  return data?.lives;
}
