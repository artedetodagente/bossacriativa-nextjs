/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import Info from '@/components/Info';
import FlatList from '@/components/FlatList';
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import Fluid from '@/components/Fluid';
import core from '@/core';
import CardImageWithTitle from '@/components/CardImageWithTitle';
import Page from '@/components/Page';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/Filter';
import styles from '@/styles/lives.module.css';
import FilterBar from '@/components/FilterBar';
import FilterList from '@/components/FilterList';
import { getISODateString } from '@/utils/date';

export default function Lives({
  lives, menus, categories, links, selectedCategory,
}) {
  const { push } = useRouter();
  const [list, setList] = useState(lives);
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
      <Info
        title="Lives"
        text="Desde seu lançamento, em junho de 2020, o Bossa Criativa vem promovendo uma série de lives, com diferentes temas e convidados. Em clima de conversa, esses especialistas abordam aspectos de suas áreas de atuação e obras e, também, fornecem um precioso conteúdo sobre projetos e produções culturais, em diferentes contextos. Confira aqui a gravação, na íntegra, de todos esses encontros."
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
            <CardImageWithTitle
              video={item.acf_data?.videoUrl}
              image={item.featuredImage?.node.mediaItemUrl
                || item.acf_data.imagemDestacada?.mediaItemUrl}
              title={item.title}
              excerpt={item.excerpt || item.description}
              click={() => push(`${item.slug_url}`)}
            />
          )}
        />
      </Fluid>
    </Page>
  );
}

export async function getServerSideProps({ query }) {
  const lives = [];
  const quadros = await core.lives.getQuadros();
  quadros.nodes.forEach((element) => {
    element.title = element.name;
    element.data_exibicao = element.acf_data.dataPublicar || 'Sem data';
    element.data_ordenacao = getISODateString(element.acf_data.dataPublicar);
    element.slug_url = `lives-quadros/${element.slug}`;
    element.categories = {
      nodes: [{
        name: element.acf_data.categoria[0].name,
        slug: element.acf_data.categoria[0].slug,
      }],
    };
    lives.push(element);
  });
  const fullLives = await core.lives.getAll(null, query?.search);
  fullLives.nodes.forEach((element) => {
    if (element.livesQuadros.nodes.length === 0) {
      element.data_exibicao = element.acf_data.dataDePublicacao || 'Sem data';
      element.data_ordenacao = getISODateString(element.acf_data.dataDePublicacao);
      element.slug_url = `lives/${element.slug}`;
      lives.push(element);
    }
  });

  lives.sort((a, b) => new Date(b.data_ordenacao).getTime() - new Date(a.data_ordenacao).getTime());

  const menus = await core.menus.getAll();
  const links = await core.links.getAll();
  const categories = lives.filter((item) => item.categories.nodes.length > 0)
    .reduce((acc, cur) => [...acc, ...cur.categories.nodes], [])
    .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.name === item.name) === -1);

  const selectedCategory = query?.category;

  return {
    props: {
      lives: lives || [],
      menus: menus.nodes || [],
      links: links.nodes || [],
      categories: [{ slug: 'todas', name: 'Todas' }, ...categories] || [],
      selectedCategory: selectedCategory || [],
    },
  };
}
