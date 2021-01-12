import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
      query MyQuery {
        mostrasVirtuais {
          nodes {
            id
            title
            slug
            excerpt
          }
        }
      }
    `,
    {
      variables: {},
    },
  );
  return data?.mostrasVirtuais;
}

export async function getOne(slug) {
  const data = await fetchAPI(
    `
      query MyQuery {
        mostrasVirtuais {
          nodes {
            id
            title
            slug
            excerpt
            content
          }
        }
      }
    `,
    {
      variables: { slug },
    },
  );
  return data?.mostrasVirtuais;
}
