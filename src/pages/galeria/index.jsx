import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Fluid from '@/components/Fluid';
import Page from '@/components/Page';
import Section from '@/components/Section';
import Title from '@/components/Title';
import core from '@/core';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import CardMasonryImage from '@/components/CardMasonryImage';

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
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="15px">
                {
                  galeria.map((item) => {
                    if (!item.name) {
                      return (
                        <CardMasonryImage
                          image={item.acf_galeria.imagem.mediaItemUrl}
                          title={item.title}
                          excerpt={item.acf_galeria.descricao}
                        />
                        // <CardImageWithTitle
                        //   image={item.acf_galeria.imagem.mediaItemUrl}
                        //   title={item.title}
                        //   excerpt={item.acf_galeria.descricao}
                        // />
                      );
                    }
                    return null;
                  })
                }
              </Masonry>
            </ResponsiveMasonry>
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
