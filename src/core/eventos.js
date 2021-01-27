import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
    query MyQuery {
        eventos {
          nodes {
            title
            excerpt
            featuredImage {
              node {
                id
              }
            }
          }
        }
      }
    `,
  );
  return data?.eventos;
}