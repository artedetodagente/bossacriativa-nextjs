import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
    query MyQuery {
      eventos (first: 999){
        nodes {
          title
          id
          excerpt
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          slug
          acf_data_evento {
            dataDoEvento
            tipo
          }
        }
      }
    }
    `,
  );
  return data?.eventos;
}