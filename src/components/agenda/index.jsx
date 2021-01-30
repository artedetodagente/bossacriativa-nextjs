import React, { useEffect, useState, Fragment } from 'react';
import AgendaCarousel from '../AgendaCarousel';
import {
  WrapperCarousel, WrapperAgenda, Toolbar, AgendaFeed,
} from './style';

export default function Schedule({
  source, renderItem,
}) {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const week = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [now, setNow] = useState({});
  const [monthCards, setMonthCards] = useState({current: [], prev: []});
  const[selected, setSelected] = useState('todas')
  const[calendar, setCalendar] = useState({});
  const image = require('@/images/loupe.svg');
  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    setNow({ date: `${months[month]} - ${year}`, day, month, year });
  }, []);
  useEffect(() => {
    setCards(monthCards.current?.slice((page - 1) * 6, page * 6));
  }, [page, monthCards]);
  useEffect(() => {
    setMonthCards({current: source.filter((item) => {
      const date = item.acf_data_evento?.dataDoEvento.split(/([d]*\/)+\s*/);
      const day = date[0];
      const month = date[2];
      const year = date[4].split(" ")[0];
      return ((day == now.day) && ((month - 1) == now.month) && (year == now.year));
    }), prev: source.filter((item) => {
      const date = item.acf_data_evento?.dataDoEvento.split(/([d]*\/)+\s*/);
      const day = date[0];
      const month = date[2];
      const year = date[4].split(" ")[0];
      return ((day == now.day) && ((month - 1) == now.month) && (year == now.year));
    })});
    setCards(monthCards.current?.slice(0, 6));
    let daysButtons = []
    if((now.month + 1)/2 != 0){
      for(let i = 1; i <= 31; i++){
        if(i == calendar.selectedDay) daysButtons.push(<button className="day-button" onClick={() => {pickDay(i)}} key={i} style={{backgroundColor: 'rgb(230, 231, 233)'}}>{i}</button>)
        else daysButtons.push(<button className="day-button" onClick={() => {pickDay(i)}} key={i} >{i}</button>)
      }
    }
    else{
      for(let i = 1; i <= 30; i++){
        if(i == calendar.selectedDay) daysButtons.push(<button className="day-button" onClick={() => {pickDay(i)}} key={i} style={{backgroundColor: 'rgb(230, 231, 233)'}}>{i}</button>)
        else daysButtons.push(<button className="day-button" onClick={() => {pickDay(i)}} key={i} >{i}</button>)
      }
    }
    setCalendar({days: daysButtons, selectedDay: now.day})
  }, [now]);

  const nextEnabled = page < monthCards.current?.length / 6;
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
  function pickDay(prop) {
    setNow({...now, day: prop});
    setCalendar({...calendar, selectedDay: prop});
  }
  function filter(prop) {
    const items = monthCards.prev;
    switch (prop) {
      case 'todas':
        setSelected('todas');
        setMonthCards({...monthCards, current: items})
        break;
      case 'virtual':
        setSelected('virtual');
        setMonthCards({...monthCards, current: items.filter((item) => item.acf_data_evento?.tipo == 'virtual')});
        break;
      case 'online':
        setSelected('online');
        setMonthCards({...monthCards, current: items.filter((item) => item.acf_data_evento?.tipo == 'online')});
        break;
      case 'presencial':
        setSelected('presencial');
        setMonthCards({...monthCards, current: items.filter((item) => item.acf_data_evento?.tipo == 'presencial')});
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
            <a className="months" href="#open-modal">{now.date}</a>
            <div id="open-modal" class="modal-window">
              <div>
                <a href="#" title="Close" class="modal-close">Close</a>
                <header>
                  <button className="arrow-modal" onClick={() => prevMonth()}>◀</button>
                  <button className="arrow-modal" onClick={() => nextMonth()}>▶</button>
                  <p className="month">{months[now.month]}</p>
                  <p className="year">{now.year}</p>
                </header>
                <body>
                  {week}
                  {calendar.days}
                </body>
              </div>
            </div>
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
