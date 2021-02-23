import React, { useState } from 'react';
import Info from '@/components/Info';
import FlatList from '@/components/FlatList';
import Breadcrumb from '@/components/Breadcrumb';
import Fluid from '@/components/Fluid';
import core from '@/core';
import CardThumb from '@/components/CardThumb';
import Page from '@/components/Page';
import ModalPlayer from '@/components/ModalPlayer';

export default function Realities({ mostras, menus }) {
  const [modal, setModal] = useState({ player: false });
  const [video, setVideo] = useState('');

  function selectVideo(url) {
    setVideo(url);
    setModal({ ...modal, player: true });
  }

  return (
    <Page menus={menus}>
      <Breadcrumb name="Mostra Virtual" />
      <ModalPlayer
        open={modal.player}
        video={video}
        close={() => setModal({ ...modal, player: false })}
      />
      <Info
        title="Mostra Virtual"
        text="No Bossa Criativa, arte, cultura e inclusão têm como palco a internet e patrimônios da humanidade. São mais de 180 artistas e educadores, de várias regiões
        do país, em apresentações, lives e oficinas de capacitação nas áreas de música, circo, artes visuais, dança, teatro e gestão cultural. Mais de 200 horas de
        conteúdo já estão no ar, com foco na diversidade e democratização da cultura."
      />
      <Fluid>
        <FlatList
          source={mostras}
          colsxss={1}
          colsmd={2}
          cols={3}
          colsl={4}
          colsxl={6}
          renderItem={(item) => (
            <CardThumb
              video={item.acf_data?.videoUrl}
              image={item.featuredImage?.node.mediaItemUrl}
              title={item.title}
              excerpt={item.excerpt}
              click={() => selectVideo(item.acf_data?.videoUrl)}
            />
          )}
        />
      </Fluid>
    </Page>
  );
}

export async function getStaticProps() {
  const mostras = await core.mostras.getAll();
  const menus = await core.menus.getAll();

  return {
    props: {
      mostras: mostras.nodes || [],
      menus: menus.nodes || [],
    },
    revalidate: 1,
  };
}
