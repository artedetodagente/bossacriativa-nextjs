import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
      query MyQuery {
        pages {
          nodes {
            id
            title
            slug
            content
            acf_data {
              blocos {
                ... on Page_AcfData_Blocos_EditorDeTexto {
                  fieldGroupName
                  texto
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
  return data?.pages;
}

export async function getOne(slug) {
  const data = await fetchAPI(
    `
      query MyQuery ($slug: String) {
        pageBy(uri: $slug) {
          id
          title
          slug
          acf_data {
            fieldGroupName
            blocos {
              ... on Page_AcfData_Blocos_EditorDeTexto {
                fieldGroupName
                texto
              }
              ... on Page_AcfData_Blocos_ImagemFull {
                fieldGroupName
                imagem {
                  altText
                  mediaItemUrl
                  sizes
                }
              }
              ... on Page_AcfData_Blocos_Galeria {
                fieldGroupName
                fotos {
                  mediaItemUrl
                  altText
                  sizes
                }
              }
            }
          }
        }
      }
    `,
    {
      variables: { slug },
    },
  );
  return data?.pageBy;
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
