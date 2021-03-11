import { fetchAPI } from '@/services/api';

export async function getAll(quant, search) {
  const data = await fetchAPI(
    `
      query MyQuery ($quant: Int, $search: String) {
        lives(last: $quant, before: "", where: { search: $search }) {
          nodes {
            id
            slug
            title
            excerpt
            categories {
              nodes {
                name
                slug
              }
            }
            acf_data {
              videoUrl
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            livesQuadros {
              nodes {
                      id
                      slug
                      name
                      acf_data {
                          dataPublicar
                      }
                  
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
      variables: {
        quant: quant || 100,
        search: search || '',
      },
    },
  );
  return data?.lives;
}

export async function getOne(slug) {
  const data = await fetchAPI(`
  query MyQuery ($slug: String!) {
    lives(where: {name: $slug}) {
      nodes {
        id
        slug
        title
        excerpt
        acf_data {
          videoUrl
        }
        featuredImage {
          node {
            mediaItemUrl
          }
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

export async function getLast(last = 100) {
  const data = await fetchAPI(`
  query ($qtd: Int!){
    lives(last: $qtd){
        nodes {
          id
          slug
          title
          excerpt
          categories {
            nodes {
              name
            }
          }
          acf_data {
            videoUrl
          }
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          livesQuadros {
            edges {
                node {
                    id
                    slug
                    name
                    acf_data {
                        dataPublicar
                    }
                }
            }
          }
        }
    }
  }`, {
    variables: { qtd: last },
  });
  return data?.lives;
}

export async function getQuadro(slug, qtd = 100) {
  const data = await fetchAPI(`
    query ($slug : [String], $qtd : Int!) {
      livesQuadros(where: {slug: $slug}) {
        nodes {
          id
          name
          slug
          description
          acf_data {
            descricaoCompleta
          }
          lives(last: $qtd) {
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
      }
    }`, {
    variables: { slug, qtd },
  });
  return data?.livesQuadros;
}

export async function getQuadros() {
  const data = await fetchAPI(`
    query {
      livesQuadros {
        nodes {
          id
          name
          slug
          description
        }
      }
    }`, {});
  return data?.livesQuadros;
}
