import React, { useState } from 'react';
import Info from '@/components/Info';
import FlatList from '@/components/FlatList';
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import Fluid from '@/components/Fluid';
import core from '@/core';
import CardThumb from '@/components/CardThumb';
import Page from '@/components/Page';
import SearchBar from '@/components/SearchBar';
import Option from '@/components/Option';
import styles from '@/styles/lives.module.css';

export default function Lives({
  lives, menus, categories, links,
}) {
  const { push } = useRouter();
  const [list, setList] = useState(lives);
  const [listCategories, setListCategories] = useState(categories);
  const [category, setCategory] = useState('todas');

  function changeCategory(slug) {
    setCategory(slug);
  }

  async function find(search) {
    const { nodes } = await core.lives.getAll(null, search.search);
    const cats = nodes.filter((item) => item.categories.nodes.length > 0)
      .reduce((acc, cur) => [...acc, ...cur.categories.nodes], [])
      .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.name === item.name) === -1);
    setList(nodes);
    setListCategories([{ name: 'Todas', slug: 'todas' }, ...cats]);
    setCategory('todas');
  }

  return (
    <Page menus={menus} links={links}>
      <Breadcrumb />
      <Info title="Lives" />
      <Fluid>
        <SearchBar
          filters={listCategories}
          submit={(filter) => find(filter)}
          renderFilter={(item) => (
            <Option
              id={item.slug}
              name={item.name}
              selected={category === item.slug}
              click={changeCategory}
            />
          )}
        />
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
              title={item.title}
              excerpt={item.excerpt}
              click={() => push(`lives/${item.slug}`)}
            />
          )}
        />
      </Fluid>
    </Page>
  );
}

export async function getServerSideProps({ query }) {
  const lives = await core.lives.getAll();
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();
  const categories = lives.nodes.filter((item) => item.categories.nodes.length > 0)
    .reduce((acc, cur) => [...acc, ...cur.categories.nodes], [])
    .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.name === item.name) === -1);

  return {
    props: {
      lives: lives.nodes || [],
      menus: menus.nodes || [],
      links: links.nodes || [],
      categories: [{ slug: 'todas', name: 'Todas' }, ...categories] || [],
    },
    revalidate: 1,
  };
}
