import React from 'react';
import Info from '@/components/Info';
import FlatList from '@/components/FlatList';
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import Fluid from '@/components/Fluid';
import core from '@/core';
import CardThumb from '@/components/CardThumb';
import Page from '@/components/Page';

export default function Realities({ mostras, menus }) {
  const { push } = useRouter();

  return (
    <Page menus={menus}>
      <Breadcrumb name="Mostra Virtual" />
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
              title={item.title}
              excerpt={item.excerpt}
              w={300}
              h={200}
              click={() => push(`realidades/${item.slug}`)}
            />
          )}
        />
      </Fluid>
    </Page>
  );
}

export async function getStaticProps() {
  const mostras = await core.mostras.getAll();
  return {
    props: {
      mostras: mostras.nodes || [],
    },
    revalidate: 1,
  };
}
