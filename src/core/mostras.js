import { fetchAPI } from '@/services/api';

export async function getAll(quant, slug) {
  const data = await fetchAPI(
    `
      query MyQuery($quant: Int, $slug: String) {
        mostrasVirtuais(last: $quant, before: "", where: {search: $slug}) {
          nodes {
            id
            title
            slug
            excerpt
            categories {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            acf_data {
              videoUrl
            }
          }
        }
      }
    `,
    {
      variables: {
        quant: quant || 100,
        slug: slug || '',
      },
    },
  );
  return data?.mostrasVirtuais;
}

export async function getOne(slug) {
  const data = await fetchAPI(
    `
      query MyQuery($slug: String!) {
        mostrasVirtuais (where: {name: $slug}) {
          nodes {
            id
            title
            slug
            excerpt
            acf_data {
              videoUrl
            }
            content
          }
        }
      }
    `,
    {
      variables: { slug },
    },
  );
  return data?.mostrasVirtuais;
}

export async function getLast(last = 2) {
  const data = await fetchAPI(
    `query ($qtd: Int!){
      mostrasVirtuais(last: $qtd){
          nodes {
              id
              title
              slug
              excerpt
              categories {
                nodes {
                  name
                  slug
                }
              }
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              acf_data {
                videoUrl
              }
            }
      }
    }`,
    {
      variables: { qtd: last },
    },
  );
  return data?.mostrasVirtuais;
}
