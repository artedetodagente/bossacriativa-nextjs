import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
      query MyQuery {
        categories(where: {orderby: TERM_ID}) {
          nodes {
            name
            slug
            termTaxonomyId
          }
        }
      }
    `,
    {
      variables: {},
    },
  );
  return data?.categories;
}
