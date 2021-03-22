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
            acf_chamada_slider {
              bannerHomeDataEntrada
              bannerHomeDataSaida
              urlbanner
              imegemMobile {
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
