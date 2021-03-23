import { fetchAPI } from '@/services/api';

export async function getAllWithAfter(id, quant) {
  const data = await fetchAPI(
    `
      query MyQuery($quant: Int, $id: String) {
        releasesOne(first: $quant, after: $id, where: {orderby: {field: DATE, order: DESC}}) {
          nodes {
            id
            title
            slug
            excerpt
            date
            acf_link_release {
              arquivo {
                link
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
        quant: quant || 8,
        id: id || '',
      },
    },
  );
  return data?.releasesOne;
}

export async function getAllWithBefore(id, quant) {
  const data = await fetchAPI(
    `
      query MyQuery($quant: Int, $id: String) {
        releasesOne(last: $quant, after: $id, where: {orderby: {field: DATE, order: DESC}}) {
          nodes {
            id
            title
            slug
            excerpt
            date
            acf_link_release {
              arquivo {
                link
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
        quant: quant || 8,
        id: id || '',
      },
    },
  );
  return data?.releasesOne;
}
