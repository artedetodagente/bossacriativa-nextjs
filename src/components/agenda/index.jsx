import React, {useEffect, useState, Fragment} from 'react';
import AgendaCarousel from '../AgendaCarousel';
import {
  WrapperCarousel, WrapperAgenda, Toolbar, AgendaFeed,
} from './style';

export default function Schedule({
  source, renderItem
}) {

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const[slides, setSlides] = useState([]);
  const[page, setPage] = useState(1);
  const[now, setNow] = useState('Fevereiro - 2021');

  const image = require('@/images/loupe.svg');

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    setNow(`${months[month]} - ${year}`);
    setSlides(source.slice(0,6));
  }, [])

  useEffect(() => {
    setSlides(source.slice((page - 1) * 6, page * 6));
  }, [page])

  console.log(page)

  let nextEnabled = page < source.length / 6;
  let prevEnabled = page > 1;

  function nextPage(){
    if(nextEnabled) setPage(page + 1);
  }

  function previousPage(){
    if(prevEnabled) setPage(page - 1);
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
            <button className="arrow" onClick={() => previousPage()} style={{opacity: prevEnabled ? 1 : 0.5}}>◀</button>
            <button className="arrow" onClick={() => nextPage()} style={{opacity: nextEnabled ? 1 : 0.5}}>▶</button>
            <button className="months">{now}</button>
          </div>
          <div className="filter-container">
            <form className="filter">
              <input type="submit" value="a" id="search-button" />
              <input type="text" id="query" value="Digite aqui para buscar..." />
            </form>
            <button className="filter-button">Todas</button>
            <button className="filter-button">Virtual</button>
            <button className="filter-button">Online</button>
            <button className="filter-button">Presencial</button>
          </div>
        </Toolbar>
        <AgendaFeed>
          {
            slides.map((evento, index) => (
              <Fragment className="card" key={index}>{renderItem(evento)}</Fragment>
            ))
          }
        </AgendaFeed>
      </WrapperAgenda>
    </>
  );
}

