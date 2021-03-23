import { fetchAPI } from '@/services/api';

export async function getAllWithAfter(id, quant) {
  const data = await fetchAPI(
    `
      query MyQuery($quant: Int, $id: String) {
        clippingsOne(first: $quant, after: $id, where: {orderby: {field: DATE, order: DESC}}) {
          nodes {
            id
            title
            slug
            excerpt
            date
            acf_link_clipping {
              linkDaNoticia
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }    
    `,
    {
      variables: {
        quant: quant || 6,
        id: id || '',
      },
    },
  );
  return data?.clippingsOne;
}

export async function getAllWithBefore(id, quant) {
  const data = await fetchAPI(
    `
      query MyQuery($quant: Int, $id: String) {
        clippingsOne(last: $quant, before: $id, where: {orderby: {field: DATE, order: DESC}}) {
          nodes {
            id
            title
            slug
            excerpt
            date
            acf_link_clipping {
              linkDaNoticia
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }    
    `,
    {
      variables: {
        quant: quant || 6,
        id: id || '',
      },
    },
  );
  return data?.clippingsOne;
}
