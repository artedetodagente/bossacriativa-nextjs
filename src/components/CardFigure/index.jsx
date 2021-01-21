import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from './styles';

export default function CardFigure({
  title, image, excerpt, click,
}) {
  return (
    <Card onClick={click}>
      <Image image={image}>
        <h1>{title}</h1>
      </Image>
      <div>
        <p>
          {excerpt && excerpt.replace(/<\/?[^>]+(>|$)/g, '')}
        </p>
      </div>
    </Card>
  );
}

CardFigure.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  click: PropTypes.func,
};

CardFigure.defaultProps = {
  title: '',
  excerpt: '',
  click: null,
};
