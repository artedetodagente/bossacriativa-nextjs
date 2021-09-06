import { fetchAPI } from '@/services/api';

export async function getAll(quant, search) {
  const data = await fetchAPI(
    `
      query MyQuery ($quant: Int, $search: String) {
        eventos (first: $quant, where: {search: $search}){
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
              linkExterno
            }
          }
        }
      }
    `,
    {
      variables: {
        quant: quant || 999,
        search: search || '',
      },
    },
  );
  return data?.eventos;
}
