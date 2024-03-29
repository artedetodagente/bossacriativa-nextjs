import React, { useState } from "react";
import core from "@/core";
import Lightbox from "react-image-lightbox";
import Breadcrumb from "@/components/Breadcrumb";
import Fluid from "@/components/Fluid";
import Page from "@/components/Page";
import Section from "@/components/Section";
import Title from "@/components/Title";
import Galeria from "@/components/Galeria";
// import 'react-image-lightbox/style.css';

export default function Gallery({ menus, links }) {
  const [photos, setPhotos] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [open, setOpen] = useState(false);

  function openLightBox(elements) {
    setPhotos(elements);
    setOpen(true);
  }

  return (
    <Page
      menus={menus}
      links={links}
      cssLink="react-image-lightbox.taylored.css"
    >
      <Breadcrumb name="Galeria" />
      <Fluid>
        <Section>
          <header>
            <Title>Galeria</Title>
          </header>
          <main>
            <Galeria clickAction={(item) => openLightBox(item.galeria.nodes)} />
            {open && (
              <Lightbox
                mainSrc={photos[photoIndex].acf_galeria.imagem.mediaItemUrl}
                nextSrc={
                  photos[(photoIndex + 1) % photos.length].acf_galeria.imagem
                    .mediaItemUrl
                }
                prevSrc={
                  photos[(photoIndex + photos.length - 1) % photos.length]
                    .acf_galeria.imagem.mediaItemUrl
                }
                onCloseRequest={() => setOpen(false)}
                onMovePrevRequest={() =>
                  setPhotoIndex(
                    (photoIndex + photos.length - 1) % photos.length
                  )
                }
                onMoveNextRequest={() =>
                  setPhotoIndex((photoIndex + 1) % photos.length)
                }
                imageCaption={photos[photoIndex].acf_galeria.descricao}
              />
            )}
          </main>
        </Section>
      </Fluid>
    </Page>
  );
}

export async function getServerSideProps() {
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();
  return {
    props: {
      menus: menus?.nodes || [],
      links: links?.nodes || [],
    },
  };
}
