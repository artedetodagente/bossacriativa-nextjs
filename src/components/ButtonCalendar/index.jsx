import React, { useState } from 'react';
import Calendar from '../Calendar';
import { Block, Button, Modal } from './styles';

export default function ButtonCalendar({
  mark, getDate, getMonth, changeMonth, changeYear, getYear,
}) {
  const [enable, setEnable] = useState(false);
  const [date, setDate] = useState(new Date());
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  return (
    <Block>
      <Button
        type="button"
        onClick={() => setEnable(!enable)}
      >
        {`${months[date.getMonth()]} - ${date.getFullYear()}`}
      </Button>
      <Modal isOpen={enable} onMouseLeave={() => setEnable(!enable)}>
        <Calendar
          getDate={(value) => getDate(value)}
          getMonth={getMonth}
          getYear={getYear}
          getCurrent={(data) => setDate(new Date(`${data.year}-${data.month + 1}-1`))}
          mark={mark}
          changeYear={changeYear}
          changeMonth={changeMonth}
        />
      </Modal>
    </Block>
  );
}
