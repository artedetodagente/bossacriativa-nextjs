/* eslint-disable arrow-body-style */
import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import CardMasonryImage from '@/components/CardMasonryImage';
import { request } from 'graphql-request';
import useSWR from 'swr';

const Galeria = ({ clickAction }) => {
  const apiUrl = 'https://wp-admin.bossacriativa.art.br/graphql';
  const queryString = `query{
                          galeria (last: 900){
                            nodes {
                              title
                              slug
                              acf_galeria {
                                tipo
                                videoUrl
                                descricao
                                depoimento
                                imagem {
                                  mediaItemUrl
                                }
                              }
                              galeriaEventos {
                                nodes{
                                  slug
                                }
                              }
                            }
                          }
                          galeriaEventos (last:900) {
                            nodes {
                              name
                              slug
                              description
                              galeria {
                                nodes {
                                  slug
                                  acf_galeria {
                                    imagem {
                                      mediaItemUrl
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }`;

  const fetcher = (query) => request(apiUrl, query);

  const { data, error } = useSWR(queryString, fetcher);

  if (error) return <div>erro</div>;
  if (!data) return <div>Carregando...</div>;
  const dados = [];
  data.galeria.nodes.forEach((item) => {
    if (item.galeriaEventos.nodes.length === 0) {
      dados.push(item);
    }
  });
  data.galeriaEventos.nodes.forEach((item) => {
    dados.push(item);
  });

  dados.sort(() => (Math.random() - 0.5));
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
    >
      <Masonry gutter="15px">
        {dados.map((item, index) => (
          <CardMasonryImage
            key={`${index}|${item.name || item.title}`}
            collection={!!item.name}
            title={item.name || item.title}
            image={
                item.acf_galeria?.imagem.mediaItemUrl
                || item.galeria?.nodes[0].acf_galeria.imagem.mediaItemUrl
            }
            excerpt={
              item.name
                ? item.description
                : item.acf_galeria?.descricao
            }
            click={
              item.galeria !== undefined
                ? () => (clickAction(item))
                : null
            }
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default Galeria;
