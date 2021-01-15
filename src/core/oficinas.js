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
            oficinas {
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
      variables: { slug, oficinas: { status: 'publish' } },
    },
  );
  return data?.oficinasClasses;
}
