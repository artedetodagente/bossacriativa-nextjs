import { fetchAPI } from '@/services/api';

export async function getAll(quant) {
  const data = await fetchAPI(
    `
    query MyQuery ($quant: Int) {
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
        quant: quant || 900,
      },
    },
  );
  return data?.galeria;
}

export async function getEventosAll(quant) {
  const data = await fetchAPI(
    `
    query MyQuery ($quant: Int) {
      galeriaEventos(last: $quant ) {
        nodes {
          name
          slug
          description
          galeria {
            nodes {
              slug
              acf_galeria {
                imagem {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }`,
    {
      variables: {
        quant: quant || 900,
      },
    },
  );
  return data?.galeriaEventos;
}
