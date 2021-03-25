import React, { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Fluid from '@/components/Fluid';
import Page from '@/components/Page';
import Section from '@/components/Section';
import Title from '@/components/Title';
import core from '@/core';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import CardMasonryImage from '@/components/CardMasonryImage';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export default function Gallery({ menus, links, galeria }) {
  const [photos, setPhotos] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [open, setOpen] = useState(false);

  function openLightBox(elements) {
    setPhotos(elements);
    setOpen(true);
  }

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
                  galeria.map((item, index) => (
                    <CardMasonryImage
                      key={index}
                      collection={!!item.name}
                      title={item.name || item.title}
                      image={
                        item.name
                          ? item.galeria?.nodes[0].acf_galeria.imagem.mediaItemUrl
                          : item.acf_galeria.imagem.mediaItemUrl
                      }
                      excerpt={
                        item.name
                          ? item.description
                          : item.acf_galeria?.descricao
                      }
                      click={
                        item.galeria !== undefined
                          ? () => (openLightBox(item.galeria.nodes))
                          : null
                      }
                    />
                  ))
                }
              </Masonry>
            </ResponsiveMasonry>
            {
              open && (
                <Lightbox
                  mainSrc={photos[photoIndex].acf_galeria.imagem.mediaItemUrl}
                  nextSrc={photos[(photoIndex + 1) % photos.length].acf_galeria.imagem.mediaItemUrl}
                  prevSrc={
                    photos[(photoIndex + photos.length - 1) % photos.length]
                      .acf_galeria.imagem.mediaItemUrl
                  }
                  onCloseRequest={() => setOpen(false)}
                  onMovePrevRequest={
                    () => setPhotoIndex((photoIndex + photos.length - 1) % photos.length)
                  }
                  onMoveNextRequest={
                    () => setPhotoIndex((photoIndex + 1) % photos.length)
                  }
                />
              )
            }
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
  const filterGaleria = galeria.nodes.filter(
    (item) => galeriaEventos.nodes
      .map((ge) => ge.galeria)
      .reduce((acc, cur) => ([...acc, ...cur.nodes]), [])
      .findIndex((ge) => ge.slug === item.slug) === -1,
  );
  const listGaleria = [...filterGaleria, ...galeriaEventos.nodes]
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
