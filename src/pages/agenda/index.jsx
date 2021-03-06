import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import Fluid from '@/components/Fluid';
import CardImage from '@/components/CardImage';
import core from '@/core';
import ButtonCalendar from '@/components/ButtonCalendar';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import ButtonsNavigations from '@/components/ButtonsNavigations';
import FilterList from '@/components/FilterList';
import Filter from '@/components/Filter';
import styles from '@/styles/agenda.module.css';
import FlatList from '@/components/FlatList';

export default function Agenda({
  menus, eventos, links, categories,
}) {
  const [list, setList] = useState(eventos);
  const [listCategories, setListCategories] = useState(categories);
  const [category, setCategory] = useState('todas');
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    const mark = list.map((item) => item.acf_data_evento.dataDoEvento
      .split(' ')[0]
      .split('/'));
    setDates([...dates, ...mark.map((item) => `${item[2]}-${item[1]}-${item[0]}`)]);
  }, [eventos]);

  useEffect(() => {
    let source = eventos;
    if (category !== 'todas') {
      source = eventos.filter(
        (item) => item.acf_data_evento && item.acf_data_evento.tipo === category,
      );
    } else {
      source = eventos;
    } if (date !== '') {
      const [year, month, day] = date.split('-');
      const formatDate = `${`0${day}`.slice(-2)}/${`0${month}`.slice(-2)}/${year}`;
      source = source.filter(
        (item) => item.acf_data_evento
          && item.acf_data_evento.dataDoEvento.split(' ')[0] === formatDate,
      );
    }
    setList(source);
  }, [category, date]);

  async function find(search) {
    const { nodes } = await core.eventos.getAll(null, search.search);
    const cats = nodes.filter((item) => item.acf_data_evento.tipo !== null)
      .reduce((acc, cur) => [...acc, {
        name: cur.acf_data_evento.tipo, slug: cur.acf_data_evento.tipo,
      }], [])
      .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.name === item.name) === -1);
    setList(nodes);
    setListCategories([{ name: 'Todas', slug: 'todas' }, ...cats]);
    setCategory('todas');
  }

  return (
    <Page menus={menus} links={links}>
      <Fluid>
        <FilterBar>
          <ButtonsNavigations />
          <div className={styles.calendar}>
            <ButtonCalendar mark={dates} getDate={(value) => setDate(value)} />
          </div>
          <div className={styles.search}>
            <SearchBar submit={(filter) => find(filter)} />
          </div>
          <FilterList
            source={listCategories}
            renderItem={(item) => (
              <Filter
                id={item.slug}
                name={item.name}
                selected={category === item.slug}
                click={(slug) => setCategory(slug)}
              />
            )}
          />
        </FilterBar>
        <FlatList
          source={list}
          renderItem={(item) => (
            <CardImage
              title={item.title}
              excerpt={item.excerpt}
              click={null}
              image={item.featuredImage?.node.mediaItemUrl}
              h={350}
            />
          )}
        />
      </Fluid>
    </Page>
  );
}

export async function getStaticProps() {
  const eventos = await core.eventos.getAll();
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();
  const categories = eventos.nodes.filter((item) => item.acf_data_evento.tipo !== null)
    .reduce((acc, cur) => [...acc, {
      name: cur.acf_data_evento.tipo, slug: cur.acf_data_evento.tipo,
    }], [])
    .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.name === item.name) === -1);

  return {
    props: {
      eventos: eventos.nodes || [],
      menus: menus.nodes || [],
      links: links.nodes || [],
      categories: [{ slug: 'todas', name: 'Todas' }, ...categories] || [],
    },
    revalidate: 1,
  };
}
