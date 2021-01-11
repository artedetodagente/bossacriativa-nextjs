import { fetchAPI } from '@/services/api';

export async function getPages() {
  const data = await fetchAPI(
    `
    query MyQuery {
      pages(where: {orderby: {field: MENU_ORDER, order: ASC}}) {
        edges {
          node {
            id
            slug,
            title
          }
        }
      }
    }
    `,
    {
      variables: {},
    },
  );
  return data?.pages;
}
