import { fetchAPI } from '@/services/api';

export async function getAll(order, search) {
  const data = await fetchAPI(
    `
      query MyQuery {
        oficinasClasses(last: 100, ${order || 'before'}: "", ${search ? `where: { nameLike: "${search}"}` : ''}) {
          nodes {
            id
            name
            slug
            description
            acf_data {
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
      variables: {},
    },
  );
  return data?.oficinasClasses;
}

export async function getOne(slug) {
  const data = await fetchAPI(
    `
      query MyQuery {
        oficinasClasses(where: {slug: "${slug}"}) {
          nodes {
            id
            name
            slug
            description
            acf_data {
              descricaoCompleta
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
                  autor {
                    ... on AutoresOne {
                      title
                      slug
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
      variables: {},
    },
  );
  return data?.oficinasClasses;
}
