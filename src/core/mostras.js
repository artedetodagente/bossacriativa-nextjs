import { fetchAPI } from '@/services/api';

export async function getAll(order) {
  const data = await fetchAPI(
    `
      query MyQuery {
        mostrasVirtuais(last: 100, ${order || 'before'}: "") {
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
      variables: {},
    },
  );
  return data?.mostrasVirtuais;
}

export async function getOne(slug) {
  const data = await fetchAPI(
    `
      query MyQuery {
        mostrasVirtuais {
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