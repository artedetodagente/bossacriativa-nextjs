import { fetchAPI } from '@/services/api';

export async function getLives() {
  const data = await fetchAPI(
    `
    query MyQuery {
      lives(first: 9999) {
        nodes {
          id
          slug
          title
          excerpt
          acf_data {
            videoUrl
          }
        }
      }
    }
    `,
  );
  return data?.lives;
}

export async function getSingleLive(slug) {
  const data = await fetchAPI(`
  query MyQuery($slug: String) {
    lives(where: {name: $slug}) {
      nodes {
        id
        slug
        title
        excerpt
        acf_data {
          videoUrl
        }
      }
    }
  }
  `,
  {
    variables: { slug },
  });
  return data?.lives;
}
