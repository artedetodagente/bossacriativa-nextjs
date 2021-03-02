import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
      query MyQuery {
        linksOne(where: {orderby: {field: MENU_ORDER, order: ASC}}) {
          nodes {
            acf_links_topo {
              urlTopo
            }
            title
            id
          }
        }
      }
    `,
  );
  return data?.linksOne;
}
