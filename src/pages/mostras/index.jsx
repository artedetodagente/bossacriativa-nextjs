import React from 'react';
import Descriptor from '@/components/Descriptor';
import Page from '@/components/Page';
import CardList from '@/components/CardList';
import CardImage from '@/components/CardImage';
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import Fluid from '@/components/Fluid';

export default function Realities() {
  const { push } = useRouter();

  return (
    <Page>
      <Breadcrumb name="Mostras Virtuais" />
      <Descriptor
        title="Mostras"
        text="No Bossa Criativa, arte, cultura e inclusão têm como palco a internet e patrimônios da humanidade. São mais de 180 artistas e educadores, de várias regiões
        do país, em apresentações, lives e oficinas de capacitação nas áreas de música, circo, artes visuais, dança, teatro e gestão cultural. Mais de 200 horas de
        conteúdo já estão no ar, com foco na diversidade e democratização da cultura."
      />
      <Fluid>
        <CardList
          gap="15px"
          source={[]}
          renderItem={(item) => (
            <CardImage
              image={item.image}
              title={item.title}
              excerpt={item.excerpt}
              click={() => push(`mostras/${item.slug}`)}
            />
          )}
        />
      </Fluid>
    </Page>
  );
}
