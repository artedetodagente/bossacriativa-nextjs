import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
      query MyQuery {
        oficinasClasses {
          nodes {
            id
            name
            slug
            description
            acf_data {
              imagemDestacada {
                mediaItemUrl
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
            oficinas (where: {orderby: {field: TITLE, order: ASC}}) {
              nodes {
                id
                title
                slug
                excerpt
                acf_data {
                  videoUrl
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
