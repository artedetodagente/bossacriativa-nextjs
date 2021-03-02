import { fetchAPI } from '@/services/api';

export async function getAll(quant) {
  const data = await fetchAPI(
    `
      query MyQuery ($quant: Int) {
        menuItems(first: $quant) {
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
      variables: {
        quant: quant || 1000,
      },
    },
  );
  return data?.menuItems;
}
