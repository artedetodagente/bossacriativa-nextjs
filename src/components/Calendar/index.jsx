import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Day } from './styles';

export default function Calendar({ getDate, getCurrent, mark }) {
  const now = new Date();
  const [date, setDate] = useState('');
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const week = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  useEffect(() => {
    if (date !== '') getDate(date);
  }, [date]);

  function navigateMonth(value) {
    if (value + month < 0) {
      setMonth(11);
      setYear(year - 1);
      getCurrent({ month: 12, year: year - 1 });
    } else if (value + month >= 12) {
      setMonth(0);
      setYear(year + 1);
      getCurrent({ month: 1, year: year + 1 });
    } else {
      setMonth(month + value);
      getCurrent({ month: month + value, year });
    }
  }

  return (
    <Container>
      <div>
        <div>
          <button
            type="button"
            onClick={() => navigateMonth(-1)}
          >
            Voltar
          </button>
          <button
            type="button"
            onClick={() => navigateMonth(1)}
          >
            Avançar
          </button>
        </div>
        <div>
          <h1>{months[month]}</h1>
          <span>{year}</span>
        </div>
      </div>
      <div>
        <div>
          {
            week.map((item) => (
              <p>{item}</p>
            ))
          }
        </div>
        <ul>
          {
            [
              ...Array(
                week.findIndex(
                  (item) => new Date(
                    `${year}-${month + 1}-1`,
                  ).toLocaleString('pt-BR', { weekday: 'short' }) === `${item.toLowerCase()}.`,
                ),
              ).keys(),
            ].map((item, index) => <li key={index} />)
          }
          {
            [...Array(month !== 1 ? 30 : 28).keys()]
              .map((item, index) => (
                <li key={index}>
                  <Day
                    selected={new Date(date).getTime() === new Date(`${year}-${month + 1}-${item + 1}`).getTime()}
                    mark={
                      mark.includes(
                        `${year}-${`0${month + 1}`.slice(-2)}-${`0${item + 1}`.slice(-2)}`,
                      )
                    }
                    onClick={() => setDate(`${year}-${month + 1}-${item + 1}`)}
                  >
                    <span>{item + 1}</span>
                  </Day>
                </li>
              ))
          }
          {
            month === 1 && (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) && (
              <li>
                <Day
                  select={new Date(date).getTime() === new Date(`${year}-${month + 1}-29`).getTime()}
                  mark={
                    mark.includes(
                      `${year}-${`0${month + 1}`.slice(-2)}-29`,
                    )
                  }
                  onClick={() => setDate(`${year}-${month + 1}-29`)}
                >
                  <span>29</span>
                </Day>
              </li>
            )
          }
          {
            [0, 2, 4, 6, 7, 9, 11].includes(month) && (
              <li>
                <Day
                  select={new Date(date).getTime() === new Date(`${year}-${month + 1}-31`).getTime()}
                  mark={
                    mark.includes(
                      `${year}-${`0${month + 1}`.slice(-2)}-31}`,
                    )
                  }
                  onClick={() => setDate(`${year}-${month + 1}-31`)}
                >
                  <span>31</span>
                </Day>
              </li>
            )
          }
        </ul>
      </div>
    </Container>
  );
}

Calendar.propType = {
  getDate: PropTypes.func,
  getCurrent: PropTypes.func,
  mark: PropTypes.arrayOf(PropTypes.string),
};

Calendar.defaultProps = {
  getDate: null,
  getCurrent: null,
  mark: [],
};
