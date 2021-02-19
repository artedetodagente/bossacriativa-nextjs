import React, { useState } from 'react';
import { Container } from './styles';

export default function Calendar() {
  const now = new Date();
  const [day, setDay] = useState(now.getDate());
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const week = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  return (
    <Container>
      <div>
        <div>
          <button type="button">Voltar</button>
          <button type="button">Avançar</button>
        </div>
        <div>
          <h1>{months[month]}</h1>
          <span>{year}</span>
        </div>
      </div>
    </Container>
  );
}
