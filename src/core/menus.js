import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
      query MyQuery {
        menuItems(first: 1000) {
          nodes {
            id
            label
            url
            order
            parentId
          }
        }
      }
    `,
    {
      variables: {},
    },
  );
  return data?.menuItems;
}
