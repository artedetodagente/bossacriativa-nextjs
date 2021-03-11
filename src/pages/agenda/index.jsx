import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import Fluid from '@/components/Fluid';
import core from '@/core';
import ButtonCalendar from '@/components/ButtonCalendar';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import styles from '@/styles/agenda.module.css';
import FlatList from '@/components/FlatList';
import CardDate from '@/components/CardDate';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';

export default function Agenda({
  menus, eventos, links,
}) {
  const [list, setList] = useState(eventos);
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
    if (month + value < 0) {
      setMonth(11);
      setYear(year - 1);
    } else if (month + value > 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + value);
    const res = await core.eventos.getAll();
    const events = res.nodes
      .filter((item) => {
        const [, m, y] = item.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
        return parseInt(m, 10) === month + value + 1 && parseInt(y, 10) === year;
      })
      .sort((a, b) => {
        const [da, ma, ya] = a.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
        const [db, mb, yb] = b.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
        return new Date(`${ya}-${parseInt(ma, 10)}-${parseInt(da, 10)}`).getTime()
          - new Date(`${yb}-${parseInt(mb, 10)}-${parseInt(db, 10)}`).getTime();
      });
    setList(events);
  }

  return (
    <Page menus={menus} links={links}>
      <Fluid>
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
          renderItem={(item) => (
            <CardDate
              title={item.title}
              excerpt={item.excerpt}
              click={null}
              image={item.featuredImage?.node.mediaItemUrl}
              h={350}
              day={item.acf_data_evento.dataDoEvento.split(' ')[0].split('/')[0]}
              month={parseInt(item.acf_data_evento.dataDoEvento.split(' ')[0].split('/')[1], 10) - 1}
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
      links: links.nodes || [],
    },
    revalidate: 1,
  };
}
