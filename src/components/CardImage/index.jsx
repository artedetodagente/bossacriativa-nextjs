import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './styles';

export default function CardImage({
  image, title, excerpt, click, h, w,
}) {
  return (
    <Card
      image={image}
      onClick={click}
      h={h}
      w={w}
    >
      <h1>{title}</h1>
      <div>
        <p>{excerpt && excerpt.replace(/<\/?[^>]+(>|$)/g, '')}</p>
      </div>
    </Card>
  );
}

CardImage.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  click: PropTypes.func,
  h: PropTypes.number,
  w: PropTypes.number,
};

CardImage.defaultProps = {
  title: '',
  excerpt: '',
  click: null,
  h: 0,
  w: 0,
};
