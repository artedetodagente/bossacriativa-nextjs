import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import Fluid from '@/components/Fluid';
import core from '@/core';
import ButtonCalendar from '@/components/ButtonCalendar';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import ButtonsNavigations from '@/components/ButtonsNavigations';
import FilterList from '@/components/FilterList';
import Filter from '@/components/Filter';
import styles from '@/styles/agenda.module.css';
import FlatList from '@/components/FlatList';
import CardDate from '@/components/CardDate';

export default function Agenda({
  menus, eventos, links, categories,
}) {
  const [list, setList] = useState(eventos);
  const [listCategories, setListCategories] = useState(categories);
  const [category, setCategory] = useState('todas');
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState('');
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const mark = list.map((item) => item.acf_data_evento && item.acf_data_evento.dataDoEvento
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
      const [y, m, d] = date.split('-');
      const formatDate = `${`0${d}`.slice(-2)}/${`0${m}`.slice(-2)}/${y}`;
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

  async function changeMonth(value) {
    if (month + value < 0) {
      setMonth(11);
      setYear(year - 1);
    } else if (month + value > 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + value);
    const res = await core.eventos.getAll();
    const events = res.nodes.filter((item) => {
      const [d, m, y] = item.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
      return parseInt(m, 10) === month + value + 1 && parseInt(y, 10) === year;
    });
    const cats = events.filter((item) => item.acf_data_evento.tipo !== null)
      .reduce((acc, cur) => [...acc, {
        name: cur.acf_data_evento.tipo, slug: cur.acf_data_evento.tipo,
      }], [])
      .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.name === item.name) === -1);
    setList(events);
    setListCategories([{ name: 'Todas', slug: 'todas' }, ...cats]);
  }

  return (
    <Page menus={menus} links={links}>
      <Fluid>
        <FilterBar>
          <ButtonsNavigations
            onNext={() => changeMonth(1)}
            onPrev={() => changeMonth(-1)}
          />
          <div className={styles.calendar}>
            <ButtonCalendar
              mark={dates || []}
              getDate={(value) => setDate(value)}
              getMonth={(value) => value !== month && setMonth(value)}
              getYear={(value) => value !== year && setYear(value)}
              changeMonth={month}
              changeYear={year}
            />
          </div>
          <div className={styles.search}>
            <SearchBar submit={(filter) => find(filter)} />
          </div>
          <FilterList
            source={listCategories}
            action={setCategory}
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
            <CardDate
              title={item.title}
              excerpt={item.excerpt}
              click={null}
              image={item.featuredImage?.node.mediaItemUrl}
              h={350}
              day={item.acf_data_evento.dataDoEvento.split(' ')[0].split('/')[0]}
              month={parseInt(item.acf_data_evento.dataDoEvento.split(' ')[0].split('/')[1], 10)}
            />
          )}
        />
      </Fluid>
    </Page>
  );
}

export async function getStaticProps() {
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();
  const eventos = (await core.eventos.getAll()).nodes.filter(
    (item) => {
      const cur = new Date();
      const [day, month, year] = item.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
      return parseInt(month, 10) === cur.getMonth() + 1 && parseInt(year, 10) === cur.getFullYear();
    },
  );
  const categories = eventos.filter((item) => item.acf_data_evento.tipo !== null)
    .reduce((acc, cur) => [...acc, {
      name: cur.acf_data_evento.tipo, slug: cur.acf_data_evento.tipo,
    }], [])
    .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.name === item.name) === -1);

  return {
    props: {
      eventos: eventos || [],
      menus: menus.nodes || [],
      links: links.nodes || [],
      categories: [{ slug: 'todas', name: 'Todas' }, ...categories] || [],
    },
    revalidate: 1,
  };
}
