import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
      query MyQuery {
        oficinas {
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
  return data?.oficinas;
}

export async function getOne(slug) {
  const data = await fetchAPI(
    `
      query MyQuery {
        oficinas {
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
  return data?.oficinas;
}
