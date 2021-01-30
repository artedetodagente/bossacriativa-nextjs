import { fetchAPI } from '@/services/api';

export async function getAll({ param = 'before', cursor = '', search = '' }) {
  console.log(search);
  const data = await fetchAPI(
    `
      query MyQuery {
        oficinasClasses(where: {nameLike: "${search}"}, last: 100, ${param}: "${cursor}") {
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
