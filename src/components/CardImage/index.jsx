import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './styles';

export default function CardImage({
  image, title, excerpt, click,
}) {
  return (
    <Card
      image={image}
      onClick={click}
    >
      <h1>{title}</h1>
      <p>{excerpt.replace(/<\/?[^>]+(>|$)/g, '')}</p>
    </Card>
  );
}

CardImage.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  click: PropTypes.func,
};

CardImage.defaultProps = {
  title: '',
  excerpt: '',
  click: null,
};
