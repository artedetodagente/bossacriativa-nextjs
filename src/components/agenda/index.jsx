import React, { useEffect, useState, Fragment } from 'react';
import AgendaCarousel from '../AgendaCarousel';
import {
  WrapperCarousel, WrapperAgenda, Toolbar, AgendaFeed,
} from './style';

export default function Schedule({
  source, renderItem,
}) {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [now, setNow] = useState({});
  const [monthCards, setMonthCards] = useState([]);
  const[selected, setSelected] = useState('todas')
  const image = require('@/images/loupe.svg');
  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    setNow({ date: `${months[month]} - ${year}`, month, year });
  }, []);
  useEffect(() => {
    setCards(monthCards.slice((page - 1) * 6, page * 6));
  }, [page, monthCards]);
  useEffect(() => {
    setMonthCards(source.filter((item) => {
      const month = item.acf_data_evento?.dataDoEvento.split(/([d]*\/)+\s*/);
      return ((parseInt(month[2]) - 1) === now.month);
    }));
    setCards(monthCards.slice(0, 6));
  }, [now]);

  const nextEnabled = page < monthCards.length / 6;
  const prevEnabled = page > 1;

  function nextPage() {
    if (nextEnabled) setPage(page + 1);
  }

  function previousPage() {
    if (prevEnabled) setPage(page - 1);
  }

  function nextMonth() {
    setSelected('todas')
    if (now.month == 11) setNow({ date: `Janeiro - ${now.year + 1}`, month: 0, year: now.year + 1 });
    else setNow({ ...now, date: `${months[now.month + 1]} - ${now.year}`, month: now.month + 1 });
  }

  function prevMonth() {
    setSelected('todas')
    if (now.month == 0) setNow({ date: `Dezembro - ${now.year - 1}`, month: 11, year: now.year - 1 });
    else setNow({ ...now, date: `${months[now.month - 1]} - ${now.year}`, month: now.month - 1 });
  }

  function filter(prop) {
    const items = source.filter((item) => {
      console.log(item.acf_data_evento?.tipo);
      const month = item.acf_data_evento?.dataDoEvento.split(/([d]*\/)+\s*/);
      return ((parseInt(month[2]) - 1) === now.month);
    });
    switch (prop) {
      case 'todas':
        setSelected('todas');
        setMonthCards(items);
        break;
      case 'virtual':
        setSelected('virtual');
        setMonthCards(items.filter((item) => item.acf_data_evento?.tipo == 'virtual'));
        break;
      case 'online':
        setSelected('online');
        setMonthCards(items.filter((item) => item.acf_data_evento?.tipo == 'online'));
        break;
      case 'presencial':
        setSelected('presencial');
        setMonthCards(items.filter((item) => item.acf_data_evento?.tipo == 'presencial'));
        break;
      default:
        return 1;
    }
    return 0;
  }

  return (
    <>
      <WrapperCarousel>
        <AgendaCarousel width="49%" />
        <AgendaCarousel width="49%" />
      </WrapperCarousel>
      <WrapperAgenda>
        <Toolbar>
          <div className="months-nav">
            <button className="arrow" onClick={() => previousPage()} style={{ opacity: prevEnabled ? 1 : 0.5 }}>◀</button>
            <button className="arrow" onClick={() => nextPage()} style={{ opacity: nextEnabled ? 1 : 0.5 }}>▶</button>
            <button className="months" onClick={() => prevMonth()}>{now.date}</button>
          </div>
          <div className="filter-container">
            <form className="filter">
              <input type="submit" value="a" id="search-button" />
              <input type="text" id="query" value="Digite aqui para buscar..." />
            </form>
            <button className="filter-button" onClick={() => filter('todas')} style={{
              backgroundColor: selected == 'todas' ? '#313131' : 'rgb(230, 231, 233)', color: selected == 'todas' ? 'rgb(230, 231, 233)' : null
              }}>Todas</button>
            <button className="filter-button" onClick={() => filter('virtual')} style={{
              backgroundColor: selected == 'virtual' ? '#313131' : 'rgb(230, 231, 233)', color: selected == 'virtual' ? 'rgb(230, 231, 233)' : null
              }}>Virtual</button>
            <button className="filter-button" onClick={() => filter('online')} style={{
              backgroundColor: selected == 'online' ? '#313131' : 'rgb(230, 231, 233)', color: selected == 'online' ? 'rgb(230, 231, 233)' : null
              }}>Online</button>
            <button className="filter-button" onClick={() => filter('presencial')} style={{
              backgroundColor: selected == 'presencial' ? '#313131' : 'rgb(230, 231, 233)', color: selected == 'presencial' ? 'rgb(230, 231, 233)' : null
              }}>Presencial</button>
          </div>
        </Toolbar>
        <AgendaFeed>
          {
            cards.map((evento, index) => (
              <Fragment key={index}>{renderItem(evento)}</Fragment>
            ))
          }
        </AgendaFeed>
      </WrapperAgenda>
    </>
  );
}
