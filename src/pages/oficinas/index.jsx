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
import core from '@/core';
import styles from '@/styles/oficinas.module.css';

export default function Workshops({ workshops, categories }) {
  const { push } = useRouter();
  const [category, setCategory] = useState(0);

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
          options={categories}
          renderOption={(item) => (
            <Option
              id={item.termTaxonomyId}
              name={item.name}
              selected={category === item.termTaxonomyId}
              click={changeCategory}
            />
          )}
        />
        <CardList
          gap="15px"
          source={workshops}
          className={styles.card_list}
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
