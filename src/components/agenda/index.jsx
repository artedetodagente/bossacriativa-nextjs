import React, { useEffect, useState, Fragment } from 'react';
import { BiSearch } from 'react-icons/bi';
import AgendaCarousel from '../AgendaCarousel';
import {
  WrapperCarousel, WrapperAgenda, Toolbar, AgendaFeed,
} from './style';

export default function Schedule({
  source, renderItem,
}) {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const week = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [now, setNow] = useState({
    date: '', day: null, month: null, year: null,
  });
  const [monthCards, setMonthCards] = useState({ current: [], prev: [] });
  const [filter, setFilter] = useState({
    selected: 'todas', search: '',
  });
  const [calendar, setCalendar] = useState({
    days: null, selectedDay: null, dayOne: null, buttonPushed: false,
  });

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    setNow({
      ...now, date: `${months[month]} - ${year}`, month, year,
    });
  }, []);

  useEffect(() => {
    setCards(monthCards.current?.slice((page - 1) * 6, page * 6));
  }, [page, monthCards]);

  useEffect(() => {
    setMonthCards({
      current: source.filter((item) => {
        const date = item.acf_data_evento?.dataDoEvento.split(/([d]*\/)+\s*/);
        const day = date[0];
        const month = date[2];
        const year = date[4].split(' ')[0];
        if (now.day) {
          return (
            (day === now.day) && ((month - 1) === now.month) && (year === now.year)
          );
        } return (((month - 1) === now.month) && (year === now.year));
      }),
      prev: source.filter((item) => {
        const date = item.acf_data_evento?.dataDoEvento.split(/([d]*\/)+\s*/);
        const day = date[0];
        const month = date[2];
        const year = date[4].split(' ')[0];
        if (now.day) {
          return ((day === now.day) && ((month - 1) === now.month) && (year === now.year));
        }
        return (((month - 1) === now.month) && (year === now.year));
      }),
    });
    setCards(monthCards.current?.slice(0, 6));
    const daysButtons = [];
    if ((now.month + 1) % 2 !== 0) {
      for (let i = 1; i <= 31; i += 1) {
        if (i === calendar.selectedDay) {
          daysButtons.push(
            <button
              type="button"
              className={`day-button day-${i}`}
              onClick={() => { pickDay(i); }}
              key={i}
              style={{ backgroundColor: 'rgb(230, 231, 233)' }}
            >
              {i}
            </button>,
          );
        } else {
          daysButtons.push(
            <button
              type="button"
              className={`day-button day-${i}`}
              onClick={() => { pickDay(i); }}
              key={i}
            >
              {i}
            </button>,
          );
        }
      }
    } else if ((now.month + 1) == 2) {
      let dias;
      if (now.year % 400 == 0) dias = 29;
      else if ((now.year % 4 == 0) && (now.year % 100 != 0)) dias = 29;
      else dias = 28;
      for (let i = 1; i <= dias; i++) {
        if (i == calendar.selectedDay) daysButtons.push(<button className={`day-button day-${i}`} onClick={() => { pickDay(i); }} key={i} style={{ backgroundColor: 'rgb(230, 231, 233)' }}>{i}</button>);
        else daysButtons.push(<button className={`day-button day-${i}`} onClick={() => { pickDay(i); }} key={i}>{i}</button>);
      }
    } else {
      for (let i = 1; i <= 30; i++) {
        if (i == calendar.selectedDay) daysButtons.push(<button className={`day-button day-${i}`} onClick={() => { pickDay(i); }} key={i} style={{ backgroundColor: 'rgb(230, 231, 233)' }}>{i}</button>);
        else daysButtons.push(<button className={`day-button day-${i}`} onClick={() => { pickDay(i); }} key={i}>{i}</button>);
      }
    }
    const date = new Date(now.year, now.month, 1);
    setCalendar({
      ...calendar, days: daysButtons, selectedDay: now.day, dayOne: date.getDate(),
    });
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
    setFilter({ ...filter, selected: 'todas' });
    setCalendar({ ...calendar, selectedDay: null });
    if (now.month === 11) {
      setNow({
        date: `Janeiro - ${now.year + 1}`, day: null, month: 0, year: now.year + 1,
      });
    } else {
      setNow({
        ...now, date: `${months[now.month + 1]} - ${now.year}`, day: null, month: now.month + 1,
      });
    }
  }

  function prevMonth() {
    setFilter({ ...filter, selected: 'todas' });
    setCalendar({ ...calendar, selectedDay: null });
    if (now.month === 0) {
      setNow({
        date: `Dezembro - ${now.year - 1}`, day: null, month: 11, year: now.year - 1,
      });
    } else {
      setNow({
        ...now, date: `${months[now.month - 1]} - ${now.year}`, day: null, month: now.month - 1,
      });
    }
  }

  function calendarModal(calendar) {
    const modalButton = document.getElementById('modal-button');
    if (calendar.buttonPushed === false) {
      modalButton.href = '#open-modal';
      setCalendar({ ...calendar, buttonPushed: true });
    } else {
      modalButton.href = '#toolbar';
      setCalendar({ ...calendar, buttonPushed: false });
    }
  }

  function pickDay(prop) {
    setNow({ ...now, day: prop });
    setCalendar({ ...calendar, selectedDay: prop });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  }

  function handleSubmit() {
    setMonthCards({
      ...monthCards,
      current: source.filter((item) => item.title === filter.search),
    });
  }

  function filterButton(prop) {
    const items = monthCards.prev;
    switch (prop) {
      case 'todas':
        setFilter({ ...filter, selected: 'todas' });
        setMonthCards({ ...monthCards, current: items });
        break;
      case 'virtual':
        setFilter({ ...filter, selected: 'virtual' });
        setMonthCards({
          ...monthCards,
          current: items.filter((item) => item.acf_data_evento?.tipo === 'virtual'),
        });
        break;
      case 'online':
        setFilter({ ...filter, selected: 'online' });
        setMonthCards({
          ...monthCards,
          current: items.filter((item) => item.acf_data_evento?.tipo === 'online'),
        });
        break;
      case 'presencial':
        setFilter({ ...filter, selected: 'presencial' });
        setMonthCards({
          ...monthCards,
          current: items.filter((item) => item.acf_data_evento?.tipo === 'presencial'),
        });
        break;
      default: return 1;
    }
    return 0;
  }

  return (
    <>
      <WrapperAgenda>
        <Toolbar id="toolbar" columnStart={calendar.dayOne + 1}>
          <div className="months-nav">
            <button
              type="button"
              className="arrow"
              onClick={() => previousPage()}
              style={{ opacity: prevEnabled ? 1 : 0.5 }}
            >
              ◀
            </button>
            <button
              type="button"
              className="arrow"
              onClick={() => nextPage()}
              style={{ opacity: nextEnabled ? 1 : 0.5 }}
            >
              ▶
            </button>
            <a
              id="modal-button"
              className="months"
              href="#"
              onClick={() => calendarModal(calendar)}
            >
              {now.date}
            </a>
            <div id="open-modal" className="modal-window">
              <div>
                <header>
                  <button
                    type="button"
                    className="arrow-modal"
                    onClick={() => prevMonth()}
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    className="arrow-modal"
                    onClick={() => nextMonth()}
                  >
                    ▶
                  </button>
                  <p className="month">{months[now.month]}</p>
                  <p className="year">{now.year}</p>
                </header>
                <body>
                  <div className="week">
                    {week.map((weekDay) => <p className="week-day">{weekDay}</p>)}
                  </div>
                  <div className="days">
                    {calendar.days}
                  </div>
                </body>
              </div>
            </div>
          </div>
          <div className="filter-container">
            <form className="filter">
              <button id="search-button" type="button" onClick={() => handleSubmit()}>
                <BiSearch />
              </button>
              <input
                id="query"
                name="search"
                type="text"
                placeholder="Digite aqui para buscar..."
                value={filter.search}
                onChange={(e) => handleChange(e)}
              />
            </form>
            <button
              type="button"
              className="filter-button"
              onClick={() => filterButton('todas')}
              style={{
                backgroundColor: filter.selected === 'todas' ? '#313131' : 'rgb(230, 231, 233)', color: filter.selected === 'todas' ? 'rgb(230, 231, 233)' : null,
              }}
            >
              Todas

            </button>
            <button
              type="button"
              className="filter-button"
              onClick={() => filterButton('virtual')}
              style={{
                backgroundColor: filter.selected === 'virtual' ? '#313131' : 'rgb(230, 231, 233)', color: filter.selected === 'virtual' ? 'rgb(230, 231, 233)' : null,
              }}
            >
              Virtual
            </button>
            <button
              type="button"
              className="filter-button"
              onClick={() => filterButton('online')}
              style={{
                backgroundColor: filter.selected === 'online' ? '#313131' : 'rgb(230, 231, 233)', color: filter.selected === 'online' ? 'rgb(230, 231, 233)' : null,
              }}
            >
              Online
            </button>
            <button
              type="button"
              className="filter-button"
              onClick={() => filterButton('presencial')}
              style={{
                backgroundColor: filter.selected === 'presencial' ? '#313131' : 'rgb(230, 231, 233)', color: filter.selected === 'presencial' ? 'rgb(230, 231, 233)' : null,
              }}
            >
              Presencial
            </button>
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
