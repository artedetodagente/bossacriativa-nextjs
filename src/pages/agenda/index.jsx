import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import Fluid from '@/components/Fluid';
import core from '@/core';
import ButtonCalendar from '@/components/ButtonCalendar';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import styles from '@/styles/agenda.module.css';
import FlatList from '@/components/FlatList';
import CardImageWithDate from '@/components/CardImageWithDate';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import Section from '@/components/Section';
import Title from '@/components/Title';
import Loader from '@/components/Loader';

export default function Agenda({
  menus, eventos, links, menusRodape,
}) {
  const [list, setList] = useState(eventos);
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState('');
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const mark = list.map((item) => item.acf_data_evento && item.acf_data_evento.dataDoEvento
      .split(' ')[0]
      .split('/'));
    setDates([...dates, ...mark.map((item) => `${item[2]}-${item[1]}-${item[0]}`)]);
  }, [eventos]);

  useEffect(() => {
    if (date !== '') {
      const [y, m, d] = date.split('-');
      const formatDate = `${`0${d}`.slice(-2)}/${`0${m}`.slice(-2)}/${y}`;
      const source = eventos
        .filter(
          (item) => item.acf_data_evento
            && item.acf_data_evento.dataDoEvento.split(' ')[0] === formatDate,
        )
        .sort((a, b) => {
          const [da, ma, ya] = a.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
          const [db, mb, yb] = b.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
          return new Date(`${ya}-${parseInt(ma, 10)}-${parseInt(da, 10)}`).getTime()
            - new Date(`${yb}-${parseInt(mb, 10)}-${parseInt(db, 10)}`).getTime();
        });
      setList(source);
    }
  }, [date]);

  async function find(search) {
    const { nodes } = await core.eventos.getAll(null, search.search)
      .sort((a, b) => {
        const [da, ma, ya] = a.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
        const [db, mb, yb] = b.acf_data_evento.dataDoEvento.split(' ')[0].split('-');
        return new Date(`${ya}-${parseInt(ma, 10)}-${parseInt(da, 10)}`).getTime()
          - new Date(`${yb}-${parseInt(mb, 10)}-${parseInt(db, 10)}`).getTime();
      });
    setList(nodes);
  }

  async function changeMonth(value) {
    setLoad(true);
    const res = await core.eventos.getAll();
    let yea = year;
    let mont = month;
    if (mont + value < 0) {
      mont = 11;
      yea -= 1;
    } else if (mont + value > 11) {
      mont = 0;
      yea += 1;
    } else mont += value;
    const events = res.nodes
      .filter((item) => {
        const [, m, y] = item.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
        return parseInt(m, 10) === mont + 1 && parseInt(y, 10) === yea;
      })
      .sort((a, b) => {
        const [da, ma, ya] = a.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
        const [db, mb, yb] = b.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
        return new Date(`${ya}-${parseInt(ma, 10)}-${parseInt(da, 10)}`).getTime()
          - new Date(`${yb}-${parseInt(mb, 10)}-${parseInt(db, 10)}`).getTime();
      });
    setYear(yea);
    setMonth(mont);
    setList(events);
    setLoad(false);
  }

  function openPage(pageToOpen) {
    if (pageToOpen) {
      window.open(pageToOpen, '_blank');
    }
  }

  return (
    <Page menus={menus} links={links} menusRodape={menusRodape}>
      <Fluid>
        <Section className={styles.section}>
          <header>
            <Title>Agenda</Title>
          </header>
          <main>
            <FilterBar>
              <div className={styles.calendar}>
                <button
                  type="button"
                  className={styles.buttonav}
                  onClick={() => changeMonth(-1)}
                >
                  <BiLeftArrow />
                </button>
                <ButtonCalendar
                  mark={dates || []}
                  getDate={(value) => setDate(value)}
                  getMonth={(value) => value !== month && setMonth(value)}
                  getYear={(value) => value !== year && setYear(value)}
                  changeMonth={month}
                  changeYear={year}
                />
                <button
                  type="button"
                  className={styles.buttonav}
                  onClick={() => changeMonth(1)}
                >
                  <BiRightArrow />
                </button>
              </div>
              <div className={styles.search}>
                <SearchBar submit={(filter) => find(filter)} />
              </div>
            </FilterBar>
            <FlatList
              source={list}
              cols={3}
              renderItem={(item) => (
                <CardImageWithDate
                  title={item.title}
                  excerpt={item.excerpt}
                  click={() => openPage(item.acf_data_evento.linkExterno)}
                  image={item.featuredImage?.node.mediaItemUrl}
                  h={350}
                  day={Number(item.acf_data_evento.dataDoEvento.split(' ')[0].split('/')[0])}
                  month={parseInt(item.acf_data_evento.dataDoEvento.split(' ')[0].split('/')[1], 10) - 1}
                />
              )}
            />
          </main>
        </Section>
      </Fluid>
      <Loader animation={require('@/lotties/calendar.json')} open={load} />
    </Page>
  );
}

export async function getStaticProps() {
  const menus = await core.menus.getAll();
  const menusRodape = await core.menus.getAll('menu_rodape');
  const links = await core.links.getAll();
  const eventos = (await core.eventos.getAll()).nodes
    .filter(
      (item) => {
        const cur = new Date();
        const [, month, year] = item.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
        return parseInt(month, 10) === cur.getMonth() + 1
          && parseInt(year, 10) === cur.getFullYear();
      },
    )
    .sort((a, b) => {
      const [da, ma, ya] = a.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
      const [db, mb, yb] = b.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
      return new Date(`${ya}-${parseInt(ma, 10)}-${parseInt(da, 10)}`).getTime()
        - new Date(`${yb}-${parseInt(mb, 10)}-${parseInt(db, 10)}`).getTime();
    });

  return {
    props: {
      eventos: eventos || [],
      menus: menus.nodes || [],
      menusRodape: menusRodape?.nodes || [],
      links: links.nodes || [],
    },
    revalidate: 1,
  };
}
