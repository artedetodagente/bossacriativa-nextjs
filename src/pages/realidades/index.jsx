import React, { useState } from 'react';
import Info from '@/components/Info';
import FlatList from '@/components/FlatList';
import Breadcrumb from '@/components/Breadcrumb';
import Fluid from '@/components/Fluid';
import core from '@/core';
import CardThumb from '@/components/CardThumb';
import Page from '@/components/Page';
import ModalPlayer from '@/components/ModalPlayer';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/Filter';
import styles from '@/styles/lives.module.css';
import FilterBar from '@/components/FilterBar';
import FilterList from '@/components/FilterList';

export default function Realities({
  mostras, menus, categories, links,
}) {
  const [modal, setModal] = useState({ player: false });
  const [video, setVideo] = useState('');
  const [list, setList] = useState(mostras);
  const [listCategories, setListCategories] = useState(categories);
  const [category, setCategory] = useState('todas');

  function selectVideo(url) {
    setVideo(url);
    setModal({ ...modal, player: true });
  }

  function changeCategory(slug) {
    setCategory(slug);
  }

  async function find(search) {
    const { nodes } = await core.mostras.getAll(null, search.search);
    const cats = nodes.filter((item) => item.categories.nodes.length > 0)
      .reduce((acc, cur) => [...acc, ...cur.categories.nodes], [])
      .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.name === item.name) === -1);
    setList(nodes);
    setListCategories([{ name: 'Todas', slug: 'todas' }, ...cats]);
    setCategory('todas');
  }

  return (
    <Page menus={menus} links={links}>
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
        <FilterBar>
          <SearchBar submit={(filter) => find(filter)} />
          <FilterList
            source={listCategories}
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
              (item) => item.categories.nodes
                && item.categories.nodes.findIndex((cat) => cat.slug === category) !== -1,
            ) : list
          }
          colsxss={1}
          colsmd={2}
          cols={3}
          colsl={4}
          colsxl={6}
          className={styles.card_list}
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

export async function getServerSideProps({ query }) {
  const mostras = await core.mostras.getAll(null, query?.search);
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();
  const categories = mostras.nodes.filter((item) => item.categories.nodes.length > 0)
    .reduce((acc, cur) => [...acc, ...cur.categories.nodes], [])
    .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.name === item.name) === -1);

  return {
    props: {
      mostras: mostras.nodes || [],
      menus: menus.nodes || [],
      links: links.nodes || [],
      categories: [{ slug: 'todas', name: 'Todas' }, ...categories] || [],
    },
  };
}
