import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import CardImageWithTitle from '@/components/CardImageWithTitle';
import Fluid from '@/components/Fluid';
// import Masonry from '@/components/Masonry';
import Page from '@/components/Page';
import Section from '@/components/Section';
import Title from '@/components/Title';
import core from '@/core';
import Masonry from 'react-responsive-masonry';

export default function Gallery({ menus, links, galeria }) {
  return (
    <Page menus={menus} links={links}>
      <Breadcrumb />
      <Fluid>
        <Section>
          <header>
            <Title>Galeria</Title>
          </header>
          <main>
            <Masonry columnsCount={4} gutter="15px">
              {
                galeria.map((item) => {
                  if (!item.name) {
                    return (
                      <CardImageWithTitle
                        image={item.acf_galeria.imagem.mediaItemUrl}
                        title={item.title}
                        excerpt={item.acf_galeria.descricao}
                      />
                    );
                  }
                  return null;
                })
              }
            </Masonry>
            {/* <Masonry
              source={galeria.filter((item) => item.acf_galeria.tipo === 'imagem')}
              renderItem={(item) => (

              )}
            /> */}
          </main>
        </Section>
      </Fluid>
    </Page>
  );
}

export async function getStaticProps() {
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();
  const galeriaEventos = await core.galeria.getEventosAll();
  const galeria = await core.galeria.getAll();
  const listGaleria = [...galeria.nodes, ...galeriaEventos.nodes]
    .map((item) => ({ value: item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => ({ ...item.value }));

  return {
    props: {
      menus: menus.nodes || [],
      links: links.nodes || [],
      galeria: listGaleria || [],
    },
    revalidate: 1,
  };
}
