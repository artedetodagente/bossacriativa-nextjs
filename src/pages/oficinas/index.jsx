import React, { useState } from 'react';
import Info from '@/components/Info';
import Fluid from '@/components/Fluid';
import ListCard from '@/components/ListCard';
import CardImage from '@/components/CardImage';
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import SearchBar from '@/components/SearchBar';
import Option from '@/components/Option';
import core from '@/core';
import styles from '@/styles/oficinas.module.css';

export default function Workshops({ workshops, categories }) {
  const { push } = useRouter();
  const [category, setCategory] = useState(0);

  function changeCategory(id) {
    setCategory(id);
  }

  return (
    <main>
      <Breadcrumb />
      <Info
        title="Oficinas"
        text="No Bossa Criativa, arte, cultura e inclusão têm como palco a internet e patrimônios da humanidade. São mais de 180 artistas e educadores, de várias regiões
        do país, em apresentações, lives e oficinas de capacitação nas áreas de música, circo, artes visuais, dança, teatro e gestão cultural. Mais de 200 horas de
        conteúdo já estão no ar, com foco na diversidade e democratização da cultura."
      />
      <Fluid>
        <SearchBar
          filters={categories}
          renderFilter={(item) => (
            <Option
              id={item.termTaxonomyId}
              name={item.name}
              selected={category === item.termTaxonomyId}
              click={changeCategory}
            />
          )}
        />
        <ListCard
          source={workshops}
          className={styles.card_list}
          renderItem={(item) => (
            <CardImage
              image={item.acf_data?.imagemDestacada?.mediaItemUrl}
              title={item?.name}
              excerpt={item?.description}
              click={() => push(`oficinas/${item?.slug}`)}
            />
          )}
        />
      </Fluid>
    </main>
  );
}

export async function getStaticProps() {
  const workshops = await core.oficinas.getAll();
  const categories = await core.categories.getAll();
  return {
    props: {
      workshops: workshops.nodes || [],
      categories: [{ termTaxonomyId: 0, name: 'Todas' }, ...categories.nodes] || [],
    },
    revalidate: process.env.REQUEST_TIME,
  };
}
