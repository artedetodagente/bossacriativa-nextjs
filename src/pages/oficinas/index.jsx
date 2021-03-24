import React, { useEffect, useState } from 'react';
import Info from '@/components/Info';
import Fluid from '@/components/Fluid';
import FlatList from '@/components/FlatList';
import CardImageWithTitle from '@/components/CardImageWithTitle';
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/Filter';
import core from '@/core';
import Page from '@/components/Page';
import FilterBar from '@/components/FilterBar';
import FilterList from '@/components/FilterList';
import styles from '@/styles/oficinas.module.css';
import { getISODateString } from '@/utils/date';

export default function Workshops({
  workshops, categories, menus, links, selectedCategory, menusRodape,
}) {
  const { push } = useRouter();
  const [list, setList] = useState(workshops);
  const [listCategories, setListCategories] = useState(categories);
  const [category, setCategory] = useState('todas');

  function changeCategory(slug) {
    setCategory(slug);
  }

  useEffect(() => {
    if (selectedCategory && selectedCategory.length > 1) {
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
    <Page menus={menus} links={links} menusRodape={menusRodape}>
      <Breadcrumb name="Oficinas" />
      <Info
        title="Oficinas"
        text="Da voz ao violão, da dança à interpretação e à produção. Em vídeos curtos, de linguagem acessível, artistas e especialistas oferecem informação e capacitação, tanto para quem quer se iniciar quanto para os que desejam avançar em sua carreira profissional, em diferentes formas de arte. Nos vídeos aqui disponíveis, você vai encontrar ajuda para desenvolver-se tecnicamente, incrementar sua performance e ampliar seus horizontes de atuação."
      />
      <Fluid className={styles.content_container}>
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
            <CardImageWithTitle
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
  const menusRodape = await core.menus.getAll('menu_rodape');
  const links = await core.links.getAll();
  const workshops = await core.oficinas.getAll(null, query?.search);
  const categories = workshops.nodes.filter((item) => item.acf_data.categoria !== null)
    .reduce((acc, cur) => [...acc, ...cur.acf_data.categoria], [])
    .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.name === item.name) === -1);
  const selectedCategory = query?.category;

  workshops.nodes.sort((a, b) => (
    new Date(getISODateString(b.acf_data.dataPublicar))
  - new Date(getISODateString(a.acf_data.dataPublicar))
  ));

  return {
    props: {
      menus: menus.nodes || [],
      menusRodape: menusRodape?.nodes || [],
      links: links.nodes || [],
      workshops: workshops.nodes || [],
      categories: [{ slug: 'todas', name: 'Todas' }, ...categories] || [],
      selectedCategory: selectedCategory || [],
    },
  };
}
