import React, { useState } from 'react';
import Info from '@/components/Info';
import Fluid from '@/components/Fluid';
import FlatList from '@/components/FlatList';
import CardImage from '@/components/CardImage';
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import SearchBar from '@/components/SearchBar';
import Option from '@/components/Option';
import core from '@/core';
import styles from '@/styles/oficinas.module.css';
import Page from '@/components/Page';

export default function Workshops({ workshops, categories, menus }) {
  const { push } = useRouter();
  const [category, setCategory] = useState(0);

  function changeCategory(id) {
    setCategory(id);
  }

  return (
    <Page menus={menus}>
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
        <FlatList
          source={workshops}
          colsxss={1}
          colsmd={2}
          cols={4}
          colsl={4}
          colsxl={7}
          className={styles.card_list}
          renderItem={(item) => (
            <CardImage
              image={item.acf_data?.imagemDestacada?.mediaItemUrl}
              title={item?.name}
              excerpt={item?.description}
              h={200}
              w={300}
              click={() => push(`oficinas/${item?.slug}`)}
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
    revalidate: 1,
  };
}
