import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './styles';

export default function CardDate({
  image, title, excerpt, click, h, w, day, month,
}) {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  return (
    <Card
      image={image}
      onClick={click}
      // h={h}
      // w={w}
    >
      <figure>
        <img
          src={image}
          alt={title}
          width="100%"
          height="100%"
        />
      </figure>
      <div>
        <div>
          <p>
            {`${day} ${months[month].slice(0, 3)}`}
          </p>
        </div>
        <div>
          <h1>{title}</h1>
        </div>
      </div>
      <div>
        <p>{excerpt && excerpt.replace(/<\/?[^>]+(>|$)/g, '')}</p>
      </div>
    </Card>
  );
}

CardDate.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  click: PropTypes.func,
  h: PropTypes.number,
  w: PropTypes.number,
  day: PropTypes.number,
  month: PropTypes.number,
};

CardDate.defaultProps = {
  title: '',
  excerpt: '',
  click: null,
  h: 0,
  w: 0,
  day: 1,
  month: 1,
};
