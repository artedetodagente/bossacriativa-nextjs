/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import Info from '@/components/Info';
import FlatList from '@/components/FlatList';
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import Fluid from '@/components/Fluid';
import core from '@/core';
import CardThumb from '@/components/CardThumb';
import Page from '@/components/Page';
import ModalPlayer from '@/components/ModalPlayer';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/Filter';
import styles from '@/styles/realidades.module.css';
import FilterBar from '@/components/FilterBar';
import FilterList from '@/components/FilterList';
import { getISODateString } from '@/utils/date';

export default function Apresentacoes({
  mostrasVirtuais, menus, categories, links, selectedCategory,
}) {
  const { push } = useRouter();
  const [modal, setModal] = useState({ player: false });
  const [video, setVideo] = useState('');
  const [list, setList] = useState(mostrasVirtuais);
  const [listCategories, setListCategories] = useState(categories);
  const [category, setCategory] = useState('todas');

  function selectVideo(url) {
    setVideo(url);
    setModal({ ...modal, player: true });
  }

  function changeCategory(slug) {
    setCategory(slug);
  }

  useEffect(() => {
    if (selectedCategory && selectedCategory.length > 1) {
      setCategory(selectedCategory);
    }
  }, []);

  async function find(search) {
    const { nodes } = await core.mostrasVirtuais.getAll(null, search.search);
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
      <ModalPlayer
        open={modal.player}
        video={video}
        close={() => setModal({ ...modal, player: false })}
      />
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
            <CardThumb
              video={item.acf_data?.videoUrl}
              image={item.featuredImage?.node.mediaItemUrl
                || item.acf_data.imagemDestacada?.mediaItemUrl}
              title={item.title}
              excerpt={item.excerpt || item.description}
              click={() => {
                if (item.slug_url) {
                  push(`${item.slug_url}`);
                } else {
                  selectVideo(`${item.acf_data?.videoUrl}`);
                }
              }}
            />
          )}
        />
      </Fluid>
    </Page>
  );
}

export async function getServerSideProps({ query }) {
  const mostrasVirtuais = [];
  const series = await core.mostras.getSeries();
  series.nodes.forEach((element) => {
    element.title = element.name;
    element.data_exibicao = element.acf_data.dataPublicar || 'Sem data';
    element.data_ordenacao = getISODateString(element.acf_data.dataPublicar);
    element.slug_url = `apresentacoes-series/${element.slug}`;
    element.categories = {
      nodes: [{
        name: element.acf_data.categoria[0].name,
        slug: element.acf_data.categoria[0].slug,
      }],
    };
    mostrasVirtuais.push(element);
  });
  const fullApresentacoes = await core.mostras.getAll(null, query?.search);
  fullApresentacoes.nodes.forEach((element) => {
    if (element.apresentacoesSeries.nodes.length === 0) {
      element.data_exibicao = element.acf_data.dataDePublicacao || 'Sem data';
      element.data_ordenacao = getISODateString(element.acf_data.dataDePublicacao);
      mostrasVirtuais.push(element);
    }
  });
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();
  const categories = mostrasVirtuais.filter((item) => item.categories.nodes.length > 0)
    .reduce((acc, cur) => [...acc, ...cur.categories.nodes], [])
    .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.name === item.name) === -1);

  const selectedCategory = query?.category;

  mostrasVirtuais.sort((a, b) => (
    new Date(b.data_ordenacao).getTime()
    - new Date(a.data_ordenacao).getTime()
  ));

  return {
    props: {
      mostrasVirtuais: mostrasVirtuais || [],
      menus: menus.nodes || [],
      links: links.nodes || [],
      categories: [{ slug: 'todas', name: 'Todas' }, ...categories] || [],
      selectedCategory: selectedCategory || [],
    },
  };
}
