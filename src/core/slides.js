import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
    query MyQuery {
        slides {
          nodes {
            id
            title
            slug
            excerpt
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
    `,
  );
  return data?.slides;
}