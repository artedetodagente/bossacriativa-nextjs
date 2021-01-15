import React from 'react';
import Info from '@/components/Info';
import ListCard from '@/components/ListCard';
import CardImage from '@/components/CardImage';
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import Fluid from '@/components/Fluid';
import core from '@/core';

export default function Realities({ realities }) {
  const { push } = useRouter();

  return (
    <main>
      <Breadcrumb name="Mostra Virtual" />
      <Info
        title="Mostra Virtual"
        text="No Bossa Criativa, arte, cultura e inclusão têm como palco a internet e patrimônios da humanidade. São mais de 180 artistas e educadores, de várias regiões
        do país, em apresentações, lives e oficinas de capacitação nas áreas de música, circo, artes visuais, dança, teatro e gestão cultural. Mais de 200 horas de
        conteúdo já estão no ar, com foco na diversidade e democratização da cultura."
      />
      <Fluid>
        <ListCard
          gap="15px"
          source={realities}
          renderItem={(item) => (
            <CardImage
              image={item.image}
              title={item.title}
              excerpt={item.excerpt}
              click={() => push(`realidades/${item.slug}`)}
            />
          )}
        />
      </Fluid>
    </main>
  );
}

export async function getStaticProps() {
  const realities = await core.mostras.getAll();
  return {
    props: {
      realities: realities.nodes || [],
    },
    revalidate: process.env.REQUEST_TIME,
  };
}
