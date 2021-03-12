import { fetchAPI } from '@/services/api';

export async function getAll(quant, slug) {
  const data = await fetchAPI(
    `
      query MyQuery($quant: Int, $slug: String) {
        mostrasVirtuais(last: $quant, before: "", where: {search: $slug}) {
          nodes {
            id
            title
            slug
            excerpt
            categories {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            acf_data {
              videoUrl
            }
            apresentacoesSeries {
              nodes {
                name
                slug
                id
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        quant: quant || 100,
        slug: slug || '',
      },
    },
  );
  return data?.mostrasVirtuais;
}

export async function getOne(slug) {
  const data = await fetchAPI(
    `
      query MyQuery($slug: String!) {
        mostrasVirtuais (where: {name: $slug}) {
          nodes {
            id
            title
            slug
            excerpt
            acf_data {
              videoUrl
            }
            apresentacoesSeries {
              nodes {
                name
                slug
                id
              }
            }
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

export async function getLast(last = 2) {
  const data = await fetchAPI(
    `query ($qtd: Int!){
      mostrasVirtuais(last: $qtd){
          nodes {
              id
              title
              slug
              excerpt
              categories {
                nodes {
                  name
                  slug
                }
              }
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              acf_data {
                videoUrl
              }
            }
      }
    }`,
    {
      variables: { qtd: last },
    },
  );
  return data?.mostrasVirtuais;
}

export async function getSerie(slug, qtd = 100) {
  const data = await fetchAPI(`
    query ($slug : [String], $qtd : Int) {
      apresentacoesSeries(where: {slug: $slug}) {
        nodes {
          id
          name
          slug
          description
          acf_data {
            descricaoCompleta
            imagemDestacada {
              mediaItemUrl
            }
            categoria {
              name
              slug
            }
          }
          mostrasVirtuais(last: $qtd) {
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
      }
    }`, {
    variables: { slug, qtd },
  });
  return data?.apresentacoesSeries;
}

export async function getSeries(slug, qtd = 100) {
  const data = await fetchAPI(`
  query ($qtd : Int) {
    apresentacoesSeries {
      nodes {
        id
        name
        slug
        description
        acf_data {
          descricaoCompleta
          imagemDestacada {
            mediaItemUrl
          }
          categoria {
            name
            slug
          }
        }
        mostrasVirtuais(last: $qtd) {
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
    variables: { qtd },
  });
  return data?.apresentacoesSeries;
};
