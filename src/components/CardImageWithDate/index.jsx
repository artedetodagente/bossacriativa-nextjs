import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './styles';

export default function CardImageWithDate({
  image, title, excerpt, click, day, month,
}) {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  return (
    <Card
      image={image}
      onClick={click}
      isClicked={!!click}
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
        <p>
          {`${day} ${months[month].slice(0, 3)}`}
        </p>
      </div>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <p>{excerpt && excerpt.replace(/<\/?[^>]+(>|$)/g, '')}</p>
      </div>
    </Card>
  );
}

CardImageWithDate.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  click: PropTypes.func,
  day: PropTypes.number,
  month: PropTypes.number,
};

CardImageWithDate.defaultProps = {
  title: '',
  excerpt: '',
  click: null,
  day: 1,
  month: 1,
};
