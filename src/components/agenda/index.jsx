import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AgendaCarousel from '../AgendaCarousel';
import {
  WrapperCarousel, WrapperAgenda, Toolbar,
} from './style';

export default function Schedule() {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const image = require('@/images/loupe.svg');
  const [now, setNow] = useState('Fevereiro - 2021');

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    setNow(`${months[month]} - ${year}`);
  }, []);
  return (
    <>
      <WrapperCarousel>
        <AgendaCarousel width="49%" />
        <AgendaCarousel width="49%" />
      </WrapperCarousel>
      <WrapperAgenda>
        <Toolbar>
          <div className="months-nav">
            <button className="arrow">◀</button>
            <button className="arrow">▶</button>
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
      </WrapperAgenda>
    </>
  );
}
