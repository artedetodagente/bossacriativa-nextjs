import { fetchAPI } from '@/services/api';

export async function getAll(quant, name) {
  const data = await fetchAPI(
    `
      query MyQuery ($quant: Int, $name: String) {
        oficinasClasses(last: $quant, before: "", where: { nameLike: $name}) {
          nodes {
            id
            name
            slug
            description
            acf_data {
              dataPublicar
              categoria {
                name
                slug
              }
              imagemDestacada {
                mediaItemUrl
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `,
    {
      variables: {
        quant: quant || 100,
        name: name || '',
      },
    },
  );
  return data?.oficinasClasses;
}

export async function getOne(slug) {
  const data = await fetchAPI(
    `
      query MyQuery ($slug: [String]) {
        oficinasClasses(where: {slug: $slug}) {
          nodes {
            id
            name
            slug
            description
            acf_data {
              descricaoCompleta
              dataPublicar
            }
            oficinas (last: 100, where: {orderby: {field: TITLE, order: ASC}}) {
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
                acf_data {
                  videoUrl
                  dataDePublicacao
                  autor {
                    ... on AutoresOne {
                      title
                      slug
                      content
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      variables: { slug },
    },
  );
  return data?.oficinasClasses;
}
