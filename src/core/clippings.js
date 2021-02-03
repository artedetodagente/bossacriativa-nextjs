import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
      query MyQuery {
        clippingsOne(where: {orderby: {field: DATE, order: DESC}}) {
          nodes {
            id
            title
            slug
            excerpt
            date
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
  return data?.clippingsOne;
}