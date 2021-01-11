import React, { useState } from 'react';
import Page from '@/components/Page';
import Descriptor from '@/components/Descriptor';
import Fluid from '@/components/Fluid';
import CardList from '@/components/CardList';
import CardImage from '@/components/CardImage';
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import Filter from '@/components/Filter';
import Option from '@/components/Option';

export default function Workshops({ workshops }) {
  const { push } = useRouter();
  const [category, setCategory] = useState(1);

  function changeCategory(id) {
    setCategory(id);
  }

  return (
    <Page>
      <Breadcrumb />
      <Descriptor
        title="Oficinas"
        text="No Bossa Criativa, arte, cultura e inclusão têm como palco a internet e patrimônios da humanidade. São mais de 180 artistas e educadores, de várias regiões
        do país, em apresentações, lives e oficinas de capacitação nas áreas de música, circo, artes visuais, dança, teatro e gestão cultural. Mais de 200 horas de
        conteúdo já estão no ar, com foco na diversidade e democratização da cultura."
      />
      <Fluid>
        <Filter
          options={[{ id: 1, name: 'Todas' }, { id: 2, name: 'Música' }]}
          renderOption={(item) => (
            <Option
              id={item.id}
              name={item.name}
              selected={category === item.id}
              click={changeCategory}
            />
          )}
        />
        <CardList
          gap="15px"
          source={[]}
          renderItem={(item) => (
            <CardImage
              image={item.image}
              title={item.title}
              excerpt={item.excerpt}
              click={() => push(`oficinas/${item.slug}`)}
            />
          )}
        />
      </Fluid>
    </Page>
  );
}
