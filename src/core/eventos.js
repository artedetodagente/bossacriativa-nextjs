import { fetchAPI } from '@/services/api';

export async function getAll(quant) {
  const data = await fetchAPI(
    `
      query MyQuery ($quant: Int) {
        eventos (first: $quant){
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
    {
      variables: {
        quant: quant || 999,
      },
    },
  );
  return data?.eventos;
}
