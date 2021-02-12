import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
    query MyQuery {
      pages(where: {orderby: {field: MENU_ORDER, order: ASC}}) {
        edges {
          node {
            id
            slug,
            title
          }
        }
      }
    }
    `,
    {
      variables: {},
    },
  );
  return data?.pages;
}

export async function getHome() {
  const data = await fetchAPI(
    `
      query MyQuery {
        pages(where: {title: "Home"}) {
          nodes {
            acf_data_home {
              info {
                videoUrl
                saibaMais
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
  return data?.pages;
}
