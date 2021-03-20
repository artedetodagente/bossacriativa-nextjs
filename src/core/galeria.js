import { fetchAPI } from '@/services/api';

export async function getAll(quant) {
  const data = await fetchAPI(
    `
    query MyQuery ($quant: [Int]) {
        galeria(last: $quant ) {
          nodes {
            title
            slug
            acf_galeria {
              tipo
              videoUrl
              descricao
              depoimento
              imagem {
                mediaItemUrl
              }
            }
          }
        }
      }    
    `,
    {
      variables: {
        quant: quant || 100,
      },
    },
  );
  return data?.galeria;
}
