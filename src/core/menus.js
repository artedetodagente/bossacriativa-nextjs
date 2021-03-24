import { fetchAPI } from '@/services/api';

export async function getAll(slug = 'menu-principal', qtd = 1000) {
  const data = await fetchAPI(
    `query ($slug: String, $qtd : Int){
        menus(where: {slug: $slug}) {
          nodes {
            name
            slug
            menuItems(first: $qtd) {
              nodes {
                id
                label
                url
                order
                parentId
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        qtd, slug,
      },
    },
  );
  return data?.menus.nodes[0]?.menuItems;
}
