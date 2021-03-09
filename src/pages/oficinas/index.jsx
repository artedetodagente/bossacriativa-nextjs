import React, { useEffect, useState } from 'react';
import Info from '@/components/Info';
import Fluid from '@/components/Fluid';
import FlatList from '@/components/FlatList';
import CardImage from '@/components/CardImage';
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/Filter';
import core from '@/core';
import styles from '@/styles/oficinas.module.css';
import Page from '@/components/Page';
import FilterBar from '@/components/FilterBar';
import FilterList from '@/components/FilterList';

export default function Workshops({
  workshops, categories, menus, links, selectedCategory,
}) {
  const { push } = useRouter();
  const [list, setList] = useState(workshops);
  const [listCategories, setListCategories] = useState(categories);
  const [category, setCategory] = useState('todas');

  function changeCategory(slug) {
    setCategory(slug);
  }

  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, []);

  async function find(search) {
    const { nodes } = await core.oficinas.getAll(null, search.search);
    const cats = nodes.filter((item) => item.acf_data.categoria !== null)
      .reduce((acc, cur) => [...acc, ...cur.acf_data.categoria], [])
      .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.name === item.name) === -1);
    setList(nodes);
    setListCategories([{ name: 'Todas', slug: 'todas' }, ...cats]);
    setCategory('todas');
  }

  return (
    <Page menus={menus} links={links}>
      <Breadcrumb name="Oficinas" />
      <Info
        title="Oficinas"
        text="No Bossa Criativa, arte, cultura e inclusão têm como palco a internet e patrimônios da humanidade. São mais de 180 artistas e educadores, de várias regiões
        do país, em apresentações, lives e oficinas de capacitação nas áreas de música, circo, artes visuais, dança, teatro e gestão cultural. Mais de 200 horas de
        conteúdo já estão no ar, com foco na diversidade e democratização da cultura."
      />
      <Fluid>
        <FilterBar>
          <SearchBar submit={(filter) => find(filter)} />
          <FilterList
            source={listCategories}
            action={changeCategory}
            renderItem={(item) => (
              <Filter
                id={item.slug}
                name={item.name}
                selected={category === item.slug}
                click={changeCategory}
              />
            )}
          />
        </FilterBar>
        <FlatList
          source={
            category !== 'todas' ? list.filter(
              (item) => item.acf_data.categoria
                && item.acf_data.categoria.findIndex((cat) => cat.slug === category) !== -1,
            ) : list
          }
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
              click={() => push(`oficinas/${item?.slug}`)}
            />
          )}
        />
      </Fluid>
    </Page>
  );
}

export async function getServerSideProps({ query }) {
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();
  const workshops = await core.oficinas.getAll(null, query?.search);
  const categories = workshops.nodes.filter((item) => item.acf_data.categoria !== null)
    .reduce((acc, cur) => [...acc, ...cur.acf_data.categoria], [])
    .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.name === item.name) === -1);
  const selectedCategory = query?.category;

  return {
    props: {
      menus: menus.nodes || [],
      links: links.nodes || [],
      workshops: workshops.nodes || [],
      categories: [{ slug: 'todas', name: 'Todas' }, ...categories] || [],
      selectedCategory: selectedCategory || [],
    },
  };
}
